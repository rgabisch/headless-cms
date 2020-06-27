class ListedAllSchemasEvent {
    constructor(readonly schemas: { id: string, name: string, types: { typeId: string, name: string }[] }[]) {
    }
}

export default ListedAllSchemasEvent;