import Schema from "./Schema";

class Creator {
    constructor(readonly id: string,
                private schemas: Schema[]) {
    }
}

export default Creator;