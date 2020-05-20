class EmptySpaceNameException extends Error {

    constructor() {
        super('a name of a space can not be longer than 50 characters');

        this.name = 'EmptySpaceNameException';
        Object.setPrototypeOf(this, new.target.prototype);
    }

}

export default EmptySpaceNameException;