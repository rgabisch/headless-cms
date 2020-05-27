import {CreatorRepository} from "../repositories/DefineSchemaUseCase";
import {UnassignedIdException} from "../exceptions/DefineSchemaUseCase";
import Content from "../entities/Content";

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
