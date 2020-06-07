import {assert} from "chai";
import ViewContentUseCase from "../../../src/domain/usecases/ViewContentUseCase";
import {UnassignedIdException} from "../../../src/domain/exceptions/UnassignedIdException";
import InMemoryCreatorRepository from "../../../src/infastructure/repositories/InMemoryCreatorRepository";
import Creator from "../../../src/domain/entities/Creator";
import Schema, {TypeDefinition, TypeMappings} from "../../../src/domain/entities/Schema";
import Space from "../../../src/domain/entities/Space";
import Content from "../../../src/domain/entities/Content";
import ViewContentCommand from "../../../src/domain/commands/ViewContentCommand";
import ViewContentEvent from "../../../src/domain/events/ViewContentEvent";

suite('View Content Use Case', () => {

    let creatorRepository: InMemoryCreatorRepository;
    let testSubject: ViewContentUseCase;
    const dateFormat = "DD.MM.YY HH:mm";

    setup(() => {
        creatorRepository = new InMemoryCreatorRepository();
        testSubject = new ViewContentUseCase(creatorRepository);
    });

    suite('when execute', () => {
        test('given unassigned creator id -> throws exception', async () => {
            const command = new ViewContentCommand('1', '2', '3', dateFormat);

            let exception;
            try {
                await testSubject.execute(command);
            } catch (e) {
                exception = e;
            } finally {
                assert.equal(exception.name, UnassignedIdException.name);
            }
        });

        test('given unassigned space id -> throws exception', async () => {
            const creator = new Creator('1', new Map(), new Map());
            await creatorRepository.add(creator);
            const command = new ViewContentCommand(creator.id, '2', '3', dateFormat);

            let exception;
            try {
                await testSubject.execute(command);
            } catch (e) {
                exception = e;
            } finally {
                assert.equal(exception.name, UnassignedIdException.name);
            }
        });

        test('given unassigned content id -> throws exception', async () => {
            const creator = new Creator('1', new Map(), new Map());
            const space = new Space('2', creator.id, 'My Podcast');
            creator.open(space);
            await creatorRepository.add(creator);
            const command = new ViewContentCommand(creator.id, space.id, '1', dateFormat);

            let exception;
            try {
                await testSubject.execute(command);
            } catch (e) {
                exception = e;
            } finally {
                assert.equal(exception.name, UnassignedIdException.name);
            }
        });

        test('given assigned creator, space, content id when content was written -> returns an event', async () => {
            const creator = new Creator('1', new Map(), new Map());
            const space = new Space('2', creator.id, 'My Podcast');
            const schema = new Schema('1', 'podcast', new TypeDefinition([]));
            const content = new Content('3', 'my first podcast', schema, new Date(), new TypeMappings([]));
            creator.open(space);
            creator.define(schema);
            creator.write(content, space);
            await creatorRepository.add(creator);
            const command = new ViewContentCommand(creator.id, space.id, content.id, dateFormat);

            const event = await testSubject.execute(command);

            assert.deepEqual(
                event,
                new ViewContentEvent(
                    content.id,
                    content.name,
                    content.creationDate,
                    {
                        id: schema.id,
                        name: schema.name
                    },
                    []
                )
            );
        });
    });

});