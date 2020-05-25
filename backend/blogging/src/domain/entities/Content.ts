import Schema, {TypeMapping} from "./Schema";
import Type from "./Type";

class ContentNotFitInWithSchema implements Error {
    message: string = '';
    name: string = '';
}

export class Content {
    constructor(readonly id: string,
                private schema: Schema,
                private typeMapping: TypeMapping) {
        if (schema.isNotFitInWith(typeMapping))
            throw new ContentNotFitInWithSchema();
    }

    get schemaId(): string {
        return this.schema.id;
    }
}

export default Content;