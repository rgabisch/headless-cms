import {CreatorRepository} from "../../domain/repositories/CreatorRepository";
import Creator from "../../domain/entities/Creator";
import FireBase from './firebase/firebase'
import CreatorCache from "./cache/CreatorCache";
import ToDatabaseContentMapper from "./firebase/ToDatabaseContentMapper";
import ToDatabaseCreatorMapper, {MappedCreator} from "./firebase/ToDatabaseCreatorMapper";
import ToDatabaseSchemaMapper from "./firebase/ToDatabaseSchemaMapper";
import ToDatabaseSpaceMapper from "./firebase/ToDatabaseSpaceMapper";
import ToEntityCreatorMapper from "./firebase/ToEntityCreatorMapper";
import ToEntitySchemaMapper from "./firebase/ToEntitySchemaMapper";
import TypeFactory from "../../domain/factories/TypeFactory";
import ToEntitySpaceMapper from "./firebase/ToEntitySpaceMapper";


class FireBaseCreatorRepository extends FireBase implements CreatorRepository {
    private cache: CreatorCache;
    private creatorToDatabaseMapper: ToDatabaseCreatorMapper;
    private creatorToEntityMapper: ToEntityCreatorMapper;
    private readonly audioStoragePath = (creatorId: string, contentId: string, audioName: string) =>
        `creators/${creatorId}/contents/${contentId}/audios/${audioName}.mp3`;

    constructor() {
        super('Creator');
        this.cache = new CreatorCache();
        const schemaMapper = new ToDatabaseSchemaMapper();
        const contentMapper = new ToDatabaseContentMapper(schemaMapper);
        const spaceMapper = new ToDatabaseSpaceMapper(contentMapper);
        this.creatorToDatabaseMapper = new ToDatabaseCreatorMapper(schemaMapper, spaceMapper);
        const typeFactory = new TypeFactory();
        const schemaEntityMapper = new ToEntitySchemaMapper(typeFactory);
        const spaceEntityMapper = new ToEntitySpaceMapper(schemaEntityMapper, typeFactory);
        this.creatorToEntityMapper = new ToEntityCreatorMapper(schemaEntityMapper, spaceEntityMapper);
    }

    async findBy(id: string): Promise<Creator | undefined> {
        if (this.cache.contains(id)) {
            return this.cache.getBy(id)
        }

        const fromStore: MappedCreator = await super.db_get(id);

        if (!fromStore) {
            return undefined
        }

        return this.creatorToEntityMapper.map(fromStore);
    }

    async add(creator: Creator) {
        this.cache.add(creator);

        for (let content of creator.getAllContents()) {
            for (const typeMapping of content.typeMappings) {
                if (typeMapping.type.isAudio()) {
                    await super.storage_add(this.audioStoragePath(creator.id, content.id, typeMapping.name), <Buffer>typeMapping.raw);
                    typeMapping.contentURL = await super.storage_getURL(this.audioStoragePath(creator.id, content.id, typeMapping.name))
                }
            }
        }

        super.db_add(creator.id, this.creatorToDatabaseMapper.map(creator));
    }

    async update(creator: Creator) {
        this.cache.add(creator);

        for (let content of creator.getAllContents()) {
            for (const typeMapping of content.typeMappings) {
                if (typeMapping.type.isAudio()) {
                    await super.storage_add(this.audioStoragePath(creator.id, content.id, typeMapping.name), <Buffer>typeMapping.raw);
                    typeMapping.contentURL = await super.storage_getURL(this.audioStoragePath(creator.id, content.id, typeMapping.name))
                }
            }
        }

        const mapped = this.creatorToDatabaseMapper.map(creator);
        await super.db_update(creator.id, mapped)
    }
}

export default FireBaseCreatorRepository;