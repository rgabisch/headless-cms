import {CreatorRepository} from "../repositories/CreatorRepository";
import {UnassignedIdException} from "../exceptions/UnassignedIdException";
import Content from "../entities/Content";
import {ListAllContentsCommand} from "../commands/ListAllContentsCommand";

class ListAllContentsUseCase {
    constructor(private creatorRepository: CreatorRepository) {
    }

    async execute(command: ListAllContentsCommand): Promise<ListedAllContentsEvent> {
        const creator = await this.creatorRepository.findBy(command.creatorId);

        if (!creator) {
            throw new UnassignedIdException();
        }

        if (creator.hasNotOpens(command.spaceId))
            throw new UnassignedIdException();

        const contents = creator.getContentsOf(command.spaceId);

        return new ListedAllContentsEvent(this.map(contents));
    }

    private map(contents: Content[]) {
        return contents.map(content => ({
            id: content.id,
            name: content.name,
            creationDate: content.creationDate
        }));
    }
}

export class ListedAllContentsEvent {
    constructor(readonly content: { id: string, name: string, creationDate: Date }[]) {
    }
}

export default ListAllContentsUseCase;
