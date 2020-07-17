import Schema, {TypeMappings} from "./Schema";


class ContentNotFitInWithSchema implements Error {
    message: string = '';
    name: string = '';
}

export class Content {
    private _typeMappings!: TypeMappings;
    private _lastEditDate!: Date;

    constructor(readonly id: string,
                readonly name: string,
                readonly schema: Schema,
                readonly creationDate: Date,
                _lastEditDate: Date,
                _typeMappings: TypeMappings) {
        if (schema.isNotFitInWith(_typeMappings))
            throw new ContentNotFitInWithSchema();

        this._typeMappings = _typeMappings;
        this._lastEditDate = _lastEditDate;
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

    get editDate() {
        return this._lastEditDate;
    }

    edit(typeMappings: TypeMappings, lastEditDate: Date) {
        this._lastEditDate = lastEditDate;
        this._typeMappings = typeMappings;
    }
}

export default Content;