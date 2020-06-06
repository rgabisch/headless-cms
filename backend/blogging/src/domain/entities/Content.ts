import Schema, {TypeMappings} from "./Schema";

class ContentNotFitInWithSchema implements Error {
    message: string = '';
    name: string = '';
}

export class Content {
    constructor(readonly id: string,
                readonly name: string,
                private schema: Schema,
                readonly creationDate: Date,
                readonly typeMappings: TypeMappings) {
        if (schema.isNotFitInWith(typeMappings))
            throw new ContentNotFitInWithSchema();
    }

    get schemaId(): string {
        return this.schema.id;
    }

    get schemaName(): string {
        return this.schema.name;
    }
}

export default Content;