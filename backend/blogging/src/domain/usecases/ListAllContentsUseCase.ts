import {CreatorRepository} from "../repositories/CreatorRepository";
import {UnassignedIdException} from "../exceptions/UnassignedIdException";
import Content from "../entities/Content";

class ListAllContentsUseCase {
    constructor(private creatorRepository: CreatorRepository) {
    }

    async execute(command: ListAllContentsCommand): Promise<ListedAllContentsEvent> {
        const creator = await this.creatorRepository.findBy(command.creatorId);

        console.log(creator)
        console.log('a')
        if (!creator) {
            throw new UnassignedIdException();
        }

        console.log('b')
        if (creator.hasNotOpens(command.spaceId))
            throw new UnassignedIdException();

        console.log('c')
        const contents = <Content[]>creator.getContentsOf(command.spaceId);

        return new ListedAllContentsEvent(this.map(contents));
    }

    private map(contents: Content[]) {
        return contents.map(content => ({
            id: content.id,
            name: content.name
        }));
    }
}

export class ListAllContentsCommand {
    constructor(public creatorId: string, public spaceId: string) {
    }
}

export class ListedAllContentsEvent {
    constructor(readonly content: { id: string, name: string }[]) {
    }
}

export default ListAllContentsUseCase;
