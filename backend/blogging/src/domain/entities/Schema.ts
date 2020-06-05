import MoreThan50CharactersException from "../exceptions/MoreThan50CharactersException";
import EmptyValueException from "../exceptions/EmptyValueException";
import Type from "./Type";

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
}

export class TypeMappings implements Iterable<{ type: Type, name: string, content: string }> {
    constructor(private mappings: { type: Type, name: string, content: string }[]) {
    }

    hasDefinitionAtIndex(definition: { type: Type; name: string }, index: number) {
        if (index >= this.mappings.length)
            return false;

        return (this.mappings[index].type.equals(definition.type)) && (this.mappings[index].name === definition.name);
    }

    hasNotDefinitionAtIndex(definition: { type: Type; name: string }, index: number) {
        return !this.hasDefinitionAtIndex(definition, index);
    }

    [Symbol.iterator](): Iterator<{ type: Type; name: string; content: string }> {
        let counter = 0;
        const mappings = this.mappings;
        return {
            next: function (...args: [] | [undefined]): IteratorYieldResult<{ type: Type; name: string; content: string }> | IteratorReturnResult<any> {
                return {
                    done: counter == mappings.length,
                    value: mappings[counter++]
                }
            }
        }
    }
}

export default Schema;