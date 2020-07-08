import {assert} from 'chai';

import RemoveContentUseCase from "../../../src/domain/usecases/RemoveContentUseCase";
import Creator from "../../../src/domain/entities/Creator";
import Space from "../../../src/domain/entities/Space";
import Content from "../../../src/domain/entities/Content";
import Schema, {TypeDefinition, TypeMappings} from "../../../src/domain/entities/Schema";
import InMemoryCreatorRepository from "../../../src/infastructure/repositories/InMemoryCreatorRepository";
import {CreatorRepository} from "../../../src/domain/repositories/CreatorRepository";

suite('Delete Content Use Case', () => {

    let creator: Creator;
    let space: Space;
    let content: Content;
    let repository: CreatorRepository;
    const schema = new Schema('1', 'Podcast', new TypeDefinition([]));
    let useCase: RemoveContentUseCase;

    setup(async () => {
        creator = new Creator('1', new Map(), new Map());
        space = new Space('1', 'My Podcasts');
        content = new Content('1', 'first podcast', schema, new Date(), new TypeMappings([]));
        repository = new InMemoryCreatorRepository();
        useCase = new RemoveContentUseCase(repository);

        creator.define(schema);
        creator.open(space);
        creator.write(content, space);
        await repository.add(creator);
    });


    test('given valid input -> returns event', async () => {
        const command = {
            creatorId: creator.id,
            spaceId: space.id,
            contentId: content.id
        };

        const event = await useCase.execute(command);

        assert.deepStrictEqual(
            event,
            {
                creatorId: creator.id,
                spaceId: space.id,
                contentId: content.id
            }
        );
    });

    test('given valid input -> repository does not contains content anymore', async () => {
        const command = {
            creatorId: creator.id,
            spaceId: space.id,
            contentId: content.id
        };

        await useCase.execute(command);

        assert.isUndefined((<Creator>await repository.findBy(creator.id)).getContent(content.id, space.id));
    });

    test('given unassigned creator id -> throws exception', async () => {
        const command = {
            creatorId: 'unit-test',
            spaceId: space.id,
            contentId: content.id
        };

        let exception = undefined;
        try {
            await useCase.execute(command);
        } catch (e) {
            exception = e;
        } finally {
            assert.isDefined(exception);
        }
    });

    test('given unassigned space id -> throws exception', async () => {
        const command = {
            creatorId: creator.id,
            spaceId: 'unit-test',
            contentId: content.id
        };

        let exception = undefined;
        try {
            await useCase.execute(command);
        } catch (e) {
            exception = e;
        } finally {
            assert.isDefined(exception);
        }
    });

    test('given unassigned content id -> throws exception', async () => {
        const command = {
            creatorId: creator.id,
            spaceId: space.id,
            contentId: 'unit-test'
        };

        let exception = undefined;
        try {
            await useCase.execute(command);
        } catch (e) {
            exception = e;
        } finally {
            assert.isDefined(exception);
        }
    });
});