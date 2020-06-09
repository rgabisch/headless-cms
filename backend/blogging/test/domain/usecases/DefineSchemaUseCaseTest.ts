import {assert} from 'chai';

import DefineSchemaUseCase from "../../../src/domain/usecases/DefineSchemaUseCase";
import {DefineSchemaCommand} from "../../../src/domain/commands/DefineSchemaCommand";
import InMemoryCreatorRepository from "../../../src/infastructure/repositories/InMemoryCreatorRepository";
import {UnassignedIdException} from "../../../src/domain/exceptions/UnassignedIdException";
import Creator from "../../../src/domain/entities/Creator";
import MoreThan50CharactersException from "../../../src/domain/exceptions/MoreThan50CharactersException";
import EmptyValueException from "../../../src/domain/exceptions/EmptyValueException";
import InMemoryTypeRepository from "../../../src/infastructure/repositories/InMemoryTypeRepository";
import Type, {TypeId} from "../../../src/domain/entities/Type";
import {DefinedSchemaEvent} from "../../../src/domain/events/DefineSchemaEvent";
import StaticIdGenerator from "../../../src/shared/StaticIdGenerator";
import Schema, {TypeDefinition} from "../../../src/domain/entities/Schema";
import TypeFactory from "../../../src/domain/factories/TypeFactory";

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

let creatorRepository: InMemoryCreatorRepository;

suite('Define Schema Use Case', () => {

    setup(async () => {
        creatorRepository = new InMemoryCreatorRepository();
        await creatorRepository.add(new Creator(creatorId, new Map(), new Map()));

        const typeRepository = new InMemoryTypeRepository();
        await typeRepository.add(new Type(TypeId.Text));

        testSubject = new DefineSchemaUseCase(new StaticIdGenerator(schemaId), creatorRepository, typeRepository, new TypeFactory());
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
            assert.deepEqual(event, expected);
        });

        test('given creator id, name, and types -> saves schema in repository', async () => {
            const command = new DefineSchemaCommand(creatorId, schemaName, types);

            await testSubject.execute(command);

            const creator = await creatorRepository.findBy(schemaId);
            const expected = new Creator(
                creatorId,
                new Map<string, Schema>().set(schemaId, new Schema(schemaId, schemaName, new TypeDefinition([{
                    type: new Type(TypeId.Text),
                    name: 'guest description'
                }]))),
                new Map()
            );
            assert.deepEqual(creator, expected);
        });

    });
});