import RemovedContentCommand from "../commands/DeleteContentCommand";
import RemovedContentEvent from "../events/DeletedContentEvent";
import {CreatorRepository} from "../repositories/CreatorRepository";
import {UnassignedIdException} from "../exceptions/UnassignedIdException";

class RemoveContentUseCase {
    constructor(private readonly creatorRepository: CreatorRepository) {
    }


    async execute(command: RemovedContentCommand): Promise<RemovedContentEvent> {
        const creator = await this.creatorRepository.findBy(command.creatorId);

        if (!creator)
            throw new UnassignedIdException();

        creator.removeContent(command.contentId, command.spaceId);

        this.creatorRepository.update(creator);

        return new RemovedContentEvent(command.creatorId, command.spaceId, command.contentId);
    }
}

export default RemoveContentUseCase;