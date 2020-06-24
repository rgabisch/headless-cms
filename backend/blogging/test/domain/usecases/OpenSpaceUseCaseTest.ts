import {expect} from 'chai';
import OpenSpaceUseCase from "../../../src/domain/usecases/OpenSpaceUseCase";
import OpenSpaceCommand from "../../../src/domain/commands/OpenSpaceCommand";
import EmptyValueException from "../../../src/domain/exceptions/EmptyValueException";
import OpenedSpaceEvent from "../../../src/domain/events/OpenedSpaceEvent";
import MoreThan50CharactersException from "../../../src/domain/exceptions/MoreThan50CharactersException";
import StaticIdGenerator from "../../../src/shared/StaticIdGenerator";
import InMemoryCreatorRepository from "../../../src/infastructure/repositories/InMemoryCreatorRepository";
import Creator from "../../../src/domain/entities/Creator";
import {UnassignedIdException} from "../../../src/domain/exceptions/UnassignedIdException";
import NotUniqueSpaceNameException from "../../../src/domain/exceptions/NotUniqueSpaceNameException";

const userId = '1';
const otherUserId = '5';
const spaceId = '2';
const emptyName = '';
const emptyUserId = '';
const nameWithOnlyWhitespace = '        ';
const userIdWithOnlyWhitespace = '        ';
const nameMadeOfOneCharacter = 'a';
const nameMadeOf50Characters = 'a'.repeat(50);
const nameMadeOf51Characters = 'a'.repeat(51);
const name = nameMadeOfOneCharacter;

let testSubject: OpenSpaceUseCase;
let creatorRepository: InMemoryCreatorRepository;

suite('Open Space Use Case', () => {

    setup(async () => {
        creatorRepository = new InMemoryCreatorRepository();
        await creatorRepository.add(new Creator(userId, new Map(), new Map()));
        testSubject = new OpenSpaceUseCase(creatorRepository, new StaticIdGenerator(spaceId));
    });

    suite('when execute', () => {

        test('given empty name -> throws exception for an empty name', async () => {
            let exception;
            const command = new OpenSpaceCommand(emptyName, userId);

            try {
                await testSubject.execute(command)
            } catch (e) {
                exception = e;
            } finally {
                expect(exception.name).to.be.equal(EmptyValueException.name);
            }
        });

        test('given whitespaces as name -> throws exception for an empty name', async () => {
            let exception;
            const command = new OpenSpaceCommand(nameWithOnlyWhitespace, userId);

            try {
                await testSubject.execute(command)
            } catch (e) {
                exception = e;
            } finally {
                expect(exception.name).to.be.equal(EmptyValueException.name);
            }
        });

        test('given more than 50 characters as name -> throws exception for more than 50 characters', async () => {
            let exception;
            const command = new OpenSpaceCommand(nameMadeOf51Characters, userId);

            try {
                await testSubject.execute(command)
            } catch (e) {
                exception = e;
            } finally {
                expect(exception.name).to.be.equal(MoreThan50CharactersException.name);
            }
        });

        test('given same name, same user id -> throws exception for unique space names', async () => {
            let exception;
            const previous = new OpenSpaceCommand(name, userId);
            const command = new OpenSpaceCommand(name, userId);
            await testSubject.execute(previous);

            try {
                await testSubject.execute(command);
            } catch (e) {
                exception = e;
            } finally {
                expect(exception.name).to.be.equal(NotUniqueSpaceNameException.name);
            }
        });

        test('given an empty user id -> throws exception for empty user id', async () => {
            let exception;
            const command = new OpenSpaceCommand(name, emptyUserId);

            try {
                await testSubject.execute(command)
            } catch (e) {
                exception = e;
            } finally {
                expect(exception.name).to.be.equal(UnassignedIdException.name);
            }
        });

        test('given only whitespaces as user id -> throws exception for empty user id', async () => {
            let exception;
            const command = new OpenSpaceCommand(name, userIdWithOnlyWhitespace);

            try {
                await testSubject.execute(command)
            } catch (e) {
                exception = e;
            } finally {
                expect(exception.name).to.be.equal(UnassignedIdException.name);
            }
        });

        suite('given one character and same user id', () => {
            test('it returns an event', async () => {
                const command = new OpenSpaceCommand(nameMadeOfOneCharacter, userId);

                const openedSpaceEvent = await testSubject.execute(command);

                const expected = new OpenedSpaceEvent(spaceId, nameMadeOfOneCharacter);
                expect(openedSpaceEvent).to.be.deep.equal(expected)
            });


            test('it stores the space in an repository', async () => {
                await creatorRepository.add(new Creator(otherUserId, new Map(), new Map()));
                const previous = new OpenSpaceCommand(nameMadeOfOneCharacter, otherUserId);
                await testSubject.execute(previous);
                const command = new OpenSpaceCommand(nameMadeOfOneCharacter, userId);

                const openedSpaceEvent = await testSubject.execute(command);

                const expected = new OpenedSpaceEvent(spaceId, nameMadeOfOneCharacter);
                expect(openedSpaceEvent).to.be.deep.equal(expected)
            });

            test('when other user opened a space with the same name -> it stores the space in an repository', async () => {
                const command = new OpenSpaceCommand(nameMadeOfOneCharacter, userId);

                await testSubject.execute(command);

                const creator = <Creator>await creatorRepository.findBy(userId);
                expect(creator.hasOpens(spaceId)).to.be.true;
            });
        });

        suite('given 50 character and same user id', () => {
            test('it returns an event', async () => {
                const command = new OpenSpaceCommand(nameMadeOf50Characters, userId);

                const openedSpaceEvent = await testSubject.execute(command);

                const expected = new OpenedSpaceEvent(spaceId, nameMadeOf50Characters);
                expect(openedSpaceEvent).to.be.deep.equal(expected);
            });

            test('it stores the space in the repository', async () => {
                await creatorRepository.add(new Creator(otherUserId, new Map(), new Map()));
                const previous = new OpenSpaceCommand(nameMadeOf50Characters, otherUserId);
                await testSubject.execute(previous);
                const command = new OpenSpaceCommand(nameMadeOf50Characters, userId);

                const openedSpaceEvent = await testSubject.execute(command);

                const expected = new OpenedSpaceEvent(spaceId, nameMadeOf50Characters);
                expect(openedSpaceEvent).to.be.deep.equal(expected)
            });

            test('when other user opened a space with the same name -> it stores the space in a repository', async () => {
                const command = new OpenSpaceCommand(nameMadeOf50Characters, userId);

                await testSubject.execute(command);

                const creator = <Creator>await creatorRepository.findBy(userId);
                expect(creator.hasOpens(spaceId)).to.be.true;
            });
        });
    });
});
