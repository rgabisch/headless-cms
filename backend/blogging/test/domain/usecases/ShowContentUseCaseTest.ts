import {assert} from "chai";
import ShowContentUseCase from "../../../src/domain/usecases/ShowContentUseCase";
import {UnassignedIdException} from "../../../src/domain/exceptions/UnassignedIdException";
import {CreatorRepository} from "../../../src/domain/repositories/CreatorRepository";
import InMemoryCreatorRepository from "../../../src/infastructure/repositories/InMemoryCreatorRepository";
import Creator from "../../../src/domain/entities/Creator";
import Schema, {TypeDefinition, TypeMapping} from "../../../src/domain/entities/Schema";
import Space from "../../../src/domain/entities/Space";
import Content from "../../../src/domain/entities/Content";
import ShowContentCommand from "../../../src/domain/commands/ShowContentCommand";
import ShowContentEvent from "../../../src/domain/events/ShowContentEvent";

suite('Show Content Use Case', () => {

    let creatorRepository: InMemoryCreatorRepository;
    const testSubject = new ShowContentUseCase();

    suite('when execute', () => {
        test('given unassigned creator id -> throws exception', async () => {
            const command = new ShowContentCommand('1', '2', '3');

            let exception;
            try {
                testSubject.execute(command);
            } catch (e) {
                exception = e;
            } finally {
                assert.equal(exception.name, UnassignedIdException.name);
            }
        });

        test('given unassigned space id -> throws exception', async () => {
            const creator = new Creator('1', new Map(), new Map());
            await creatorRepository.add(creator);
            const command = new ShowContentCommand(creator.id, '2', '3');

            let exception;
            try {
                testSubject.execute(command);
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
            const command = new ShowContentCommand(creator.id, space.id, '1');

            let exception;
            try {
                testSubject.execute(command);
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
            const content = new Content('3', 'my first podcast', schema, new TypeMapping([]));
            creator.open(space);
            creator.write(content, space);
            await creatorRepository.add(creator);
            const command = new ShowContentCommand(creator.id, space.id, content.id);

            const event = testSubject.execute(command);

            assert.equal(
                event,
                new ShowContentEvent(
                    content.id,
                    content.name,
                    {
                        id: schema.id,
                        name: schema.name
                    },
                    []
                )
            );
        });
    })

});