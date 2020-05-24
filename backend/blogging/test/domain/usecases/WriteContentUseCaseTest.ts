import {expect} from "chai";
import {UnassignedIdException} from "../../../src/domain/exceptions/DefineSchemaUseCase";
import WriteContentUseCase from "../../../src/domain/usecases/WriteContentUseCase";
import {WriteContentCommand} from "../../../src/domain/commands/WriteContentCommand";
import {WrittenContentEvent} from "../../../src/domain/events/WriteContentUseCaseTest";
import InMemoryCreatorRepository from "../../../src/infastructure/repositories/InMemoryCreatorRepository";
import Creator from "../../../src/domain/entities/Creator";
import StaticIdGenerator from "../../../src/shared/StaticIdGenerator";
import Schema from "../../../src/domain/entities/Schema";
import assert = require("assert");
import Content from "../../../src/domain/entities/Content";

let creatorRepository: InMemoryCreatorRepository;
let testSubject: WriteContentUseCase;

const contentId = '1';

const creatorId = '1';
const unassignedCreatorId = '500';
const emptyCreatorId = '';
const whitespaceCreatorId = '            ';

const schemaId = '1';
const unassignedSchemaId = '500';
const emptySchemaId = '';
const whitespaceSchemaId = '           ';
const schemaName = 'Podcast';

const typeId = '1';
const unassignedTypeId = 'unit-test';

const creator = new Creator(creatorId, new Map<string, Schema>().set(schemaId, new Schema(schemaId, schemaName, [{
    id: typeId,
    name: 'unit test'
}])), new Map());

suite('Write Content Use Case', () => {

    setup(() => {
        creatorRepository = new InMemoryCreatorRepository();
        testSubject = new WriteContentUseCase(creatorRepository, new StaticIdGenerator(contentId));
    });

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

    test('given unassigned creator id -> throw exception for unassigned id', async () => {
        let exception;
        const command = new WriteContentCommand(schemaId, unassignedCreatorId, [{typeId: typeId, content: ''}]);

        try {
            await testSubject.execute(command)
        } catch (e) {
            exception = e;
        } finally {
            expect(exception.name).to.be.equal(UnassignedIdException.name);
        }

    });

    test('given unassigned schema id -> throw exception for unassigned id', async () => {
        await creatorRepository.add(new Creator(creatorId, new Map<string, Schema>(), new Map()));

        let exception;
        const command = new WriteContentCommand(unassignedSchemaId, creatorId, [{typeId: typeId, content: ''}]);

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
        await creatorRepository.add(creator);
        const command = new WriteContentCommand(schemaId, creatorId, [{typeId: typeId, content: 'unit test'}]);

        const writtenContentEvent = await testSubject.execute(command);

        assert.deepStrictEqual(
            writtenContentEvent,
            new WrittenContentEvent(contentId, creatorId, [{
                typeId: typeId,
                content: 'unit test'
            }]))
    });

    test('given schema id, creator id, content -> stores content', async () => {
        await creatorRepository.add(creator);
        const command = new WriteContentCommand(schemaId, creatorId, [{typeId: typeId, content: 'unit test'}]);

        await testSubject.execute(command);

        assert.deepStrictEqual(
            await creatorRepository.findBy(creatorId),
            new Creator(
                creatorId,
                new Map().set(schemaId, new Schema(schemaId, schemaName, [{id: typeId, name: 'unit test'}])),
                new Map().set(
                    contentId,
                    new Content(
                        contentId,
                        new Schema(schemaId, schemaName, [{id: typeId, name: 'unit test'}]),
                        [{
                            typeId: typeId,
                            content: 'unit test'
                        }]
                    )
                )
            )
        );
    });
});