import {assert} from 'chai';

import CreateCreatorUseCase from "../../../src/domain/usecases/CreateCreatorUseCase";
import CreateCreatorCommand from "../../../src/domain/commands/CreateCreatorCommand";
import AssignedIdException from "../../../src/domain/exceptions/AssignedIdException";
import CreateCreatorEvent from "../../../src/domain/events/CreateCreatorEvent";
import {CreatorRepository} from "../../../src/domain/repositories/CreatorRepository";
import InMemoryCreatorRepository from "../../../src/infastructure/repositories/InMemoryCreatorRepository";
import Creator from "../../../src/domain/entities/Creator";

suite('Create Creator Use Case', () => {

    suite('when execute', () => {

        let testSubject: CreateCreatorUseCase;
        let creatorRepository: CreatorRepository;

        setup(() => {
            creatorRepository = new InMemoryCreatorRepository();
            testSubject = new CreateCreatorUseCase(creatorRepository);
        });

        test('given an assigned id -> throws an exception', async () => {
            const assignedId = '1';
            await creatorRepository.add(new Creator(assignedId, new Map(), new Map()));
            const command = new CreateCreatorCommand(assignedId);

            let exception;
            try {
                await testSubject.execute(command);
            } catch (e) {
                exception = e;
            } finally {
                assert.equal(exception.name, AssignedIdException.name)
            }
        });

        test('given an unassigned id -> create an creator', async () => {
            await creatorRepository.add(new Creator('1', new Map(), new Map()));
            const unassignedId = '2';
            const command = new CreateCreatorCommand(unassignedId);

            const event = await testSubject.execute(command);

            assert.deepStrictEqual(
                event,
                new CreateCreatorEvent(unassignedId)
            )
        });

        test('given an unassigned id -> stores creator in the repository', async () => {
            await creatorRepository.add(new Creator('1', new Map(), new Map()));
            const unassignedId = '2';
            const command = new CreateCreatorCommand(unassignedId);

            await testSubject.execute(command);

            assert.isDefined(creatorRepository.findBy(unassignedId))
        });

    })

});