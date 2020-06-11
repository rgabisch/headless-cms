import {CreatorRepository} from "../repositories/CreatorRepository";
import {UnassignedIdException} from "../exceptions/UnassignedIdException";
import Space from "../entities/Space";

class ListAllSpacesUseCase {
    constructor(private creatorRepository: CreatorRepository) {
    }

    async execute(command: ListAllSpacesCommand): Promise<ListedAllSpacesEvent> {
        const creator = await this.creatorRepository.findBy(command.creatorId);

        if (!creator) {
            throw new UnassignedIdException();
        }

        const spaces = creator.getAllSpaces();

        return new ListedAllSpacesEvent(this.map(spaces));
    }

    private map(spaces: Space[]) {
        return spaces.map(space => ({
            id: space.id,
            name: space.name
        }));
    }

}

export class ListAllSpacesCommand {
    constructor(public creatorId: string) {
    }
}

export class ListedAllSpacesEvent {
    constructor(readonly content: { id: string, name: string }[]) {
    }
}


export default ListAllSpacesUseCase;