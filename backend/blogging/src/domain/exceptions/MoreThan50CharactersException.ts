class MoreThan50CharactersSpaceNameException extends Error {

    constructor() {
        super('a name of a space can not be longer than 50 characters');

        this.name = 'MoreThan50CharactersSpaceNameException';
        Object.setPrototypeOf(this, new.target.prototype);
    }

}

export default MoreThan50CharactersSpaceNameException;