import {expect} from "chai";
import {UnassignedIdException} from "../../../src/domain/exceptions/DefineSchemaUseCase";
import WriteContentUseCase from "../../../src/domain/usecases/WriteContentUseCase";
import WriteContentCommand from "../../../src/domain/commands/WriteContentCommand";
import {WrittenContentEvent} from "../../../src/domain/events/WriteContentUseCaseTest";
import InMemoryCreatorRepository from "../../../src/infastructure/repositories/InMemoryCreatorRepository";
import Creator from "../../../src/domain/entities/Creator";
import StaticIdGenerator from "../../../src/shared/StaticIdGenerator";
import Schema, {TypeDefinition, TypeMapping} from "../../../src/domain/entities/Schema";
import Content from "../../../src/domain/entities/Content";
import Type from "../../../src/domain/entities/Type";
import TypeFactory from "../../../src/domain/factories/TypeFactory";
import assert = require("assert");
import Space from "../../../src/domain/entities/Space";

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
const typeName = 'unit-test';

const spaceId = '1';

class FakeType extends Type {
    constructor(id: string) {
        super(id);
    }
}

class FakeTypeFactory extends TypeFactory {
    createBy(id: string): Type {
        return new FakeType(id);
    }
}

let creator: Creator;

suite('Write Content Use Case', () => {

    setup(() => {
        creator = new Creator(creatorId, new Map<string, Schema>().set(schemaId, new Schema(schemaId, schemaName, new TypeDefinition([{
            type: new FakeType(typeId),
            name: typeName
        }]))), new Map());
        creatorRepository = new InMemoryCreatorRepository();
        testSubject = new WriteContentUseCase(creatorRepository, new StaticIdGenerator(contentId), new FakeTypeFactory());
    });

    test('given empty schema id -> throw exception for empty id', async () => {
        let exception;
        const command = new WriteContentCommand(emptySchemaId, creatorId, spaceId, [{
            typeId: typeId,
            name: schemaName,
            content: ''
        }]);

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
        const command = new WriteContentCommand(whitespaceSchemaId, creatorId, spaceId, [{
            typeId: typeId,
            name: schemaName,
            content: ''
        }]);

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
        const command = new WriteContentCommand(schemaId, emptyCreatorId, spaceId, [{
            typeId: typeId,
            name: schemaName,
            content: ''
        }]);

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
        const command = new WriteContentCommand(schemaId, whitespaceCreatorId, spaceId, [{
            typeId: typeId,
            name: schemaName,
            content: ''
        }]);

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
        const command = new WriteContentCommand(schemaId, unassignedCreatorId, spaceId, [{
            typeId: typeId,
            name: schemaName,
            content: ''
        }]);

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
        const command = new WriteContentCommand(unassignedSchemaId, creatorId, spaceId, [{
            typeId: typeId,
            name: schemaName,
            content: ''
        }]);

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
        const command = new WriteContentCommand(schemaId, creatorId, spaceId, [{
            typeId: unassignedTypeId,
            name: schemaName,
            content: ''
        }]);

        try {
            await testSubject.execute(command)
        } catch (e) {
            exception = e;
        } finally {
            expect(exception.name).to.be.equal(UnassignedIdException.name);
        }
    });

    test('given schema id, creator id, content -> return written content', async () => {
        const content = 'content';
        creator.open(new Space('1', '1', 'my personal podcast'));
        await creatorRepository.add(creator);
        const command = new WriteContentCommand(schemaId, creatorId, spaceId, [{
            typeId: typeId,
            name: typeName,
            content: content
        }]);

        const writtenContentEvent = await testSubject.execute(command);
        assert.deepStrictEqual(
            writtenContentEvent,
            new WrittenContentEvent(contentId, creatorId, [{
                typeId: typeId,
                name: typeName,
                content: content
            }]))
    });

    test('given schema id, creator id, content -> stores content', async () => {
        await creatorRepository.add(creator);
        creator.open(new Space('1', '1', 'my personal podcast'));
        const command = new WriteContentCommand(schemaId, creatorId, spaceId, [{
            typeId: typeId,
            name: typeName,
            content: 'unit test'
        }]);

        await testSubject.execute(command);
        const actual = (<Creator>await creatorRepository.findBy(creatorId)).getContent(contentId, spaceId);
        assert.deepStrictEqual(
            actual,
            new Content(
                contentId,
                new Schema(schemaId, schemaName, new TypeDefinition([{
                    type: new FakeType(typeId),
                    name: typeName
                }])),
                new TypeMapping([{
                    type: new FakeType(typeId),
                    name: typeName,
                    content: 'unit test'
                }])
            )
        );
    });
});