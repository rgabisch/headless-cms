import Schema from "./Schema";
import Content from "./Content";
import EmptyValueException from "../exceptions/EmptyValueException";
import {UndefinedSchemaException} from "../exceptions/UndefinedSchemaException";
import Space from "./Space";

class UndefinedSpaceException implements Error {
    constructor(id: string) {
        this.message = `The space with the id ${id} is not defined.`;
        this.name = 'UndefinedSpaceException';
    }

    message: string;
    name: string;
}

class Creator {
    constructor(readonly id: string,
                private schemas: Map<string, Schema>,
                private spaces: Map<string, Space>) {
        if (id.trim() === '')
            throw new EmptyValueException();
    }

    define(schema: Schema): void {
        this.schemas.set(schema.id, schema);
    }

    hasNotDefined(schemaId: string): boolean {
        return !this.hasDefined(schemaId);
    }

    hasDefined(schemaId: string): boolean {
        return !!this.schemas.get(schemaId);
    }

    write(content: Content, space: Space) {
        if (this.hasNotOpens(space.id))
            throw new UndefinedSpaceException(space.id);

        if (this.hasNotDefined(content.schemaId))
            throw new UndefinedSchemaException(content.schemaId);

        const openedSpace: Space = <Space>this.spaces.get(space.id);
        openedSpace.add(content);
    }

    getSchemaBy(schemaId: string): Schema {
        if (this.hasNotDefined(schemaId))
            throw new UndefinedSchemaException(schemaId);

        const schema = this.schemas.get(schemaId);
        return <Schema>schema;
    }

    hasOpens(spaceId: string): boolean {
        return !!this.spaces.get(spaceId);
    }

    hasNotOpens(spaceId: string): boolean {
        return !this.hasOpens(spaceId);
    }

    open(space: Space): void {
        this.spaces.set(space.id, space);
    }

    getSpace(spaceId: string): Space | undefined {
        return this.spaces.get(spaceId);
    }

    getSpaces(): Space[] | undefined{
        
        var spaces = new Array();
        var i;
        for (i = 0; i < this.spaces.size; i++) {
            var key = Array.from(this.spaces.keys())[i];
            var val1 = this.spaces.get(key);  
            spaces.push(val1);
        }

        if(!spaces)
            return undefined;

        return spaces;
    }

    getContent(id: string, spaceId: string): Content | undefined {
        const space = this.getSpace(spaceId);

        if (space)
            return space.get(id);
    }

    getContentsOf(spaceId: string): Content[] | undefined {
        const space = this.spaces.get(spaceId);

        if (!space)
            return undefined;

        return space.getAll();
    }
}

export default Creator;