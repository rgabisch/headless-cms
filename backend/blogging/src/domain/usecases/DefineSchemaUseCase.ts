import Schema, {TypeDefinition} from "../entities/Schema";
import {DefineSchemaCommand} from "../commands/DefineSchemaCommand";
import {CreatorRepository} from "../repositories/CreatorRepository";
import {UnassignedIdException} from "../exceptions/UnassignedIdException";
import {TypeRepository} from "../repositories/TypeRepository";
import {DefinedSchemaEvent} from "../events/DefineSchemaEvent";
import IdGenerator from "../../shared/IdGenerator";
import Type from "../entities/Type";
import TypeFactory from "../factories/TypeFactory";

class DefineSchemaUseCase {
    constructor(private idGenerator: IdGenerator,
                private creatorRepository: CreatorRepository,
                private typeRepository: TypeRepository,
                private typeFactory: TypeFactory) {
    }

    async execute(command: DefineSchemaCommand): Promise<DefinedSchemaEvent> {
        const creator = await this.creatorRepository.findBy(command.creatorId);

        if (!creator) {
            throw new UnassignedIdException();
        }

        if (await this.containsUnassignedIds(command.types)) {
            throw new UnassignedIdException();
        }


        const mappedCommandToTypeDefinition = command.types.map(type => ({
            type: this.typeFactory.createBy(type.id),
            name: type.name
        }));

        const schema = new Schema(this.idGenerator.generate(), command.name, new TypeDefinition(mappedCommandToTypeDefinition));
        creator.define(schema);

        await this.creatorRepository.update(creator);

        return new DefinedSchemaEvent(
            schema.id,
            command.creatorId,
            command.types
        );
    }

    private async containsUnassignedIds(types: { id: string, name: string }[]) {
        const typeIds = types.map(x => x.id);
        const foundedTypes = await this.typeRepository.findAllBy(typeIds);
        return foundedTypes.some(x => x == undefined)
    }
}

export default DefineSchemaUseCase;