import {assert} from 'chai';
import Schema, {TypeDefinition, TypeMapping} from "../../../src/domain/entities/Schema";
import Type from "../../../src/domain/entities/Type";


class FakeType extends Type {
    constructor(id: string) {
        super(id);
    }
}

suite('Schema Entity', () => {
    suite('validate if it not fit in with mapping', () => {
        const type = new FakeType('5');
        const otherType = new FakeType('9');

        test('given empty mapping when schema is not empty -> return true', () => {
            const mapping = new TypeMapping([]);
            const schema = new Schema(
                '1',
                'podcast',
                new TypeDefinition([{type: type, name: ''}])
            );

            const isNotFitIn = schema.isNotFitInWith(mapping);

            assert.isTrue(isNotFitIn);
        });

        test('given mapping with different type -> return true', () => {
            const mapping = new TypeMapping([{type: otherType, name: '', content: ''}]);
            const schema = new Schema(
                '1',
                'podcast',
                new TypeDefinition([{type: type, name: 'name'}])
            );

            const isNotFitIn = schema.isNotFitInWith(mapping);

            assert.isTrue(isNotFitIn);
        });

        test('given content with equal type but a equal name -> return false', () => {
            const mapping = new TypeMapping([{type: type, name: 'name', content: ''}]);
            const schema = new Schema(
                '1',
                'podcast',
                new TypeDefinition([{type: type, name: 'name'}])
            );

            const isNotFitIn = schema.isNotFitInWith(mapping);

            assert.isFalse(isNotFitIn);
        });
    })
});