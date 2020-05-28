import MoreThan50CharactersException from "../exceptions/MoreThan50CharactersException";
import EmptyValueException from "../exceptions/EmptyValueException";
import Type from "./Type";

class Schema {
    constructor(readonly id: string,
                readonly name: string,
                private typeDefinition: TypeDefinition) {
        if (id.trim() === '')
            throw new EmptyValueException();

        if (name.trim() === '')
            throw new EmptyValueException();

        if (name.length > 50)
            throw new MoreThan50CharactersException();
    }

    isFitInWith(mapping: TypeMapping) {
        return this.typeDefinition.equals(mapping);
    }

    isNotFitInWith(mapping: TypeMapping) {
        return !this.isFitInWith(mapping);
    }
}

export class TypeDefinition {
    constructor(private definitions: { type: Type, name: string }[]) {
    }

    equals(mapping: TypeMapping): boolean {
        for (let i = 0; i < this.definitions.length; i++) {
            if (mapping.hasNotDefinitionAtIndex(this.definitions[i], i))
                return false;
        }

        return true;
    }
}

export class TypeMapping {
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
}

export default Schema;