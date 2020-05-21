import Schema from "../entities/Schema";
import {DefineSchemaCommand} from "../commands/DefineSchemaUseCase";
import {CreatorRepository} from "../repositories/DefineSchemaUseCase";
import {UnassignedIdException} from "../exceptions/DefineSchemaUseCase";
import {TypeRepository} from "../repositories/TypeRepository";
import {DefinedSchemaEvent} from "../events/DefineSchemaUseCase";
import IdGenerator from "../../shared/IdGenerator";
import Type from "../entities/Type";

class DefineSchemaUseCase {
    constructor(private idGenerator: IdGenerator,
                private creatorRepository: CreatorRepository,
                private typeRepository: TypeRepository) {
    }

    async execute(command: DefineSchemaCommand): Promise<DefinedSchemaEvent> {
        const creator = await this.creatorRepository.findBy(command.creatorId);

        if (!creator) {
            throw new UnassignedIdException();
        }

        if (await this.containsUnassignedIds(command.types)) {
            throw new UnassignedIdException();
        }

        const schema = new Schema(this.idGenerator.generate(), command.name, command.types);
        creator.define(schema);

        await this.creatorRepository.update(creator);

        return new DefinedSchemaEvent(
            schema.id,
            command.creatorId,
            command.types
        );
    }

    private async containsUnassignedIds(types: Type[]) {
        const typeIds = types.map(x => x.id);
        const foundedTypes = await this.typeRepository.findAllBy(typeIds);
        return foundedTypes.some(x => x == undefined)
    }
}

export default DefineSchemaUseCase;