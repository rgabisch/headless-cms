
import Schema from '../entities/Schema';

class ViewSchemaEvent {
    constructor(readonly schema: Schema) {
    }
}

export default ViewSchemaEvent;