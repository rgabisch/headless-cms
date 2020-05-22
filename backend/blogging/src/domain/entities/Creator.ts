import Schema from "./Schema";
import Content from "../entitiesContent";
import EmptyValueException from "../exceptions/EmptyValueException";

class Creator {

    constructor(readonly id: string,
                private schemas: Map<string, Schema>,
                private contents: Map<string, Content>) {
        if (id.trim() === '')
            throw new EmptyValueException();
    }

    define(schema: Schema): void {
        this.schemas.set(schema.id, schema);
    }

    hasNotDefined(schemaId: string): boolean {
        return !this.schemas.get(schemaId);
    }

    write(content: Content) {
        this.contents.set(content.id, content);
    }
}

export default Creator;