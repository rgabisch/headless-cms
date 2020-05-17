class NotUniqueSpaceNameException extends Error {

    constructor() {
        super('a name of a space needs to be unique');

        this.name = 'NotUniqueSpaceNameException';
        Object.setPrototypeOf(this, new.target.prototype);
    }

}

export default NotUniqueSpaceNameException;