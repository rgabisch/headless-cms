import ContentCommand from "./ContentCommand";

class ViewContentCommand extends ContentCommand {
    constructor(public creatorId: string,
                public spaceId: string,
                public contentId: string,
                dateFormat: string | undefined) {
        super(dateFormat)
    }
}

export default ViewContentCommand;