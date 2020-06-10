import {CreatorRepository} from "../repositories/CreatorRepository";
import {UnassignedIdException} from "../exceptions/UnassignedIdException";
import Content from "../entities/Content";
import {ListAllContentsfromSpacesCommand} from "../commands/ListAllContentsfromSpacesCommand";

class ListAllContentsUsersUseCase {
    constructor(private creatorRepository: CreatorRepository) {
    }

    async execute(command: ListAllContentsfromSpacesCommand): Promise<ListedAllContentsSpacesEvent> {
        const creator = await this.creatorRepository.findBy(command.creatorId);

        if (!creator) {
            throw new UnassignedIdException();
        }

        const contents = <Content[]>creator.getAllContents();

        return new ListedAllContentsSpacesEvent(this.map(contents));
    }

    private map(contents: Content[]) {
        return contents.map(content => ({
            id: content.id,
            name: content.name,
            creationDate: content.creationDate
        }));
    }
}

export class ListedAllContentsSpacesEvent {
    constructor(readonly content: { id: string, name: string, creationDate: Date }[]) {
    }
}

export default ListAllContentsUsersUseCase;