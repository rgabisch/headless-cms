import {expect} from 'chai';
import OpenSpaceUseCase from "../../../src/domain/usecases/OpenSpaceUseCase";
import OpenSpaceCommand from "../../../src/domain/commands/OpenSpaceCommand";
import EmptySpaceNameException from "../../../src/domain/exceptions/EmptySpaceNameException";
import OpenedSpaceEvent from "../../../src/domain/events/OpenedSpaceEvent";
import MoreThan50CharactersSpaceNameException
    from "../../../src/domain/exceptions/MoreThan50CharactersSpaceNameException";
import InMemorySpaceRepository from "../../../src/infastructure/repositories/InMemorySpaceRepository";
import StaticIdGenerator from "../../../src/shared/StaticIdGenerator";
import Space from "../../../src/domain/entities/Space";

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
let repository: InMemorySpaceRepository;

suite('Open Space Use Case', () => {

    setup(() => {
        repository = new InMemorySpaceRepository();
        testSubject = new OpenSpaceUseCase(repository, new StaticIdGenerator(spaceId));
    });

    suite('when execute', () => {

        test('given empty name -> throws exception for an empty name', () => {
            let exception;
            const command = new OpenSpaceCommand(emptyName, userId);

            try {
                testSubject.execute(command)
            } catch (e) {
                exception = e;
            } finally {
                expect(exception.name).to.be.equal('EmptySpaceNameException');
            }
        });

        test('given whitespaces as name -> throws exception for an empty name', () => {
            let exception;
            const command = new OpenSpaceCommand(nameWithOnlyWhitespace, userId);

            try {
                testSubject.execute(command)
            } catch (e) {
                exception = e;
            } finally {
                expect(exception.name).to.be.equal('EmptySpaceNameException');
            }
        });

        test('given more than 50 characters as name -> throws exception for more than 50 characters', () => {
            let exception;
            const command = new OpenSpaceCommand(nameMadeOf51Characters, userId);

            try {
                testSubject.execute(command)
            } catch (e) {
                exception = e;
            } finally {
                expect(exception.name).to.be.equal('MoreThan50CharactersSpaceNameException');
            }
        });

        test('given same name, same user id -> throws exception for unique space names', () => {
            let exception;
            const previous = new OpenSpaceCommand(name, userId);
            const command = new OpenSpaceCommand(name, userId);
            testSubject.execute(previous);

            try {
                testSubject.execute(command);
            } catch (e) {
                exception = e;
            } finally {
                expect(exception.name).to.be.equal('NotUniqueSpaceNameException');
            }
        });

        test('given an empty user id -> throws exception for empty user id', () => {
            let exception;
            const command = new OpenSpaceCommand(name, emptyUserId);

            try {
                testSubject.execute(command)
            } catch (e) {
                exception = e;
            } finally {
                expect(exception.name).to.be.equal('EmptyUserIdException');
            }
        });

        test('given only whitespaces as user id -> throws exception for empty user id', () => {
            let exception;
            const command = new OpenSpaceCommand(name, userIdWithOnlyWhitespace);

            try {
                testSubject.execute(command)
            } catch (e) {
                exception = e;
            } finally {
                expect(exception.name).to.be.equal('EmptyUserIdException');
            }
        });

        suite('given one character and same user id', () => {
            test('it returns an event', () => {
                const command = new OpenSpaceCommand(nameMadeOfOneCharacter, userId);

                const openedSpaceEvent = testSubject.execute(command);

                const expected = new OpenedSpaceEvent(spaceId, nameMadeOfOneCharacter);
                expect(openedSpaceEvent).to.be.deep.equal(expected)
            });

            test('it stores the space in the repository', () => {
                const previous = new OpenSpaceCommand(nameMadeOfOneCharacter, otherUserId);
                testSubject.execute(previous);
                const command = new OpenSpaceCommand(nameMadeOfOneCharacter, userId);

                const openedSpaceEvent = testSubject.execute(command);

                const expected = new OpenedSpaceEvent(spaceId, nameMadeOfOneCharacter);
                expect(openedSpaceEvent).to.be.deep.equal(expected)
            });

            test('when other user opened a space with the same name -> it stores the space in the repository', () => {
                const command = new OpenSpaceCommand(nameMadeOfOneCharacter, userId);

                testSubject.execute(command);

                const expected = new Space(spaceId, userId, nameMadeOfOneCharacter);
                expect(repository.findBy(spaceId)).to.be.deep.equal(expected);
            });
        });

        suite('given 50 character and same user id', () => {
            test('it returns an event', () => {
                const command = new OpenSpaceCommand(nameMadeOf50Characters, userId);

                const openedSpaceEvent = testSubject.execute(command);

                const expected = new OpenedSpaceEvent(spaceId, nameMadeOf50Characters);
                expect(openedSpaceEvent).to.be.deep.equal(expected);
            });

            test('it stores the space in the repository', () => {
                const previous = new OpenSpaceCommand(nameMadeOf50Characters, otherUserId);
                testSubject.execute(previous);
                const command = new OpenSpaceCommand(nameMadeOf50Characters, userId);

                const openedSpaceEvent = testSubject.execute(command);

                const expected = new OpenedSpaceEvent(spaceId, nameMadeOf50Characters);
                expect(openedSpaceEvent).to.be.deep.equal(expected)
            });

            test('when other user opened a space with the same name -> it stores the space in the repository', () => () => {
                const command = new OpenSpaceCommand(nameMadeOf50Characters, userId);

                testSubject.execute(command);

                const expected = new Space(spaceId, userId, nameMadeOf50Characters);
                expect(repository.findBy(spaceId)).to.be.deep.equal(expected);
            });
        });
    });
});