import {assert} from 'chai';
import Schema, {TypeDefinition, TypeMappings} from "../../../src/domain/entities/Schema";
import Type, {TypeId} from "../../../src/domain/entities/Type";


suite('Schema Entity', () => {
    suite('validate if it not fit in with mapping', () => {
        const type = new Type(TypeId.Date);
        const otherType = new Type(TypeId.Audio);

        test('given empty mapping when schema is not empty -> return true', () => {
            const mapping = new TypeMappings([]);
            const schema = new Schema(
                '1',
                'podcast',
                new TypeDefinition([{type: type, name: ''}])
            );

            const isNotFitIn = schema.isNotFitInWith(mapping);

            assert.isTrue(isNotFitIn);
        });

        test('given mapping with different type -> return true', () => {
            const mapping = new TypeMappings([{type: otherType, name: '', content: ''}]);
            const schema = new Schema(
                '1',
                'podcast',
                new TypeDefinition([{type: type, name: 'name'}])
            );

            const isNotFitIn = schema.isNotFitInWith(mapping);

            assert.isTrue(isNotFitIn);
        });

        test('given content with equal type but a equal name -> return false', () => {
            const mapping = new TypeMappings([{type: type, name: 'name', content: ''}]);
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