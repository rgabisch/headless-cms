import EmptySpaceNameException from "../exceptions/EmptySpaceNameException";
import MoreThan50CharactersSpaceNameException from "../exceptions/MoreThan50CharactersSpaceNameException";
import EmptyUserIdException from "../exceptions/EmptyUserIdException";

class Space {
    constructor(readonly id: string, readonly userId: string, readonly name: string) {
        if (name.trim() === '') {
            throw new EmptySpaceNameException();
        }

        if (name.trim().length > 50) {
            throw new MoreThan50CharactersSpaceNameException();
        }

        if (userId.trim() === '') {
            throw new EmptyUserIdException();
        }
    }
}

export default Space;