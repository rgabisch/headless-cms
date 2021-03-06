import {assert, expect} from "chai";
import {UnassignedIdException} from "../../../src/domain/exceptions/UnassignedIdException";
import WriteContentUseCase from "../../../src/domain/usecases/WriteContentUseCase";
import WriteContentCommand from "../../../src/domain/commands/WriteContentCommand";
import {WrittenContentEvent} from "../../../src/domain/events/WriteContentEvent";
import InMemoryCreatorRepository from "../../../src/infastructure/repositories/InMemoryCreatorRepository";
import Creator from "../../../src/domain/entities/Creator";
import StaticIdGenerator from "../../../src/shared/StaticIdGenerator";
import Schema, {TypeDefinition} from "../../../src/domain/entities/Schema";
import Type, {TypeId} from "../../../src/domain/entities/Type";
import Space from "../../../src/domain/entities/Space";
import StaticDateGenerator from "../../../src/shared/StaticDateGenerator";
import TypeFactory from "../../../src/domain/factories/TypeFactory";
import TranscribeAudioUseCase from "../../../../transcribing/src/TranscribeAudioUseCase";
import {TranscribeStrategy} from "../../../../transcribing/src/TranscribeAudioStrategy";

let creatorRepository: InMemoryCreatorRepository;
let testSubject: WriteContentUseCase;

const contentId = '1';
const contentName = 'my first podcast';

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

const dateFormat = "DD.MM.YY HH:mm";

let creator: Creator;
let dateGenerator = new StaticDateGenerator(new Date());

const transcribeStrategy = new class implements TranscribeStrategy {
    async transcribe(readSteam: Buffer, fileExtension: "mp3" | "flac"): Promise<string> {
        return 'lalal';
    }

}

suite('Write Content Use Case', () => {

    setup(() => {
        creator = new Creator(creatorId, new Map<string, Schema>().set(schemaId, new Schema(schemaId, schemaName, new TypeDefinition([{
            type: new Type(TypeId.Text),
            name: typeName
        }]))), new Map());
        creatorRepository = new InMemoryCreatorRepository();
        testSubject = new WriteContentUseCase(
            creatorRepository,
            new StaticIdGenerator(contentId),
            new TypeFactory(),
            dateGenerator,
            new TranscribeAudioUseCase(transcribeStrategy)
        );
    });

    test('given empty schema id -> throw exception for empty id', async () => {
        let exception;
        const command = new WriteContentCommand(emptySchemaId, creatorId, spaceId, contentName, [{
                typeId: typeId,
                name: schemaName,
                content: ''
            }],
            dateFormat);

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
        const command = new WriteContentCommand(whitespaceSchemaId, creatorId, spaceId, contentName, [{
                typeId: typeId,
                name: schemaName,
                content: ''
            }],
            dateFormat);

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
        const command = new WriteContentCommand(schemaId, emptyCreatorId, spaceId, contentName, [{
                typeId: typeId,
                name: schemaName,
                content: ''
            }],
            dateFormat);

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
        const command = new WriteContentCommand(schemaId, whitespaceCreatorId, spaceId, contentName, [{
                typeId: typeId,
                name: schemaName,
                content: ''
            }],
            dateFormat);

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
        const command = new WriteContentCommand(schemaId, unassignedCreatorId, spaceId, contentName, [{
                typeId: typeId,
                name: schemaName,
                content: ''
            }],
            dateFormat);

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
        const command = new WriteContentCommand(unassignedSchemaId, creatorId, spaceId, contentName, [{
                typeId: typeId,
                name: schemaName,
                content: ''
            }],
            dateFormat);

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
        const command = new WriteContentCommand(schemaId, creatorId, spaceId, contentName, [{
                typeId: unassignedTypeId,
                name: schemaName,
                content: ''
            }],
            dateFormat);

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
        creator.open(new Space('1', 'my personal podcast'));
        await creatorRepository.add(creator);
        const command = new WriteContentCommand(schemaId, creatorId, spaceId, contentName, [{
                typeId: typeId,
                name: typeName,
                content: content
            }],
            dateFormat);

        const writtenContentEvent = await testSubject.execute(command);
        assert.deepStrictEqual(
            writtenContentEvent,
            new WrittenContentEvent(
                contentId,
                creatorId,
                dateGenerator.generate(),
                dateGenerator.generate(),
                [{
                    typeId: typeId,
                    name: typeName,
                    content: content
                }]
            )
        )
    });

    test('given schema id, creator id, content -> stores content', async () => {
        await creatorRepository.add(creator);
        creator.open(new Space('1', 'my personal podcast'));
        const command = new WriteContentCommand(schemaId, creatorId, spaceId, contentName, [{
                typeId: typeId,
                name: typeName,
                content: 'unit test'
            }],
            dateFormat);

        await testSubject.execute(command);

        const actual = (<Creator>await creatorRepository.findBy(creatorId));
        assert.isTrue(actual.hasWritten(contentId, spaceId));
    });
});