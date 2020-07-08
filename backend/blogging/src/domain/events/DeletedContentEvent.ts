class DeletedContentEvent {
    constructor(public readonly creatorId: string,
                public readonly spaceId: string,
                public readonly contentId: string) {
    }
}

export default DeletedContentEvent;