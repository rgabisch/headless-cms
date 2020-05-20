import {assert} from 'chai';

import DefineSchemaUseCase from "../../../src/domain/usecases/DefineSchemaUseCase";
import {DefineSchemaCommand} from "../../../src/domain/commands/DefineSchemaUseCase";
import InMemoryCreatorRepository from "../../../src/infastructure/repositories/InMemoryCreatorRepository";
import {UnassignedIdException} from "../../../src/domain/exceptions/DefineSchemaUseCase";
import Creator from "../../../src/domain/entities/Creator";
import MoreThan50CharactersException from "../../../src/domain/exceptions/MoreThan50CharactersException";
import EmptyValueException from "../../../src/domain/exceptions/EmptyValueException";

let testSubject: DefineSchemaUseCase;

const creatorId = '1';
const unassignedCreatorId = 'junit';
const schemaName = 'podcast';
const toLongSchemaName = 'a'.repeat(51);
const nameMadeOfWhitespace = '          ';
const emptyName = '';
const types = [{id: '1', name: 'guest description'}];


suite('Define Schema Use Case', () => {

    setup(async () => {
        const repository = new InMemoryCreatorRepository();

        await repository.add(new Creator(creatorId, []));

        testSubject = new DefineSchemaUseCase(repository);
    });

    suite('when execute', () => {

        test('given empty name -> throw exception for empty name.', async () => {
            let exception;
            const command = new DefineSchemaCommand(creatorId, emptyName, types);

            try {
                await testSubject.execute(command);
            } catch (e) {
                exception = e.name;
            } finally {
                assert.equal(exception, EmptyValueException.name);
            }
        });

        test('given name made of whitespaces -> throw exception for empty name.', async () => {
            let exception;
            const command = new DefineSchemaCommand(creatorId, nameMadeOfWhitespace, types);

            try {
                await testSubject.execute(command);
            } catch (e) {
                exception = e.name;
            } finally {
                assert.equal(exception, EmptyValueException.name);
            }
        });

        test('given name with more than 50 characters -> throw exception for to long name.', async () => {
            let exception;
            const command = new DefineSchemaCommand(creatorId, toLongSchemaName, types);

            try {
                await testSubject.execute(command);
            } catch (e) {
                exception = e.name;
            } finally {
                assert.equal(exception, MoreThan50CharactersException.name);
            }
        });

        test('given unassigned creator id -> throw exception for a empty unassigned id.', async () => {
            let exception;
            const command = new DefineSchemaCommand(unassignedCreatorId, schemaName, types);

            try {
                await testSubject.execute(command);
            } catch (e) {
                exception = e.name;
            } finally {
                assert.equal(exception, UnassignedIdException.name);
            }
        });

    })
})
;