import WriteContentCommand from "../commands/WriteContentCommand";
import {WrittenContentEvent} from "../events/WriteContentEvent";
import {UnassignedIdException} from "../exceptions/UnassignedIdException";
import {CreatorRepository} from "../repositories/CreatorRepository";
import IdGenerator from "../../shared/IdGenerator";
import Content from "../entities/Content";
import {TypeMappings} from "../entities/Schema";
import TypeFactory from "../factories/TypeFactory";
import Space from "../entities/Space";

class WriteContentUseCase {
    constructor(private creatorRepository: CreatorRepository,
                private idGenerator: IdGenerator,
                private typeFactory: TypeFactory) {
    }

    async execute(command: WriteContentCommand): Promise<WrittenContentEvent> {
        const creator = await this.creatorRepository.findBy(command.creatorId);

        if (!creator)
            throw new UnassignedIdException();

        if (creator.hasNotDefined(command.schemaId))
            throw new UnassignedIdException();

        if (creator.hasNotOpens(command.spaceId))
            throw new UnassignedIdException();

        const typeMapping = command.content.map(({typeId, name, content}) => ({
            type: this.typeFactory.createBy(typeId),
            name,
            content
        }));

        const space = <Space>creator.getSpace(command.spaceId);

        const content = new Content(
            this.idGenerator.generate(),
            command.contentName,
            creator.getSchemaBy(command.schemaId),
            new TypeMappings(typeMapping)
        );

        creator.write(content, space);

        this.creatorRepository.update(creator);

        return new WrittenContentEvent(
            content.id,
            creator.id,
            command.content
        );
    }
}

export default WriteContentUseCase;