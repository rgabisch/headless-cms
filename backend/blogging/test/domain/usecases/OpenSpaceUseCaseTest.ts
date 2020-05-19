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

beforeEach(() => {
    repository = new InMemorySpaceRepository();
    testSubject = new OpenSpaceUseCase(repository, new StaticIdGenerator(spaceId));
});

describe('Open Space', () => {

    describe('when execute', () => {
        it('with empty name it fails', () => {
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

        it('with only whitespaces as name it fails', () => {
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

        it('with more than 50 characters as name it fails', () => {
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

        it('with same name as a previous space it fails for the same user id', () => {
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

        it('with an empty user id; it fails', () => {
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

        it('with only whitespaces as user id; it fails', () => {
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

        describe('with one character as name and a user id', () => {
            it('it opens a space', () => {
                const command = new OpenSpaceCommand(nameMadeOfOneCharacter, userId);

                const openedSpaceEvent = testSubject.execute(command);

                const expected = new OpenedSpaceEvent(spaceId, nameMadeOfOneCharacter);
                expect(openedSpaceEvent).to.be.deep.equal(expected)
            });

            it('it opens a space when other space of an other user has same name', () => {
                const previous = new OpenSpaceCommand(nameMadeOfOneCharacter, otherUserId);
                testSubject.execute(previous);
                const command = new OpenSpaceCommand(nameMadeOfOneCharacter, userId);

                const openedSpaceEvent = testSubject.execute(command);

                const expected = new OpenedSpaceEvent(spaceId, nameMadeOfOneCharacter);
                expect(openedSpaceEvent).to.be.deep.equal(expected)
            });

            it('it stores space in repositories', () => {
                const command = new OpenSpaceCommand(nameMadeOfOneCharacter, userId);

                testSubject.execute(command);

                const expected = new Space(spaceId, userId, nameMadeOfOneCharacter);
                expect(repository.findBy(spaceId)).to.be.deep.equal(expected);
            });
        });

        describe('with 50 characters as name and a user id', () => {
            it('it opens a space', () => {
                const command = new OpenSpaceCommand(nameMadeOf50Characters, userId);

                const openedSpaceEvent = testSubject.execute(command);

                const expected = new OpenedSpaceEvent(spaceId, nameMadeOf50Characters);
                expect(openedSpaceEvent).to.be.deep.equal(expected);
            });

            it('it opens a space when other space of an other user has same name', () => {
                const previous = new OpenSpaceCommand(nameMadeOf50Characters, otherUserId);
                testSubject.execute(previous);
                const command = new OpenSpaceCommand(nameMadeOf50Characters, userId);

                const openedSpaceEvent = testSubject.execute(command);

                const expected = new OpenedSpaceEvent(spaceId, nameMadeOf50Characters);
                expect(openedSpaceEvent).to.be.deep.equal(expected)
            });

            it('it stores space in repositories', () => {
                const command = new OpenSpaceCommand(nameMadeOf50Characters, userId);

                testSubject.execute(command);

                const expected = new Space(spaceId, userId, nameMadeOf50Characters);
                expect(repository.findBy(spaceId)).to.be.deep.equal(expected);
            });
        });

    });

});