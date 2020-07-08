import EmptyValueException from "../exceptions/EmptyValueException";
import MoreThan50CharactersException from "../exceptions/MoreThan50CharactersException";
import Content from "./Content";
import {UnassignedIdException} from "../exceptions/UnassignedIdException";

class Space {
    private contents: Map<string, Content>;

    constructor(readonly id: string, readonly name: string) {
        if (id.trim() === '')
            throw new EmptyValueException();


        if (!name || name.trim() === '') {
            throw new EmptyValueException();
        }

        if (name.trim().length > 50) {
            throw new MoreThan50CharactersException();
        }

        this.contents = new Map();
    }

    add(content: Content) {
        this.contents.set(content.id, content);
    }

    get(id: string): Content | undefined {
        return this.contents.get(id);
    }

    getAll(): Content[] {
        return Array.from(this.contents.values());
    }

    hasName(name: string): boolean {
        return this.name === name;
    }

    remove(contentId: string) {
        if (!this.contents.delete(contentId))
            throw new UnassignedIdException();
    }
}

export default Space;