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

    getAllSchemas(): Schema[] {
        return Array.from(this.schemas.values());
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

    getAllSpaces(): Space[] {
        return Array.from(this.spaces.values());
    }

    getContent(id: string, spaceId: string): Content | undefined {
        const space = this.getSpace(spaceId);

        if (!space)
            return undefined;

        return space.get(id);
    }

    getContentsOf(spaceId: string): Content[] {
        const space = this.getSpace(spaceId);

        if (!space)
            return [];

        return space.getAll();
    }

    getAllContents(): Content[] {
        const spaces = this.getAllSpaces();
        return spaces.flatMap(space => space.getAll());
    }

    hasWritten(contentId: string, spaceId: string): boolean {
        const space = this.getSpace(spaceId);

        if (!space)
            return false;

        return !!space.get(contentId);
    }

    hasNotWritten(contentId: string, spaceId: string): boolean {
        return !this.hasWritten(contentId, spaceId);
    }
}

export default Creator;