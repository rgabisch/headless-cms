export class WrittenContentEvent {
    constructor(readonly contentId: string,
                readonly creatorId: string,
                readonly contentDate: Date,
                readonly content: { typeId: string; name: string, content: string }[]) {

    }

}