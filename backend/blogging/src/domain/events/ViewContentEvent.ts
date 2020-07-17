class ViewContentEvent {
    constructor(readonly id: string,
                readonly name: string,
                readonly creationDate: Date,
                readonly editDate: Date,
                readonly schema: { id: string, name: string },
                readonly mapping: { type: { id: string, name: string }, content: string, contentURL?: string }[]) {
    }
}

export default ViewContentEvent;