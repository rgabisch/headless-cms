import {CreatorRepository} from "../repositories/CreatorRepository";
import {UnassignedIdException} from "../exceptions/UnassignedIdException";
import Content from "../entities/Content";
import {ListAllContentsfromSpacesCommand} from "../commands/ListAllContentsfromSpacesCommand";
import Space from "../entities/Space";

class ListAllContentsUsersUseCase {
    constructor(private creatorRepository: CreatorRepository) {
    }

    async execute(command: ListAllContentsfromSpacesCommand): Promise<ListedAllContentsSpacesEvent> {
        const creator = await this.creatorRepository.findBy(command.creatorId);

        if (!creator) {
            throw new UnassignedIdException();
        }

        const spaces = creator.getAllSpaces();

        return new ListedAllContentsSpacesEvent(this.mapSpaces(spaces));
    }

    private mapContents(contents: Content[]) {
        return contents.map(content => ({
            id: content.id,
            name: content.name,
            creationDate: content.creationDate,
            editDate: content.editDate
        }));
    }

    private mapSpaces(spaces: Space[]) {
        return spaces.map(space => ({
            space: {
                id: space.id,
                name: space.name
            },
            contents: this.mapContents(space.getAll())
        }));
    }
}

export class ListedAllContentsSpacesEvent {
    constructor(readonly spaces: { space: { id: string, name: string }, contents: { id: string, name: string, creationDate: Date, editDate: Date }[] }[]) {
    }
}

export default ListAllContentsUsersUseCase;