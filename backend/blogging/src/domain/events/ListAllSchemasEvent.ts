import Schema from '../entities/Schema'

class ListAllSchemasEvent {
    constructor(readonly schemas: Schema[]) {
    }
}

export default ListAllSchemasEvent;