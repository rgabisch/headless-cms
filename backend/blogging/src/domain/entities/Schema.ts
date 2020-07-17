import MoreThan50CharactersException from "../exceptions/MoreThan50CharactersException";
import EmptyValueException from "../exceptions/EmptyValueException";
import Type from "./Type";
import {Readable} from "stream";

class Schema {
    constructor(readonly id: string,
                readonly name: string,
                readonly typeDefinition: TypeDefinition) {
        if (id.trim() === '')
            throw new EmptyValueException();

        if (name.trim() === '')
            throw new EmptyValueException();

        if (name.length > 50)
            throw new MoreThan50CharactersException();
    }

    isFitInWith(mapping: TypeMappings) {
        return this.typeDefinition.equals(mapping);
    }

    isNotFitInWith(mapping: TypeMappings) {
        return !this.isFitInWith(mapping);
    }
}

export class TypeDefinition {
    constructor(private definitions: { type: Type, name: string }[]) {
    }

    equals(mapping: TypeMappings): boolean {
        for (let i = 0; i < this.definitions.length; i++) {
            if (mapping.hasNotDefinitionAtIndex(this.definitions[i], i))
                return false;
        }

        return true;
    }

    [Symbol.iterator](): Iterator<{ type: Type, name: string }> {
        let counter = 0;
        const definitions = this.definitions;
        return {
            next: function (...args: [] | [undefined]): IteratorYieldResult<{ type: Type, name: string }> | IteratorReturnResult<any> {
                return {
                    done: counter == definitions.length,
                    value: definitions[counter++]
                }
            }
        }
    }
}

export class TypeMappings implements Iterable<{ type: Type, name: string, content: string, contentURL?: string, raw?: Buffer }> {
    constructor(private mappings: { type: Type, name: string, content: string,contentURL?: string, raw?: Buffer }[]) {
    }

    hasDefinitionAtIndex(definition: { type: Type; name: string }, index: number) {
        if (index >= this.mappings.length)
            return false;

        return (this.mappings[index].type.equals(definition.type)) && (this.mappings[index].name === definition.name);
    }

    hasNotDefinitionAtIndex(definition: { type: Type; name: string }, index: number) {
        return !this.hasDefinitionAtIndex(definition, index);
    }

    [Symbol.iterator](): Iterator<{ type: Type; name: string; content: string,contentURL?: string, raw?: Buffer }> {
        let counter = 0;
        const mappings = this.mappings;
        return {
            next: function (...args: [] | [undefined]): IteratorYieldResult<{ type: Type; name: string; content: string,contentURL?: string, raw?: Buffer }> | IteratorReturnResult<any> {
                return {
                    done: counter == mappings.length,
                    value: mappings[counter++]
                }
            }
        }
    }

}

export default Schema;