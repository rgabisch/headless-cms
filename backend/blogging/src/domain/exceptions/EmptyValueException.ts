class EmptyValueException extends Error {

    constructor() {
        super('a name of a space can not be longer than 50 characters');

        this.name = 'EmptyValueException';
        Object.setPrototypeOf(this, new.target.prototype);
    }

}

export default EmptyValueException;