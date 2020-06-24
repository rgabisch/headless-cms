import OpenSpaceCommand from "../commands/OpenSpaceCommand";
import OpenedSpaceEvent from "../events/OpenedSpaceEvent";
import Space from "../entities/Space";
import IdGenerator from "../../shared/IdGenerator";
import {CreatorRepository} from "../repositories/CreatorRepository";
import {UnassignedIdException} from "../exceptions/UnassignedIdException";


class OpenSpaceUseCase {
    constructor(private creatorRepository: CreatorRepository,
                private idGenerator: IdGenerator) {
    }

    async execute(command: OpenSpaceCommand): Promise<OpenedSpaceEvent> {
        const creator = await this.creatorRepository.findBy(command.userId);
        
        if (!creator)
            throw new UnassignedIdException();

        const space = new Space(this.idGenerator.generate(), command.name);

        creator.open(space);
        await this.creatorRepository.update(creator);

        return new OpenedSpaceEvent(space.id, space.name);
    }

}

export default OpenSpaceUseCase;