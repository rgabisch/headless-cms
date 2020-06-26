import {assert} from "chai";
import ToEntityCreatorMapper from "../../../../src/infastructure/repositories/firebase/ToEntityCreatorMapper";
import {MappedCreator} from "../../../../src/infastructure/repositories/firebase/ToDatabaseCreatorMapper";
import ToEntitySchemaMapper from "../../../../src/infastructure/repositories/firebase/ToEntitySchemaMapper";
import ToEntitySpaceMapper from "../../../../src/infastructure/repositories/firebase/ToEntitySpaceMapper";
import TypeFactory from "../../../../src/domain/factories/TypeFactory";

suite('To Creator Entity Mapper', () => {

    const typeFactory = new TypeFactory();
    const schemaMapper = new ToEntitySchemaMapper(typeFactory);
    const spaceMapper = new ToEntitySpaceMapper(schemaMapper, typeFactory);
    const mapper = new ToEntityCreatorMapper(schemaMapper, spaceMapper);

    test('given no schema -> creator has no schemas', () => {
        const mappedCreator: MappedCreator = {
            id: '1',
            schemas: [],
            spaces: []
        };


        const creator = mapper.map(mappedCreator);

        assert.isEmpty(creator.getAllSchemas())
    });

    test('given no space -> creator has no spaces', () => {
        const mappedCreator: MappedCreator = {
            id: '1',
            schemas: [],
            spaces: []
        };


        const creator = mapper.map(mappedCreator);

        assert.isEmpty(creator.getAllSpaces())
    });

    // test('given no space -> creator has no spaces', () => {
    //     const mappedCreator: MappedCreator = {
    //         "id": "n8zYHozbE5Q62JlY0lutLfq69iH3",
    //         "schemas": [
    //             {
    //                 "id": "c7157950-b788-11ea-941c-67fa9a044617",
    //                 "name": "podcast",
    //                 typeDefinitions: []
    //             }
    //         ],
    //         "spaces": [
    //             {
    //                 "contents": [
    //                     {
    //                         "creationDate": {
    //                             "nanoseconds": 682000000,
    //                             "seconds": 1593160872
    //                         },
    //                         "id": "ca5e14a0-b788-11ea-941c-67fa9a044617",
    //                         "name": "my first podcast",
    //                         "schema": {
    //                             "id": "c7157950-b788-11ea-941c-67fa9a044617",
    //                             "name": "podcast",
    //                             typeDefinitions: []
    //                         },
    //                         "typeMappings": [
    //                             {
    //                                 "content": "Hi!",
    //                                 "id": "1",
    //                                 "name": "Heading"
    //                             },
    //                             {
    //                                 "content": ":)",
    //                                 "id": "5",
    //                                 "name": "Description"
    //                             }
    //                         ]
    //                     }
    //                 ],
    //                 "id": "bd79c1d0-b788-11ea-941c-67fa9a044617",
    //                 "name": "e & Script Podcast"
    //             }
    //         ]
    //     };
    //
    //
    //     const creator = mapper.map(mappedCreator);
    //
    //     assert.isEmpty(creator.getAllSpaces())
    // });

});