import {assert} from 'chai';

import DefineSchemaUseCase from "../../../src/domain/usecases/DefineSchemaUseCase";
import {DefineSchemaCommand} from "../../../src/domain/commands/DefineSchemaUseCase";
import InMemoryCreatorRepository from "../../../src/infastructure/repositories/InMemoryCreatorRepository";
import {UnassignedIdException} from "../../../src/domain/exceptions/DefineSchemaUseCase";
import Creator from "../../../src/domain/entities/Creator";
import MoreThan50CharactersException from "../../../src/domain/exceptions/MoreThan50CharactersException";
import EmptyValueException from "../../../src/domain/exceptions/EmptyValueException";
import InMemoryTypeRepository from "../../../src/infastructure/repositories/InMemoryTypeRepository";
import Type from "../../../src/domain/entities/Type";
import {DefinedSchemaEvent} from "../../../src/domain/events/DefineSchemaUseCase";
import StaticIdGenerator from "../../../src/shared/StaticIdGenerator";

let testSubject: DefineSchemaUseCase;

const creatorId = '1';
const unassignedCreatorId = 'junit';

const schemaName = 'podcast';
const toLongSchemaName = 'a'.repeat(51);
const nameMadeOfWhitespace = '          ';
const emptyName = '';

const unassignedTypeId = 'junit';
const typeName = 'guest description';
const otherTypeName = 'guest description';
const typeId = '1';

const schemaId = '1';

const types = [{id: '1', name: 'guest description'}];


suite('Define Schema Use Case', () => {

    setup(async () => {
        const creatorRepository = new InMemoryCreatorRepository();
        await creatorRepository.add(new Creator(creatorId, []));

        const schemaRepository = new InMemoryTypeRepository();
        await schemaRepository.add(new class extends Type {
        }(typeId));

        testSubject = new DefineSchemaUseCase(new StaticIdGenerator(schemaId), creatorRepository, schemaRepository);
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

        test('given unassigned creator id -> throw exception for a unassigned id.', async () => {
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

        test('given one type with an unassigned id -> throw exception for a unassigned id.', async () => {
            let exception;
            const types = [{name: typeName, id: unassignedTypeId}];
            const command = new DefineSchemaCommand(creatorId, schemaName, types);

            try {
                await testSubject.execute(command);
            } catch (e) {
                exception = e.name;
            } finally {
                assert.equal(exception, UnassignedIdException.name);
            }
        });

        test('given two types and one of it has an unassigned id -> throw exception for a unassigned id.', async () => {
            let exception;
            const types = [{name: typeName, id: typeId}, {name: otherTypeName, id: unassignedTypeId}];
            const command = new DefineSchemaCommand(creatorId, schemaName, types);

            try {
                await testSubject.execute(command);
            } catch (e) {
                exception = e.name;
            } finally {
                assert.equal(exception, UnassignedIdException.name);
            }
        });

        test('given creator id, name, and types -> return defined schema event', async () => {
            const command = new DefineSchemaCommand(creatorId, schemaName, types);

            const event = await testSubject.execute(command);

            const expected = new DefinedSchemaEvent(schemaId, creatorId, types);
            assert.equal(event, expected);
        });

    })
})
;