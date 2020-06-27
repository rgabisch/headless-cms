import {CreatorRepository} from "../repositories/CreatorRepository";
import ListAllSchemasCommand from "../commands/ListAllSchemasCommand";
import ListedAllSchemasEvent from "../events/ListedAllSchemasEvent";
import {UnassignedIdException} from "../exceptions/UnassignedIdException";

class ListAllSchemaUseCase {
    constructor(private creatorRepository: CreatorRepository) {
    }

    async execute(command: ListAllSchemasCommand): Promise<ListedAllSchemasEvent> {
        const creator = await this.creatorRepository.findBy(command.creatorId);

        if (!creator)
            throw new UnassignedIdException();

        const schemas = creator.getAllSchemas();

        const mappedSchemas = [];
        for (let schema of schemas) {

            const mappedTypeDefinition = [];
            for (let typeDefinition of schema.typeDefinition) {
                mappedTypeDefinition.push({
                    typeId: typeDefinition.type.id,
                    name: typeDefinition.name
                })
            }

            mappedSchemas.push({
                id: schema.id,
                name: schema.name,
                types: mappedTypeDefinition
            });
        }

        return new ListedAllSchemasEvent(mappedSchemas)
    }
}

export default ListAllSchemaUseCase