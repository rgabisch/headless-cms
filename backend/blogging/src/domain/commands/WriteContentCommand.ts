class WriteContentCommand {
    constructor(public schemaId: string,
                public creatorId: string,
                public spaceId: string,
                public contentName: string,
                public content: { typeId: string; name: string, content: string }[]) {
    }
}

export default WriteContentCommand;