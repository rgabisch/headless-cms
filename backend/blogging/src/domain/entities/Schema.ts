import MoreThan50CharactersException from "../exceptions/MoreThan50CharactersException";
import EmptyValueException from "../exceptions/EmptyValueException";

class Schema {
    constructor(private name: string,
                private types: { id: string, name: string }[]) {

        if (name.trim() === '')
            throw new EmptyValueException();

        if (name.length > 50)
            throw new MoreThan50CharactersException();

    }
}

export default Schema;