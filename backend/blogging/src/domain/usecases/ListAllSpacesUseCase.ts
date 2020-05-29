import {CreatorRepository} from "../repositories/CreatorRepository";
import {UnassignedIdException} from "../exceptions/UnassignedIdException";
import Content from "../entities/Space";
import Space from "../entities/Space";

class ListAllContentsUseCase {
    constructor(private creatorRepository: CreatorRepository) {
    }

    async execute(command: ListAllSpacesCommand): Promise<ListedAllSpacesEvent> {
        const creator = await this.creatorRepository.findBy(command.creatorId);

        console.log(creator)
        if (!creator) {
            throw new UnassignedIdException();
        }

        //get all spaces
        const spaces = <Space[]>creator.getSpaces();
        return new ListedAllSpacesEvent(spaces);
    }

    private map(contents: Content[]) {
        return contents.map(content => ({
            id: content.id,
            name: content.name
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


export default ListAllContentsUseCase;