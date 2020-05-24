import Schema from "./Schema";
import Type from "./Type";

class ContentNotFitInWithSchema implements Error {
    message: string = '';
    name: string = '';
}

export class Content {
    constructor(readonly id: string,
                private schema: Schema,
                private content: { type: Type, content: string }[]) {
        if (schema.isNotFitInWith(content))
            throw new ContentNotFitInWithSchema();
    }

    get schemaId(): string {
        return this.schema.id;
    }
}

export default Content;