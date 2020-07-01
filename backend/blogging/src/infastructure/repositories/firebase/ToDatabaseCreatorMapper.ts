import Creator from "../../../domain/entities/Creator";
import ToDatabaseSchemaMapper, {MappedSchema} from "./ToDatabaseSchemaMapper";
import ToDatabaseSpaceMapper, {MappedSpace} from "./ToDatabaseSpaceMapper";

export interface Mapper<T, R> {
    map(t: T): R;
}

export type MappedCreator = {
    id: string,
    schemas: MappedSchema[],
    spaces: MappedSpace[]
};

class ToDatabaseCreatorMapper implements Mapper<Creator, any> {
    constructor(private readonly schemaMapper: ToDatabaseSchemaMapper,
                private readonly spaceMapper: ToDatabaseSpaceMapper) {
    }

    map(creator: Creator): MappedCreator {
        const schemas = creator.getAllSchemas().map(schema => this.schemaMapper.map(schema));
        const spaces = creator.getAllSpaces().map(space => this.spaceMapper.map(space));

        return {
            id: creator.id,
            schemas: schemas,
            spaces: spaces
        }
    }
}

export default ToDatabaseCreatorMapper;