import {assert} from "chai";
import ToEntitySchemaMapper from "../../../../src/infastructure/repositories/firebase/ToEntitySchemaMapper";
import {MappedSchema} from "../../../../src/infastructure/repositories/firebase/ToDatabaseSchemaMapper";
import Schema, {TypeDefinition, TypeMappings} from "../../../../src/domain/entities/Schema";
import TypeFactory from "../../../../src/domain/factories/TypeFactory";
import ToEntitySpaceMapper from "../../../../src/infastructure/repositories/firebase/ToEntitySpaceMapper";
import {MappedSpace} from "../../../../src/infastructure/repositories/firebase/ToDatabaseSpaceMapper";
import Space from "../../../../src/domain/entities/Space";
import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;
import Content from "../../../../src/domain/entities/Content";
import {CreateDialogNodeConstants} from "watson-developer-cloud/assistant/v1";

suite('To Space Entity Mapper', () => {

    const typeFactory = new TypeFactory();
    const schemaMapper = new ToEntitySchemaMapper(typeFactory);
    const schemaEntityMapper = new ToEntitySchemaMapper(typeFactory);
    const mapper = new ToEntitySpaceMapper(schemaMapper, typeFactory);

    test('given no content -> space has no content', () => {
        const mappedSpace: MappedSpace = {
            id: '1',
            name: 'podcast',
            contents: []
        };


        const space = mapper.map(mappedSpace);

        assert.deepStrictEqual(
            space,
            new Space(mappedSpace.id, mappedSpace.name)
        )
    });

    test('given one content without types -> space has content', () => {
        const date = new Date();
        date.setUTCMilliseconds(0);
        const mappedSpace: MappedSpace = {
            id: '1',
            name: 'Java & Script Podcast',
            contents: [
                {
                    id: '1',
                    name: 'my first podcast',
                    creationDate: Timestamp.fromDate(date),
                    schema: {
                        id: '1',
                        name: 'Podcast',
                        typeDefinitions: []
                    },
                    typeMappings: []
                }
            ]
        };

        const space = mapper.map(mappedSpace);

        const expected = new Space(mappedSpace.id, mappedSpace.name);
        expected.add(new Content(
            mappedSpace.contents[0].id,
            mappedSpace.contents[0].name,
            schemaEntityMapper.map(mappedSpace.contents[0].schema),
            date,
            new TypeMappings([])
        ));

        assert.deepStrictEqual(
            space,
            expected
        );
    });

    test('given one content with types -> space has content', () => {
        const date = new Date();
        date.setUTCMilliseconds(0);
        const mappedSpace: MappedSpace = {
            id: '1',
            name: 'Java & Script Podcast',
            contents: [
                {
                    id: '1',
                    name: 'my first podcast',
                    creationDate: Timestamp.fromDate(date),
                    schema: {
                        id: '1',
                        name: 'Podcast',
                        typeDefinitions: [
                            {
                                type: '1',
                                name: 'heading'
                            }
                        ]
                    },
                    typeMappings: [
                        {
                            id: '1',
                            name: 'heading',
                            content: ''
                        }
                    ]
                }
            ]
        };

        const space = mapper.map(mappedSpace);

        const expected = new Space(mappedSpace.id, mappedSpace.name);
        expected.add(new Content(
            mappedSpace.contents[0].id,
            mappedSpace.contents[0].name,
            schemaEntityMapper.map(mappedSpace.contents[0].schema),
            date,
            new TypeMappings([
                {
                    type: typeFactory.createBy(mappedSpace.contents[0].typeMappings[0].id),
                    name: mappedSpace.contents[0].typeMappings[0].name,
                    content: mappedSpace.contents[0].typeMappings[0].content
                }
            ])
        ));

        assert.deepStrictEqual(
            space,
            expected
        );
    });

    // test('given multiple typeDefinition -> schema has typeDefinitions', () => {
    //     const mappedSchema: MappedSchema = {
    //         id: '1',
    //         name: 'podcast',
    //         typeDefinitions: [
    //             {
    //                 type: '1',
    //                 name: 'Heading'
    //             },
    //             {
    //                 type: '1',
    //                 name: 'Second Heading'
    //             }
    //         ]
    //     };
    //
    //
    //     const schema = mapper.map(mappedSchema);
    //
    //     assert.deepStrictEqual(
    //         schema,
    //         new Schema(
    //             mappedSchema.id,
    //             mappedSchema.name,
    //             new TypeDefinition([
    //                 {
    //                     type: typeFactory.createBy(mappedSchema.typeDefinitions[0].type),
    //                     name: mappedSchema.typeDefinitions[0].name
    //                 },
    //                 {
    //                     type: typeFactory.createBy(mappedSchema.typeDefinitions[1].type),
    //                     name: mappedSchema.typeDefinitions[1].name
    //                 }
    //             ])
    //         )
    //     )
    // });

});