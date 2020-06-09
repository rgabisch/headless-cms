import {assert} from "chai";
import TypeFactory from "../../../src/domain/factories/TypeFactory";

suite('TypeFactory', () => {

    const factory = new TypeFactory();

    suite('when create', () => {
        test('given 1 when -> type is a text', () => {
            const type = factory.createBy('1');

            assert.isTrue(type.isText());
        });

        test('given 2 when -> type is a rich text', () => {
            const type = factory.createBy('2');

            assert.isTrue(type.isRichText());
        });

        test('given 3 when -> type is a number', () => {
            const type = factory.createBy('3');

            assert.isTrue(type.isNumber());
        });

        test('given 4 when -> type is a date', () => {
            const type = factory.createBy('4');

            assert.isTrue(type.isDate());
        });

        test('given 5 when -> type is a image', () => {
            const type = factory.createBy('5');

            assert.isTrue(type.isImage());
        });

        test('given 6 when -> type is a audio', () => {
            const type = factory.createBy('6');

            assert.isTrue(type.isAudio());
        });
    });
});