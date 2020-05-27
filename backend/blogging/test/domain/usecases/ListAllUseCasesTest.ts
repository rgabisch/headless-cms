import ListAllContentsOfASpaceUseCase, {
    ListAllContentsCommand,
    ListedAllContentsEvent
} from "../../../src/domain/usecases/ListAllContentsUseCase";
import InMemoryCreatorRepository from "../../../src/infastructure/repositories/InMemoryCreatorRepository";
import {assert} from "chai";
import {UnassignedIdException} from "../../../src/domain/exceptions/DefineSchemaUseCase";
import Creator from "../../../src/domain/entities/Creator";
import Space from "../../../src/domain/entities/Space";
import Content from "../../../src/domain/entities/Content";
import Schema, {TypeDefinition, TypeMapping} from "../../../src/domain/entities/Schema";

suite('List All Content Use Cases', () => {

    let creatorRepository: InMemoryCreatorRepository;
    let testSubject: ListAllContentsOfASpaceUseCase;

    setup(() => {
        creatorRepository = new InMemoryCreatorRepository();
        testSubject = new ListAllContentsOfASpaceUseCase(creatorRepository);
    });

    suite('when execute', () => {
        test('given an unassigned creator id -> throws exception', async () => {
            const command = new ListAllContentsCommand('1', '1');

            let exception;
            try {
                await testSubject.execute(command);
            } catch (e) {
                exception = e;
            } finally {
                assert.equal(exception.name, UnassignedIdException.name);
            }
        });

        test('given an unassigned space id -> throws exception', async () => {
            const creator = new Creator('1', new Map(), new Map());
            await creatorRepository.add(creator);
            const command = new ListAllContentsCommand(creator.id, '1');

            let exception;
            try {
                await testSubject.execute(command);
            } catch (e) {
                exception = e;
            } finally {
                assert.equal(exception.name, UnassignedIdException.name);
            }
        });

        test('given an assigned creator id and spade id with no content in this space -> returns an event that contains no content', async () => {
            const creator = new Creator('1', new Map(), new Map());
            const space = new Space('2', creator.id, 'My Podcast');
            creator.open(space);
            await creatorRepository.add(creator);
            const command = new ListAllContentsCommand(creator.id, space.id);

            const event = await testSubject.execute(command);

            assert.equal(event, new ListedAllContentsEvent([]));
        });

        test('given an assigned creator id and spade id with content in this space -> returns an event with content', async () => {
            const contentName = 'my first podcast';
            const creator = new Creator('1', new Map(), new Map());
            const space = new Space('2', creator.id, 'My Podcast');
            const schema = new Schema('4', 'Podcast', new TypeDefinition([]));
            const typeMapping = new TypeMapping([]);
            const content = new Content('3', schema, typeMapping);
            space.add(content);
            creator.open(space);
            await creatorRepository.add(creator);
            const command = new ListAllContentsCommand(creator.id, space.id);

            const event = await testSubject.execute(command);

            assert.equal(event, new ListedAllContentsEvent([{id: content.id, name: contentName}]));
        });
    });

});