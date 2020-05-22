export class DefinedSchemaEvent {
    constructor(readonly schemaId: string,
                readonly creatorId: string,
                readonly types: { id: string, name: string }[]) {
    }
}