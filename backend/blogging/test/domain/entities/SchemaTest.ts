import {assert} from 'chai';
import Schema from "../../../src/domain/entities/Schema";

suite('Schema Entity', () => {
    suite('validate if it not fit in with mapping', () => {
        test('given empty mapping when schema is not empty -> return true', () => {
            const mapping: { typeId: string, content: string }[] = [];
            const schema = new Schema(
                '1',
                'podcast',
                [{id: '5', name: ''}]
            );

            const isNotFitIn = schema.isNotFitInWith(mapping);

            assert.isTrue(isNotFitIn);
        });

        test('given mapping with different type -> return true', () => {
            const mapping = [{typeId: '9', content: ''}];
            const schema = new Schema(
                '1',
                'podcast',
                [{id: '5', name: 'name'}]
            );

            const isNotFitIn = schema.isNotFitInWith(mapping);

            assert.isTrue(isNotFitIn);
        });

        test('given content with equal type but a equal name -> return false', () => {
            const mapping = [{typeId: '5', content: ''}];
            const schema = new Schema(
                '1',
                'podcast',
                [{id: '5', name: 'name'}]
            );

            const isNotFitIn = schema.isNotFitInWith(mapping);

            assert.isFalse(isNotFitIn);
        });
    })
});