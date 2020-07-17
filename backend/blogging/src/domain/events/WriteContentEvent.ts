export class WrittenContentEvent {
    constructor(readonly contentId: string,
                readonly creatorId: string,
                readonly creationDate: Date,
                readonly editDate: Date,
                readonly content: { typeId: string; name: string, content: string }[]) {

    }

}