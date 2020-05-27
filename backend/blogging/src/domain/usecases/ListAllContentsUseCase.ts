import {CreatorRepository} from "../repositories/DefineSchemaUseCase";
import {UnassignedIdException} from "../exceptions/DefineSchemaUseCase";

class ListAllContentsUseCase {
    constructor(private creatorRepository: CreatorRepository) {
    }

    async execute(command: ListAllContentsCommand): Promise<ListedAllContentsEvent> {
        return new ListedAllContentsEvent([]);
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
