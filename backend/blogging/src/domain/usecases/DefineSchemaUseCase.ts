import Schema from "../entities/Schema";
import {DefineSchemaCommand} from "../commands/DefineSchemaUseCase";
import {CreatorRepository} from "../repositories/DefineSchemaUseCase";
import {UnassignedIdException} from "../exceptions/DefineSchemaUseCase";
import {TypeRepository} from "../repositories/TypeRepository";
import {DefinedSchemaEvent} from "../events/DefineSchemaUseCase";
import IdGenerator from "../../shared/IdGenerator";

class DefineSchemaUseCase {
    constructor(private idGenerator: IdGenerator,
                private creatorRepository: CreatorRepository,
                private schemaRepository: TypeRepository) {
    }

    async execute(command: DefineSchemaCommand): Promise<DefinedSchemaEvent> {
        const creator = await this.creatorRepository.findBy(command.creatorId);

        if (!creator)
            throw new UnassignedIdException();

        const typeIds = command.types.map(x => x.id);
        const foundedTypes = await this.schemaRepository.findAllBy(typeIds);
        const areSomeTypesUnassigned = foundedTypes.some(x => x == undefined);

        if (areSomeTypesUnassigned) {
            throw new UnassignedIdException();
        }

        const schema = new Schema(command.name, command.types);
        return new DefinedSchemaEvent('', '', []);
    }

}

export default DefineSchemaUseCase;