import MoreThan50CharactersException from "../exceptions/MoreThan50CharactersException";
import EmptyValueException from "../exceptions/EmptyValueException";
import Type from "./Type";

class Schema {
    constructor(readonly id: string,
                private name: string,
                private types: { id: string, name: string }[]) {
        if (id.trim() === '')
            throw new EmptyValueException();

        if (name.trim() === '')
            throw new EmptyValueException();

        if (name.length > 50)
            throw new MoreThan50CharactersException();
    }

    isFitInWith(mapping: { type: Type, content: string }[]) {
        if (this.types.length !== mapping.length)
            return false;

        for (let i = 0; i < this.types.length; i++) {
            if (this.types[i].id !== mapping[i].)
                return false;
        }

        return true;
    }

    isNotFitInWith(mapping: { type: Type, content: string }[]) {
        return !this.isFitInWith(mapping);
    }
}

export default Schema;