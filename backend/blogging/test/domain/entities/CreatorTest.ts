import {assert} from 'chai';
import Creator from "../../../src/domain/entities/Creator";
import EmptyValueException from "../../../src/domain/exceptions/EmptyValueException";
import Schema, {TypeDefinition, TypeMappings} from "../../../src/domain/entities/Schema";
import Content from "../../../src/domain/entities/Content";
import {UndefinedSchemaException} from "../../../src/domain/exceptions/UndefinedSchemaException";
import Space from "../../../src/domain/entities/Space";

suite('Creator Entity', () => {
    const creatorId = '16543';
    const schemaId = '53632';
    let space: Space;
    const schema = new Schema(schemaId, 'podcast', new TypeDefinition([]));
    const content = new Content('1', 'my first podcast', schema, new Date(), new TypeMappings([]));
    const otherContent = new Content('2', 'my second podcast', schema, new Date(), new TypeMappings([]));

    setup(() => {
        space = new Space('1', creatorId, 'name');
    });

    suite('constructor', () => {
        test('given empty id -> throws exception for empty value', () => {
            let exception;
            const emptyId = '';

            try {
                const creator = new Creator(emptyId, new Map(), new Map());
            } catch (e) {
                exception = e;
            } finally {
                assert.equal(exception.name, EmptyValueException.name);
            }
        });

        test('given id made of whitespace -> throws exception for empty value', () => {
            let exception;
            const whitespaceId = '    ';

            try {
                const creator = new Creator(whitespaceId, new Map(), new Map());
            } catch (e) {
                exception = e;
            } finally {
                assert.equal(exception.name, EmptyValueException.name);
            }
        });
    });

    suite('define a schema', () => {
        test('given a schema -> creator has defined schema', () => {
            const creator = new Creator(creatorId, new Map(), new Map());

            creator.define(schema);

            assert.isTrue(creator.hasDefined(schemaId))
        });
    });

    suite('validate creator has schema defined', () => {
        test('given a not defined schema -> return false', () => {
            const creator = new Creator(creatorId, new Map(), new Map());

            const hasDefined = creator.hasDefined(schemaId);

            assert.isFalse(hasDefined);
        });

        test('given defined schema -> return true', () => {
            const creator = new Creator(creatorId, new Map(), new Map());
            creator.define(schema);

            const hasDefined = creator.hasDefined(schemaId);

            assert.isTrue(hasDefined);
        });
    });

    suite('validate creator has not schema defined', () => {
        test('given a not defined schema -> return true', () => {
            const creator = new Creator(creatorId, new Map(), new Map());
            const unassignedSchemaId = 'unit-test';
            creator.define(schema);

            const hasNotDefined = creator.hasNotDefined(unassignedSchemaId);

            assert.isTrue(hasNotDefined);
        });

        test('given defined schema -> return false', () => {
            const creator = new Creator(creatorId, new Map(), new Map());
            creator.define(schema);

            const hasNotDefined = creator.hasNotDefined(schema.id);

            assert.isFalse(hasNotDefined);
        });
    });

    suite('write content', () => {
        test('given content, space and an undefined schema -> throws an error', () => {
            let exception;
            const creator = new Creator(creatorId, new Map(), new Map());
            creator.open(new Space('1', creator.id, 'name'));
            const undefinedSchema = new Schema('unit-test', 'podcast', new TypeDefinition([]));
            const content = new Content('1', 'my first podcast', undefinedSchema, new Date(), new TypeMappings([]));

            try {
                creator.write(content, space);
            } catch (e) {
                exception = e;
            } finally {
                assert.equal(exception.name, UndefinedSchemaException.name)
            }
        });

        test('given content and schema -> creator writes content', () => {
            const creator = new Creator(creatorId, new Map(), new Map());
            creator.define(schema);
            creator.open(new Space('1', creatorId, 'name'));
            const content = new Content('1', 'my first podcast', schema, new Date(), new TypeMappings([]));
            creator.write(content, space);

            const expected = creator.getContent(content.id, '1');

            assert.deepEqual(
                content,
                expected
            );
        });
    });

    suite('get one content', () => {
        test('given creator without a space -> return no content', () => {
            const creator = new Creator(creatorId, new Map(), new Map());

            const found = creator.getContent('1', '1');

            assert.isUndefined(found);
        });

        test('given creator with space without content -> return no content', () => {
            const creator = new Creator(creatorId, new Map(), new Map());
            creator.open(space);

            const found = creator.getContent('1', space.id);

            assert.isUndefined(found);
        });

        test('given creator with space and content -> return content', () => {
            const creator = new Creator(creatorId, new Map(), new Map());
            creator.open(space);
            creator.define(schema);
            creator.write(content, space);

            const found = creator.getContent(content.id, space.id);

            assert.deepStrictEqual(found, content);
        });
    });

    suite('get contents of one space', () => {

        test('given creator without spaces -> returns no content', () => {
            const creator = new Creator(creatorId, new Map(), new Map());

            const contents = creator.getContentsOf('1');

            assert.isEmpty(contents);
        });

        test('given creator with spaces without content -> returns no content', () => {
            const creator = new Creator(creatorId, new Map(), new Map());
            creator.open(space);

            const contents = creator.getContentsOf(space.id);

            assert.isEmpty(contents);
        });

        test('given creator with spaces and content -> returns content', () => {
            const creator = new Creator(creatorId, new Map(), new Map());
            creator.define(schema);
            creator.open(space);
            creator.write(content, space);
            creator.write(otherContent, space);

            const contents = creator.getContentsOf(space.id);

            assert.sameMembers(contents, [content, otherContent]);
        });
    });

    suite('get content of all spaces', () => {

        const secondSpace = new Space('2', creatorId, 'other name');

        test('given creator without spaces -> returns no content', () => {
            const creator = new Creator(creatorId, new Map(), new Map());

            const allContents = creator.getAllContents();

            assert.isEmpty(allContents);
        });

        test('given creator without content in spaces -> returns no content', () => {
            const creator = new Creator(creatorId, new Map(), new Map());
            creator.open(space);
            creator.open(secondSpace);

            const allContents = creator.getAllContents();

            assert.isEmpty(allContents);
        });

        test('given creator with content in spaces -> returns content', () => {
            const creator = new Creator(creatorId, new Map(), new Map());
            creator.open(space);
            creator.open(secondSpace);
            creator.define(schema);
            creator.write(content, space);
            creator.write(otherContent, secondSpace);

            const allContents = creator.getAllContents();

            assert.sameMembers(allContents, [content, otherContent]);
        });
    });

    suite('get one space', () => {
        test('given creator without a space -> returns no space', () => {
            const creator = new Creator(creatorId, new Map(), new Map());

            const found = creator.getSpace('1');

            assert.isUndefined(found);
        });

        test('given creator with a space -> returns a space', () => {
            const creator = new Creator(creatorId, new Map(), new Map());
            creator.open(space);

            const found = creator.getSpace(space.id);

            assert.deepStrictEqual(found, space);
        });
    })
});