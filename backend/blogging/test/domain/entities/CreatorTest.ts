import {assert, expect, should} from 'chai';
import Creator from "../../../src/domain/entities/Creator";
import EmptyValueException from "../../../src/domain/exceptions/EmptyValueException";
import Schema, {TypeDefinition, TypeMappings} from "../../../src/domain/entities/Schema";
import Content from "../../../src/domain/entities/Content";
import {UndefinedSchemaException} from "../../../src/domain/exceptions/UndefinedSchemaException";
import Space from "../../../src/domain/entities/Space";

suite('Creator Entity', () => {
    const creatorId = '16543';
    const schemaId = '53632';
    const space = new Space('1', creatorId, 'name');
    const schema = new Schema(schemaId, 'podcast', new TypeDefinition([]));

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
    })
});