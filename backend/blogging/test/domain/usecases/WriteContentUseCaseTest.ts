import {expect} from "chai";
import {UnassignedIdException} from "../../../src/domain/exceptions/DefineSchemaUseCase";
import WriteContentUseCase from "../../../src/domain/usecases/WriteContentUseCase";
import {WriteContentCommand} from "../../../src/domain/commands/WriteContentUseCaseTest";
import {WrittenContentEvent} from "../../../src/domain/events/WriteContentUseCaseTest";
import assert = require("assert");

const testSubject = new WriteContentUseCase();

const creatorId = '1';
const emptyCreatorId = '';
const whitespaceCreatorId = '            ';

const schemaId = '1';
const emptySchemaId = '';
const whitespaceSchemaId = '           ';

const typeId = '1';
const unassignedTypeId = 'unit-test';

suite('Write Content Use Case', () => {
    test('given empty schema id -> throw exception for empty id', async () => {
        let exception;
        const command = new WriteContentCommand(emptySchemaId, creatorId, [{typeId: typeId, content: ''}]);

        try {
            await testSubject.execute(command)
        } catch (e) {
            exception = e;
        } finally {
            expect(exception.name).to.be.equal(UnassignedIdException.name);
        }
    });

    test('given schema id made of whitespace -> throw exception for empty id', async () => {
        let exception;
        const command = new WriteContentCommand(whitespaceSchemaId, creatorId, [{typeId: typeId, content: ''}]);

        try {
            await testSubject.execute(command)
        } catch (e) {
            exception = e;
        } finally {
            expect(exception.name).to.be.equal(UnassignedIdException.name);
        }
    });

    test('given empty creator id -> throw exception for empty id', async () => {
        let exception;
        const command = new WriteContentCommand(schemaId, emptyCreatorId, [{typeId: typeId, content: ''}]);

        try {
            await testSubject.execute(command)
        } catch (e) {
            exception = e;
        } finally {
            expect(exception.name).to.be.equal(UnassignedIdException.name);
        }
    });

    test('given creator id made of whitespace -> throw exception for empty id', async () => {
        let exception;
        const command = new WriteContentCommand(schemaId, whitespaceCreatorId, [{typeId: typeId, content: ''}]);

        try {
            await testSubject.execute(command)
        } catch (e) {
            exception = e;
        } finally {
            expect(exception.name).to.be.equal(UnassignedIdException.name);
        }
    });

    test('given type not included in the schema -> throw exception', async () => {
        let exception;
        const command = new WriteContentCommand(schemaId, creatorId, [{typeId: unassignedTypeId, content: ''}]);

        try {
            await testSubject.execute(command)
        } catch (e) {
            exception = e;
        } finally {
            expect(exception.name).to.be.equal(UnassignedIdException.name);
        }
    });

    test('given schema id, creator id, content -> return written content', async () => {
        const command = new WriteContentCommand(schemaId, creatorId, [{typeId: typeId, content: 'das ist ein Test'}]);

        const writtenContentEvent = await testSubject.execute(command);

        assert.deepStrictEqual(writtenContentEvent, new WrittenContentEvent('9', creatorId, [{
            typeId: typeId,
            content: 'das ist ein Test'
        }]))
    });
});