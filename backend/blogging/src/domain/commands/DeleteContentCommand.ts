class DeleteContentCommand {
    constructor(public creatorId: string,
                public spaceId: string,
                public contentId: string) {
    }
}

export default DeleteContentCommand;