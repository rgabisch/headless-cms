import {CreatorRepository} from "../repositories/CreatorRepository";
import ListAllSchemasCommand from "../commands/ListAllSchemasCommand";
import ListAllSchemasEvent from "../events/ListAllSchemasEvent";
import {UnassignedIdException} from "../exceptions/UnassignedIdException";

class ViewSchemaUseCase{
    constructor(private creatorRepository: CreatorRepository){
    }

    async execute(command: ListAllSchemasCommand): Promise<ListAllSchemasEvent>{
        const creator = await this.creatorRepository.findBy(command.creatorId)

        if (!creator)
            throw new UnassignedIdException();

        const schemas = creator.getSchemas()
        return new ListAllSchemasEvent(schemas)
    }
}

export default ViewSchemaUseCase