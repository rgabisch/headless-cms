import EmptySpaceNameException from "../exceptions/EmptySpaceNameException";

class Space {
    constructor(private id: string, private name: string) {
        if (name.trim() === '') {
            throw new EmptySpaceNameException();
        }

    }
}

export default Space;