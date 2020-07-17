class EditedContentEvent {
    constructor(public readonly creatorId: string,
                public readonly contentId: string,
                public readonly spaceId: string,
                public readonly creationDate: Date,
                public readonly editDate: Date,
                public readonly content: { typeId: string, name: string, content: string }[]) {
    }
}

export default EditedContentEvent