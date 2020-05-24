import EmptyValueException from "../exceptions/EmptyValueException";
import MoreThan50CharactersException from "../exceptions/MoreThan50CharactersException";
import EmptyUserIdException from "../exceptions/EmptyUserIdException";

class Space {
    constructor(readonly id: string, readonly userId: string, readonly name: string) {
        if (id.trim() === '')
            throw new EmptyValueException();


        if (!name || name.trim() === '') {
            throw new EmptyValueException();
        }

        if (name.trim().length > 50) {
            throw new MoreThan50CharactersException();
        }

        if (!userId || userId.trim() === '') {
            throw new EmptyUserIdException();
        }
    }
}

export default Space;