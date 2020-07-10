class EditContentCommand {
    constructor(public creatorId: string,
                public contentId: string,
                public spaceId: string,
                public content: { typeId: string, name: string, content: string, raw?: Buffer }[]) {
    }
}

export default EditContentCommand;