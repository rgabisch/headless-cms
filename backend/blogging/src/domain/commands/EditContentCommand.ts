import ContentCommand from "./ContentCommand";

class EditContentCommand extends ContentCommand {
    constructor(public creatorId: string,
                public contentId: string,
                public spaceId: string,
                public content: { typeId: string, name: string, content: string, raw?: Buffer }[],
                _dateFormat: string | undefined) {
        super(_dateFormat)
    }

}

export default EditContentCommand;