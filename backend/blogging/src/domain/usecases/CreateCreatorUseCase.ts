import CreateCreatorCommand from "../commands/CreateCreatorCommand";
import CreateCreatorEvent from "../events/CreateCreatorEvent";
import {CreatorRepository} from "../repositories/CreatorRepository";

class CreateCreatorUseCase {

    constructor(private creatorRepository: CreatorRepository) {
    }

    async execute(command: CreateCreatorCommand): Promise<CreateCreatorEvent> {
        return new CreateCreatorEvent('test')
    }

}

export default CreateCreatorUseCase;