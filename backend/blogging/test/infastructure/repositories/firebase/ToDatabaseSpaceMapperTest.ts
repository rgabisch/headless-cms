import {assert} from "chai";
import ToDatabaseSpaceMapper from "../../../../src/infastructure/repositories/firebase/ToDatabaseSpaceMapper";
import Space from "../../../../src/domain/entities/Space";
import ToDatabaseContentMapper from "../../../../src/infastructure/repositories/firebase/ToDatabaseContentMapper";
import Content from "../../../../src/domain/entities/Content";
import Schema, {TypeDefinition, TypeMappings} from "../../../../src/domain/entities/Schema";
import ToDatabaseSchemaMapper from "../../../../src/infastructure/repositories/firebase/ToDatabaseSchemaMapper";


suite('Space Mapper', () => {

    const schemaMapper = new ToDatabaseSchemaMapper();
    const contentMapper = new ToDatabaseContentMapper(schemaMapper);
    const spaceMapper = new ToDatabaseSpaceMapper(contentMapper);

    suite('map', () => {

        test('given space without content -> return mapped', () => {
            const space = new Space('1', 'My Podcasts');

            const mapped = spaceMapper.map(space);

            assert.deepStrictEqual(
                mapped,
                {
                    id: space.id,
                    name: space.name,
                    contents: []
                }
            );
        });

        test('given space with content -> return mapped', () => {
            const space = new Space('1', 'My Podcasts');
            const schema = new Schema('1', 'Podcast', new TypeDefinition([]));
            const content = new Content('1', 'my first podcsat', schema, new Date(), new Date(), new TypeMappings([]));
            space.add(content);

            const mapped = spaceMapper.map(space);

            assert.deepStrictEqual(
                mapped,
                {
                    id: space.id,
                    name: space.name,
                    contents: [contentMapper.map(content)]
                }
            );
        });

    });

});