import {assert} from "chai";
import Creator from "../../../../src/domain/entities/Creator";
import Schema, {TypeDefinition, TypeMappings} from "../../../../src/domain/entities/Schema";
import Space from "../../../../src/domain/entities/Space";
import ToDatabaseCreatorMapper from "../../../../src/infastructure/repositories/firebase/ToDatabaseCreatorMapper";
import ToDatabaseSchemaMapper from "../../../../src/infastructure/repositories/firebase/ToDatabaseSchemaMapper";
import ToDatabaseSpaceMapper from "../../../../src/infastructure/repositories/firebase/ToDatabaseSpaceMapper";
import Type, {TypeId} from "../../../../src/domain/entities/Type";
import Content from "../../../../src/domain/entities/Content";
import ToDatabaseContentMapper from "../../../../src/infastructure/repositories/firebase/ToDatabaseContentMapper";


suite('Creator Mapper', () => {

    const schemaMapper = new ToDatabaseSchemaMapper();
    const contentMapper = new ToDatabaseContentMapper(schemaMapper);
    const spaceMapper = new ToDatabaseSpaceMapper(contentMapper);
    const creatorMapper = new ToDatabaseCreatorMapper(schemaMapper, spaceMapper);

    suite('map', () => {

        test('given empty creator -> return mapped', () => {
            const creator = new Creator('1', new Map(), new Map());

            const mapped = creatorMapper.map(creator);

            assert.deepStrictEqual(
                mapped,
                {id: creator.id, schemas: [], spaces: []}
            );
        });

        test('given creator with schema -> return mapped', () => {
            const schema = new Schema('1', 'podcast', new TypeDefinition([]));
            const creator = new Creator('1', new Map(), new Map());
            creator.define(schema);

            const mapped = creatorMapper.map(creator);

            assert.deepStrictEqual(
                mapped,
                {
                    id: creator.id,
                    schemas: [
                        schemaMapper.map(schema)
                    ],
                    spaces: []
                }
            );
        });

        test('given creator with multiple schemas -> return mapped', () => {
            const schema = new Schema('1', 'podcast', new TypeDefinition([]));
            const otherSchema = new Schema('2', 'author', new TypeDefinition([]));
            const creator = new Creator('1', new Map(), new Map());
            creator.define(schema);
            creator.define(otherSchema);

            const mapped = creatorMapper.map(creator);

            assert.deepStrictEqual(
                mapped,
                {
                    id: creator.id,
                    schemas: [
                        schemaMapper.map(schema),
                        schemaMapper.map(otherSchema)
                    ],
                    spaces: []
                }
            );
        });


        test('given creator with space -> return mapped', () => {
            const space = new Space('1', 'My Podcasts');
            const creator = new Creator('1', new Map(), new Map());
            creator.open(space);

            const mapped = creatorMapper.map(creator);

            assert.deepStrictEqual(
                mapped,
                {
                    id: creator.id,
                    schemas: [],
                    spaces: [
                        spaceMapper.map(space)
                    ]
                }
            );
        });

        test('given creator with multiple spaces -> return mapped', () => {
            const space = new Space('1', 'My Podcasts');
            const otherSpace = new Space('2', 'My Second Podcasts');
            const creator = new Creator('1', new Map(), new Map());
            creator.open(space);
            creator.open(otherSpace);

            const mapped = creatorMapper.map(creator);

            assert.deepStrictEqual(
                mapped,
                {
                    id: creator.id,
                    schemas: [],
                    spaces: [
                        spaceMapper.map(space),
                        spaceMapper.map(otherSpace)
                    ]
                }
            );
        });

        test('given creator with multiple spaces and schemas -> return mapped', () => {
            const space = new Space('1', 'My Podcasts');
            const otherSpace = new Space('2', 'My Second Podcasts');
            const schema = new Schema('1', 'Podcast', new TypeDefinition([{
                type: new Type(TypeId.Text),
                name: 'heading'
            }]));
            const otherSchema = new Schema('2', 'Author', new TypeDefinition([]));
            const creator = new Creator('1', new Map(), new Map());
            creator.open(space);
            creator.open(otherSpace);
            creator.define(schema);
            creator.define(otherSchema);
            creator.write(new Content('1', 'my first podcsat', schema, new Date(), new Date(), new TypeMappings([{
                type: new Type(TypeId.Text),
                name: 'heading',
                content: 'My first Podcast'
            }])), space);

            const mapped = creatorMapper.map(creator);

            assert.deepStrictEqual(
                mapped,
                {
                    id: creator.id,
                    schemas: [
                        schemaMapper.map(schema),
                        schemaMapper.map(otherSchema)
                    ],
                    spaces: [
                        spaceMapper.map(space),
                        spaceMapper.map(otherSpace)
                    ]
                }
            );
        });
    });
});