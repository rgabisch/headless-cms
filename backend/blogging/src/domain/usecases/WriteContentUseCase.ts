import {WriteContentCommand} from "../commands/WriteContentCommand";
import {WrittenContentEvent} from "../events/WriteContentUseCaseTest";
import {UnassignedIdException} from "../exceptions/DefineSchemaUseCase";
import {CreatorRepository} from "../repositories/DefineSchemaUseCase";
import IdGenerator from "../../shared/IdGenerator";
import Content from "../entities/Content";

class WriteContentUseCase {
    constructor(private creatorRepository: CreatorRepository,
                private idGenerator: IdGenerator) {
    }

    async execute(command: WriteContentCommand): Promise<WrittenContentEvent> {
        const creator = await this.creatorRepository.findBy(command.creatorId);

        if (!creator)
            throw new UnassignedIdException();

        if (creator.hasNotDefined(command.schemaId))
            throw new UnassignedIdException();

        const content = new Content(
            this.idGenerator.generate(),
            creator.getSchemaBy(command.schemaId),
            command.content
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