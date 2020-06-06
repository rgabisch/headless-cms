import ContentCommand from "./ContentCommand";

export class ListAllContentsCommand extends ContentCommand {
    constructor(public creatorId: string,
                public spaceId: string,
                dateFormat: string | undefined) {
        super(dateFormat)
    }
}