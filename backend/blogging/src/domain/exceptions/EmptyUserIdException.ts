class EmptyUserIdException extends Error {

    constructor() {
        super('a user id can not be empty');

        this.name = 'EmptyUserIdException';
        Object.setPrototypeOf(this, new.target.prototype);
    }

}

export default EmptyUserIdException;