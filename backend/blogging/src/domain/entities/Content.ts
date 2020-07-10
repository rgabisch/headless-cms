import Schema, {TypeMappings} from "./Schema";


class ContentNotFitInWithSchema implements Error {
    message: string = '';
    name: string = '';
}

export class Content {
    private _typeMappings!: TypeMappings;

    constructor(readonly id: string,
                readonly name: string,
                readonly schema: Schema,
                readonly creationDate: Date,
                _typeMappings: TypeMappings) {
        if (schema.isNotFitInWith(_typeMappings))
            throw new ContentNotFitInWithSchema();

        this._typeMappings = _typeMappings;
    }

    get schemaId(): string {
        return this.schema.id;
    }

    get schemaName(): string {
        return this.schema.name;
    }

    get typeMappings() {
        return this._typeMappings
    }

    edit(typeMappings: TypeMappings) {
        this._typeMappings = typeMappings
    }
}

export default Content;