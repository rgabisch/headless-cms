import EmptySpaceNameException from "../exceptions/EmptySpaceNameException";
import MoreThan50CharactersSpaceNameException from "../exceptions/MoreThan50CharactersSpaceNameException";

class Space {
    constructor(readonly id: string, readonly name: string) {
        if (name.trim() === '') {
            throw new EmptySpaceNameException();
        }

        if (name.trim().length > 50) {
            throw new MoreThan50CharactersSpaceNameException();
        }
    }
}

export default Space;