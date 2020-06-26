import {assert} from "chai";
import Schema, {TypeDefinition} from "../../../../src/domain/entities/Schema";
import ToDatabaseSchemaMapper from "../../../../src/infastructure/repositories/firebase/ToDatabaseSchemaMapper";
import Type, {TypeId} from "../../../../src/domain/entities/Type";


suite('Schema Mapper', () => {

    const schemaMapper = new ToDatabaseSchemaMapper();

    suite('map', () => {

        test('given schema without type definition -> return mapped', () => {
            const schema = new Schema('1', 'Podcast', new TypeDefinition([]));

            const mapped = schemaMapper.map(schema);

            assert.deepStrictEqual(
                mapped,
                {
                    id: schema.id,
                    name: schema.name,
                    typeDefinitions: []
                }
            );
        });

        test('given schema with one type definition -> return mapped', () => {
            const type = {type: new Type(TypeId.Text), name: 'Heading'};
            const schema = new Schema('1', 'Podcast', new TypeDefinition([type]));

            const mapped = schemaMapper.map(schema);

            assert.deepStrictEqual(
                mapped,
                {
                    id: schema.id,
                    name: schema.name,
                    typeDefinitions: [
                        {
                            type: type.type.id,
                            name: type.name
                        }
                    ]
                }
            );
        });

        test('given schema with multiple type definitions -> return mapped', () => {
            const type = {type: new Type(TypeId.Text), name: 'Heading'};
            const otherType = {type: new Type(TypeId.Text), name: 'Heading'};
            const schema = new Schema('1', 'Podcast', new TypeDefinition([type, otherType]));

            const mapped = schemaMapper.map(schema);

            assert.deepStrictEqual(
                mapped,
                {
                    id: schema.id,
                    name: schema.name,
                    typeDefinitions: [
                        {
                            type: type.type.id,
                            name: type.name
                        },
                        {
                            type: otherType.type.id,
                            name: otherType.name
                        }
                    ]
                }
            );
        });
    });
});