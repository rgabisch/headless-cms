import {assert} from "chai";
import ToEntitySchemaMapper from "../../../../src/infastructure/repositories/firebase/ToEntitySchemaMapper";
import {MappedSchema} from "../../../../src/infastructure/repositories/firebase/ToDatabaseSchemaMapper";
import Schema, {TypeDefinition} from "../../../../src/domain/entities/Schema";
import TypeFactory from "../../../../src/domain/factories/TypeFactory";

suite('To Schema Entity Mapper', () => {

    const typeFactory = new TypeFactory();
    const mapper = new ToEntitySchemaMapper(typeFactory);

    test('given no typeDefinitions -> schema has no typeDefinitions', () => {
        const mappedSchema: MappedSchema = {
            id: '1',
            name: 'podcast',
            typeDefinitions: []
        };


        const schema = mapper.map(mappedSchema);

        assert.deepStrictEqual(
            schema,
            new Schema(mappedSchema.id, mappedSchema.name, new TypeDefinition([]))
        )
    });

    test('given one typeDefinition -> schema has typeDefinition', () => {
        const mappedSchema: MappedSchema = {
            id: '1',
            name: 'podcast',
            typeDefinitions: [
                {
                    type: '1',
                    name: 'Heading'
                }
            ]
        };


        const schema = mapper.map(mappedSchema);

        assert.deepStrictEqual(
            schema,
            new Schema(
                mappedSchema.id,
                mappedSchema.name,
                new TypeDefinition([
                    {
                        type: typeFactory.createBy(mappedSchema.typeDefinitions[0].type),
                        name: mappedSchema.typeDefinitions[0].name
                    }
                ])
            )
        )
    });
    test('given multiple typeDefinition -> schema has typeDefinitions', () => {
        const mappedSchema: MappedSchema = {
            id: '1',
            name: 'podcast',
            typeDefinitions: [
                {
                    type: '1',
                    name: 'Heading'
                },
                {
                    type: '1',
                    name: 'Second Heading'
                }
            ]
        };


        const schema = mapper.map(mappedSchema);

        assert.deepStrictEqual(
            schema,
            new Schema(
                mappedSchema.id,
                mappedSchema.name,
                new TypeDefinition([
                    {
                        type: typeFactory.createBy(mappedSchema.typeDefinitions[0].type),
                        name: mappedSchema.typeDefinitions[0].name
                    },
                    {
                        type: typeFactory.createBy(mappedSchema.typeDefinitions[1].type),
                        name: mappedSchema.typeDefinitions[1].name
                    }
                ])
            )
        )
    });

});