import {expect} from 'chai';
import OpenSpaceUseCase from "../../../src/domain/usecases/OpenSpaceUseCase";
import OpenSpaceCommand from "../../../src/domain/commands/OpenSpaceCommand";
import EmptySpaceNameException from "../../../src/domain/exceptions/EmptySpaceNameException";
import OpenedSpaceEvent from "../../../src/domain/events/OpenedSpaceEvent";
import MoreThan50CharactersSpaceNameException
    from "../../../src/domain/exceptions/MoreThan50CharactersSpaceNameException";
import InMemorySpaceRepository from "../../../src/infastructure/repositories/InMemorySpaceRepository";
import StaticIdGenerator from "../../../src/shared/StaticIdGenerator";

const id = '1';
const emptyName = '';
const nameWithOnlyWhitespace = '        ';
const nameMadeOfOneCharacter = 'a';
const nameMadeOf50Characters = 'a'.repeat(50);
const nameMadeOf51Characters = 'a'.repeat(51);
const name = nameMadeOfOneCharacter;

let testSubject: OpenSpaceUseCase;
let repository: InMemorySpaceRepository;

beforeEach(() => {
    repository = new InMemorySpaceRepository();
    testSubject = new OpenSpaceUseCase(repository, new StaticIdGenerator(id));
});

describe('Open Space', () => {

    describe('when execute', () => {
        it('with empty name it fails', () => {
            let exception;
            const command = new OpenSpaceCommand(emptyName);

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
            const command = new OpenSpaceCommand(nameWithOnlyWhitespace);

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
            const command = new OpenSpaceCommand(nameMadeOf51Characters);

            try {
                testSubject.execute(command)
            } catch (e) {
                exception = e;
            } finally {
                expect(exception.name).to.be.equal('MoreThan50CharactersSpaceNameException');
            }
        });

        it('with same name as a previous space it fails', () => {
            let exception;
            const previous = new OpenSpaceCommand(name);
            const command = new OpenSpaceCommand(name);
            testSubject.execute(previous);

            try {
                testSubject.execute(command);
            } catch (e) {
                exception = e;
            } finally {
                expect(exception.name).to.be.equal('NotUniqueSpaceNameException');
            }
        });

        describe('with one character as name', () => {
            it('it opens a space', () => {
                const command = new OpenSpaceCommand(nameMadeOfOneCharacter);

                const openedSpaceEvent = testSubject.execute(command);

                const expected = new OpenedSpaceEvent(id, nameMadeOfOneCharacter);
                expect(openedSpaceEvent).to.be.deep.equal(expected)
            });

            it('it stores space in repository', () => {
                const command = new OpenSpaceCommand(nameMadeOfOneCharacter);

                const openedSpaceEvent = testSubject.execute(command);

                expect(repository.findBy(id)).to.be.deep.equal(openedSpaceEvent);
            });
        });

        describe('with 50 characters as name', () => {
            it('it opens a space', () => {
                const command = new OpenSpaceCommand(nameMadeOf50Characters);

                const openedSpaceEvent = testSubject.execute(command);

                const expected = new OpenedSpaceEvent(id, nameMadeOf50Characters);
                expect(openedSpaceEvent).to.be.deep.equal(expected);
            });

            it('it stores space in repository', () => {
                const command = new OpenSpaceCommand(nameMadeOf50Characters);

                const openedSpaceEvent = testSubject.execute(command);

                expect(repository.findBy(id)).to.be.deep.equal(openedSpaceEvent);
            });
        });

    });

});