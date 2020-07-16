import {assert} from "chai";
import EditContentUseCase from "../../../src/domain/usecases/EditContentUseCase";
import InMemoryCreatorRepository from "../../../src/infastructure/repositories/InMemoryCreatorRepository";
import Creator from "../../../src/domain/entities/Creator";
import {CreatorRepository} from "../../../src/domain/repositories/CreatorRepository";
import Space from "../../../src/domain/entities/Space";
import Content from "../../../src/domain/entities/Content";
import Schema, {TypeDefinition, TypeMappings} from "../../../src/domain/entities/Schema";
import Type, {TypeId} from "../../../src/domain/entities/Type";
import TypeFactory from "../../../src/domain/factories/TypeFactory";
import TranscribeAudioUseCase from "../../../../transcribing/src/TranscribeAudioUseCase";
import {StaticTranscribeStrategy} from "../../../../transcribing/src/TranscribeAudioStrategy";
import EditContentCommand from "../../../src/domain/commands/EditContentCommand";

suite('Edit Content Use Case', () => {

    let repository: CreatorRepository;
    let creator: Creator;
    let space: Space;
    let content: Content;
    const typeDefinition = new TypeDefinition([{
        type: new Type(TypeId.Text),
        name: 'Heading'
    }]);
    const typeMapping = new TypeMappings([{
        type: new Type(TypeId.Text),
        name: 'Heading',
        content: 'My First Podcast'
    }]);
    const schema = new Schema('1', 'Podcast', typeDefinition);
    let useCase: EditContentUseCase;

    setup(() => {
        creator = new Creator('1', new Map(), new Map());
        space = new Space('1', 'Podcasts');
        content = new Content(
            '1',
            'My First Podcast',
            schema,
            new Date(),
            typeMapping
        );
        repository = new InMemoryCreatorRepository();
        useCase = new EditContentUseCase(repository, new TranscribeAudioUseCase(new StaticTranscribeStrategy('lala')), new TypeFactory());
    });

    test('given assigned ids -> edit content', async () => {
        creator.open(space);
        creator.define(schema);
        creator.write(content, space);
        repository.add(creator);
        const editedContent = 'My better Podcast';
        const command = new EditContentCommand(
            creator.id,
            content.id,
            space.id,
            [{
                typeId: '1',
                name: 'Heading',
                content: editedContent
            }],
            undefined
        );

        const event = await useCase.execute(command);

        assert.deepStrictEqual(
            event,
            {
                creatorId: creator.id,
                contentId: content.id,
                spaceId: space.id,
                content: [{
                    typeId: '1',
                    name: 'Heading',
                    content: editedContent
                }],
                creationDate: content.creationDate
            }
        );
    });

    test('given unassigned creator -> throws exception', async () => {
        const command = new EditContentCommand(
            creator.id,
            '1',
            '1',
            [{
                typeId: '1',
                name: 'Heading',
                content: 'My first Podcast'
            }],
            undefined
        );

        let exception;
        try {
            await useCase.execute(command);
        } catch (e) {
            exception = e;
        } finally {
            assert.isDefined(exception);
        }
    });

    test('given unassigned content -> throws exception', async () => {
        creator.open(space);
        repository.add(creator);
        const command = new EditContentCommand(
            '1',
            '1',
            '1',
            [{
                typeId: '1',
                name: 'Heading',
                content: 'My first Podcast'
            }],
            undefined
        );

        let exception;
        try {
            await useCase.execute(command);
        } catch (e) {
            exception = e;
        } finally {
            assert.isDefined(exception);
        }
    });

    test('given unassigned space -> throws exception', async () => {
        repository.add(creator);
        const command = new EditContentCommand(
            '1',
            '1',
            '1',
            [{
                typeId: '1',
                name: 'Heading',
                content: 'My first Podcast'
            }],
            undefined
        );

        let exception;
        try {
            await useCase.execute(command);
        } catch (e) {
            exception = e;
        } finally {
            assert.isDefined(exception);
        }
    });

});