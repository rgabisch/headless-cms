import Type, {TypeId} from "../entities/Type";
import {UnassignedIdException} from "../exceptions/UnassignedIdException";

class TypeFactory {
    constructor() {
    }
    private idByType =
        new Map<string, Type>()
            .set(TypeId.Text, new Type(TypeId.Text))
            .set(TypeId.RichText, new Type(TypeId.RichText))
            .set(TypeId.Number, new Type(TypeId.Number))
            .set(TypeId.Date, new Type(TypeId.Date))
            .set(TypeId.Image, new Type(TypeId.Image))
            .set(TypeId.Audio, new Type(TypeId.Audio));

    createBy(id: string): Type {
        const type = this.idByType.get(id);

        if (!type)
            throw new UnassignedIdException();

        return type;
    }
}

export default TypeFactory;