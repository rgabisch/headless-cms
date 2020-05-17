import {expect} from 'chai';
import OpenSpaceUseCase from "../../../src/domain/usecases/OpenSpaceUseCase";
import FakedSpaceRepository from "../../fakes/reposetories/FakedSpaceRepository";
import OpenSpaceCommand from "../../../src/domain/commands/OpenSpaceCommand";
import EmptySpaceNameException from "../../../src/domain/exceptions/EmptySpaceNameException";
import OpenedSpaceEvent from "../../../src/domain/events/OpenedSpaceEvent";
import IDGenerator from "../../../src/shared/IDGenerator";
import MoreThan50CharactersSpaceNameException
    from "../../../src/domain/exceptions/MoreThan50CharactersSpaceNameException";
import SpaceRepository from "../../../src/domain/repositories/SpaceRepository";

const emptyName = '';
const nameWithOnlyWhitespace = '        ';
const nameMadeOfOneCharacter = 'a';
const nameMadeOf50Characters = 'a'.repeat(50);
const nameMadeOf51Characters = 'a'.repeat(51);

let testSubject: OpenSpaceUseCase;

let idGenerator: IDGenerator = new class implements IDGenerator {
    generate(): string {
        return '1';
    }
};

let repository: FakedSpaceRepository;

beforeEach(() => {
    repository = new FakedSpaceRepository();
    testSubject = new OpenSpaceUseCase(repository, idGenerator);
});

describe('Open Space', () => {

    describe('when execute', () => {
        it('with empty name it fails', () => {
            const command = new OpenSpaceCommand(emptyName);

            try {
                testSubject.execute(command)
            } catch (e) {
                expect(e.name).to.be.equal('EmptySpaceNameException');
            }
        });

        it('with only whitespaces as name it fails', () => {
            const command = new OpenSpaceCommand(nameWithOnlyWhitespace);

            try {
                testSubject.execute(command)
            } catch (e) {
                expect(e.name).to.be.equal('EmptySpaceNameException');
            }
        });

        it('with more than 50 characters as name it fails', () => {
            const command = new OpenSpaceCommand(nameMadeOf51Characters);

            try {
                testSubject.execute(command)
            } catch (e) {
                expect(e.name).to.be.equal('MoreThan50CharactersSpaceNameException');
            }
        });

        it('with one character as name it opens a space', () => {
            const command = new OpenSpaceCommand(nameMadeOfOneCharacter);

            const openedSpaceEvent = testSubject.execute(command);

            const expected = new OpenedSpaceEvent(idGenerator.generate(), nameMadeOfOneCharacter);
            expect(openedSpaceEvent).to.be.deep.equal(expected)
        });

        it('with 50 characters as name it opens a space', () => {
            const command = new OpenSpaceCommand(nameMadeOf50Characters);

            const openedSpaceEvent = testSubject.execute(command);

            const expected = new OpenedSpaceEvent(idGenerator.generate(), nameMadeOf50Characters);
            expect(openedSpaceEvent).to.be.deep.equal(expected);
        });

        it('with one character as name it stores space in repository', () => {
            const command = new OpenSpaceCommand(nameMadeOfOneCharacter);

            const openedSpaceEvent = testSubject.execute(command);

            expect(repository.spaces).to.be.deep.equal([openedSpaceEvent])
        });

        it('with 50 characters as name it stores space in repository', () => {
            const command = new OpenSpaceCommand(nameMadeOf50Characters);

            const openedSpaceEvent = testSubject.execute(command);

            expect(repository.spaces).to.be.deep.equal([openedSpaceEvent])
        });

    });

});