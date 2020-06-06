import ContentCommand from "./ContentCommand";

class WriteContentCommand extends ContentCommand {
    constructor(public schemaId: string,
                public creatorId: string,
                public spaceId: string,
                public contentName: string,
                public content: { typeId: string; name: string, content: string }[],
                _dateFormat: string | undefined) {
        super(_dateFormat)
    }
}

export default WriteContentCommand;