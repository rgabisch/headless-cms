import {assert} from "chai";
import Type, {TypeId} from "../../../src/domain/entities/Type";

suite('Type', () => {

    suite('when validate if it is a text', () => {
        const text = new Type(TypeId.Text);

        test('it is text', () => {
            const isText = text.isText();

            assert.isTrue(isText);
        });

        test('it is not a rich text', () => {
            const isRichText = text.isRichText();

            assert.isFalse(isRichText);
        });

        test('it is not a number', () => {
            const isNumber = text.isNumber();

            assert.isFalse(isNumber);
        });

        test('it is not a date', () => {
            const isDate = text.isDate();

            assert.isFalse(isDate);
        });

        test('it is not an image', () => {
            const isImage = text.isImage();

            assert.isFalse(isImage);
        });

        test('it is not an audio', () => {
            const isAudio = text.isAudio();

            assert.isFalse(isAudio);
        });
    });

    suite('when validate if it is a rich text', () => {
        const text = new Type(TypeId.RichText);

        test('it is rich text', () => {
            const isRichText = text.isRichText();

            assert.isTrue(isRichText);
        });

        test('it is not a text', () => {
            const isText = text.isText();

            assert.isFalse(isText);
        });

        test('it is not a number', () => {
            const isNumber = text.isNumber();

            assert.isFalse(isNumber);
        });

        test('it is not a date', () => {
            const isDate = text.isDate();

            assert.isFalse(isDate);
        });

        test('it is not an image', () => {
            const isImage = text.isImage();

            assert.isFalse(isImage);
        });

        test('it is not a audio', () => {
            const isAudio = text.isAudio();

            assert.isFalse(isAudio);
        });
    });

    suite('when validate if it is a number', () => {
        const text = new Type(TypeId.Number);

        test('it is number', () => {
            const isNumber = text.isNumber();

            assert.isTrue(isNumber);
        });

        test('it is not a text', () => {
            const isText = text.isText();

            assert.isFalse(isText);
        });

        test('it is not a rich text', () => {
            const isRichText = text.isRichText();

            assert.isFalse(isRichText);
        });

        test('it is not a date', () => {
            const isDate = text.isDate();

            assert.isFalse(isDate);
        });

        test('it is not an image', () => {
            const isImage = text.isImage();

            assert.isFalse(isImage);
        });

        test('it is not a audio', () => {
            const isAudio = text.isAudio();

            assert.isFalse(isAudio);
        });
    });

    suite('when validate if it is a date', () => {
        const text = new Type(TypeId.Date);

        test('it is date', () => {
            const isDate = text.isDate();

            assert.isTrue(isDate);
        });

        test('it is not a text', () => {
            const isText = text.isText();

            assert.isFalse(isText);
        });

        test('it is not a rich text', () => {
            const isRichText = text.isRichText();

            assert.isFalse(isRichText);
        });

        test('it is not a number', () => {
            const isNumber = text.isNumber();

            assert.isFalse(isNumber);
        });

        test('it is not an image', () => {
            const isImage = text.isImage();

            assert.isFalse(isImage);
        });

        test('it is not a audio', () => {
            const isAudio = text.isAudio();

            assert.isFalse(isAudio);
        });
    });

    suite('when validate if it is an audio', () => {
        const text = new Type(TypeId.Audio);

        test('it isn audio', () => {
            const isAudio = text.isAudio();

            assert.isTrue(isAudio);
        });

        test('it is not a text', () => {
            const isText = text.isText();

            assert.isFalse(isText);
        });

        test('it is not a rich text', () => {
            const isRichText = text.isRichText();

            assert.isFalse(isRichText);
        });

        test('it is not a number', () => {
            const isNumber = text.isNumber();

            assert.isFalse(isNumber);
        });

        test('it is not an image', () => {
            const isImage = text.isImage();

            assert.isFalse(isImage);
        });

        test('it is not a date', () => {
            const isDate = text.isDate();

            assert.isFalse(isDate);
        });
    });

    suite('when validate if it is an image', () => {
        const text = new Type(TypeId.Image);

        test('it isn image', () => {
            const isImage = text.isImage();

            assert.isTrue(isImage);
        });

        test('it is not a text', () => {
            const isText = text.isText();

            assert.isFalse(isText);
        });

        test('it is not a rich text', () => {
            const isRichText = text.isRichText();

            assert.isFalse(isRichText);
        });

        test('it is not a number', () => {
            const isNumber = text.isNumber();

            assert.isFalse(isNumber);
        });

        test('it is not an audio', () => {
            const isAudio = text.isAudio();

            assert.isFalse(isAudio);
        });

        test('it is not a date', () => {
            const isDate = text.isDate();

            assert.isFalse(isDate);
        });
    });


});