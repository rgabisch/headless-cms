import CreateCreatorCommand from "../commands/CreateCreatorCommand";
import CreateCreatorEvent from "../events/CreateCreatorEvent";
import {CreatorRepository} from "../repositories/CreatorRepository";
import AssignedIdException from "../exceptions/AssignedIdException";
import Creator from "../entities/Creator";

class CreateCreatorUseCase {

    constructor(private creatorRepository: CreatorRepository) {
    }

    async execute(command: CreateCreatorCommand): Promise<CreateCreatorEvent> {
        const creator = await this.creatorRepository.findBy(command.id);
        if (creator)
            throw new AssignedIdException();

        await this.creatorRepository.add(new Creator(command.id, new Map(), new Map()));

        return new CreateCreatorEvent(command.id);
    }

}

export default CreateCreatorUseCase;