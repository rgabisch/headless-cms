class ViewedSchemaEvent {
    constructor(readonly id: string,
                readonly name: string,
                readonly types: {typeId: string, name: string}[]) {
    }
}

export default ViewedSchemaEvent;