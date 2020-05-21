export class DefinedSchemaEvent {
    constructor(readonly schemaId: string,
                readonly userId: string,
                readonly types: { id: string, name: string }[]) {
    }
}