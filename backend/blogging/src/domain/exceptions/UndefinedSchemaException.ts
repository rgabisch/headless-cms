export class UndefinedSchemaException implements Error {
    message: string;
    name: string = 'UndefinedSchemaException';

    constructor(schemaId: string) {
        this.message = `Schema with the id ${schemaId} is not defined.`
    }
}