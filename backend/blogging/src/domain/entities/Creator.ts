import Schema from "./Schema";

class Creator {
    constructor(readonly id: string,
                private schemas: Schema[]) {
    }

    define(schema: Schema) {
        this.schemas.push(schema);
    }
}

export default Creator;