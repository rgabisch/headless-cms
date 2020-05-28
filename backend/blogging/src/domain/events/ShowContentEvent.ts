class ShowContentEvent {
    constructor(readonly id: string,
                readonly name: string,
                readonly schema: { id: string, name: string },
                readonly mapping: { type: { id: string, name: string }, content: string }[]) {
    }
}

export default ShowContentEvent;