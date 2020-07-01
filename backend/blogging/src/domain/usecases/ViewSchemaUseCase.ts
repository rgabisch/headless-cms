import {CreatorRepository} from "../repositories/CreatorRepository";
import ViewSchemaCommand from "../commands/ViewSchemaCommand";
import ViewedSchemaEvent from "../events/ViewedSchemaEvent";
import {UnassignedIdException} from "../exceptions/UnassignedIdException";

class ViewSchemaUseCase {
    constructor(private creatorRepository: CreatorRepository) {
    }

    async execute(command: ViewSchemaCommand): Promise<ViewedSchemaEvent> {
        const creator = await this.creatorRepository.findBy(command.creatorId);

        if (!creator)
            throw new UnassignedIdException();

        const schema = creator.getSchemaBy(command.schemaId);

        const mappedTypeDefinition = [];
        for (let typeDefinition of schema.typeDefinition) {
            mappedTypeDefinition.push({
                typeId: typeDefinition.type.id,
                name: typeDefinition.name
            })
        }

        return new ViewedSchemaEvent(
            schema.id,
            schema.name,
            mappedTypeDefinition
        );
    }
}

export default ViewSchemaUseCase