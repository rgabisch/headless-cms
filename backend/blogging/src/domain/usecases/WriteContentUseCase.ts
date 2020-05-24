import WriteContentCommand from "../commands/WriteContentCommand";
import {WrittenContentEvent} from "../events/WriteContentUseCaseTest";
import {UnassignedIdException} from "../exceptions/DefineSchemaUseCase";
import {CreatorRepository} from "../repositories/DefineSchemaUseCase";
import IdGenerator from "../../shared/IdGenerator";
import Content from "../entities/Content";
import {TypeMapping} from "../entities/Schema";
import TypeFactory from "../factories/TypeFactory";

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

        const typeMapping = command.content.map(({typeId, name, content}) => ({
            type: this.typeFactory.createBy(typeId),
            name,
            content
        }));

        const content = new Content(
            this.idGenerator.generate(),
            creator.getSchemaBy(command.schemaId),
            new TypeMapping(typeMapping)
        );

        creator.write(content);

        this.creatorRepository.update(creator);

        return new WrittenContentEvent(
            content.id,
            creator.id,
            command.content
        );
    }
}

export default WriteContentUseCase;