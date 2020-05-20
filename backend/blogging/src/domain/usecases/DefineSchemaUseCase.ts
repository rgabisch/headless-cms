import Schema from "../entities/Schema";
import {DefineSchemaCommand} from "../commands/DefineSchemaUseCase";
import {CreatorRepository} from "../repositories/DefineSchemaUseCase";
import {UnassignedIdException} from "../exceptions/DefineSchemaUseCase";

class DefinedSchemaEvent {
    constructor(readonly schemaId: string,
                readonly userId: string,
                readonly types: { id: string, name: string }[]) {
    }
}

class DefineSchemaUseCase {
    constructor(private creatorRepository: CreatorRepository) {
    }

    async execute(command: DefineSchemaCommand): Promise<DefinedSchemaEvent> {
        const creator = await this.creatorRepository.getBy(command.creatorId);

        if (!creator)
            throw new UnassignedIdException();

        const schema = new Schema(command.name, command.types);
        return new DefinedSchemaEvent('', '', []);
    }

}

export default DefineSchemaUseCase;