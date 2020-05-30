import {CreatorRepository} from "../repositories/CreatorRepository";
import ViewSchemaCommand from "../commands/ViewSchemaCommand";
import ViewSchemaEvent from "../events/ViewSchemaEvent";
import {UnassignedIdException} from "../exceptions/UnassignedIdException";

class GetSchemaUseCase{
    constructor(private creatorRepository: CreatorRepository){
    }

    async execute(command: ViewSchemaCommand): Promise<ViewSchemaEvent>{
        const creator = await this.creatorRepository.findBy(command.creatorId)

        if (!creator)
            throw new UnassignedIdException();

        const schema = creator.getSchemaBy(command.schemaId)

        return new ViewSchemaEvent(schema.id, schema.name)
    }
}

export default GetSchemaUseCase