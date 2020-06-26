import {assert} from "chai";
import ToDatabaseContentMapper from "../../../../src/infastructure/repositories/firebase/ToDatabaseContentMapper";
import Content from "../../../../src/domain/entities/Content";
import Schema, {TypeDefinition, TypeMappings} from "../../../../src/domain/entities/Schema";
import * as admin from "firebase-admin";
import Type, {TypeId} from "../../../../src/domain/entities/Type";
import Timestamp = admin.firestore.Timestamp;
import ToDatabaseSchemaMapper from "../../../../src/infastructure/repositories/firebase/ToDatabaseSchemaMapper";


suite('Content Mapper', () => {

    const schemaMapper = new ToDatabaseSchemaMapper();
    const contentMapper = new ToDatabaseContentMapper(schemaMapper);

    suite('map', () => {

        test('given content without content -> return mapped', () => {
            const date = new Date();
            date.setUTCMilliseconds(10000);
            date.setUTCSeconds(10000);
            const schema = new Schema('1', 'podcast', new TypeDefinition([]));
            const content = new Content(
                '1',
                'my first javascript podcast',
                schema,
                date,
                new TypeMappings([])
            );

            const mapped = contentMapper.map(content);

            assert.deepStrictEqual(
                mapped,
                {
                    id: content.id,
                    name: content.name,
                    creationDate: {
                        seconds: Timestamp.fromDate(content.creationDate).seconds,
                        nanoseconds: Timestamp.fromDate(content.creationDate).nanoseconds
                    },
                    schema: schemaMapper.map(schema),
                    typeMappings: []
                }
            );
        });

        test('given content with content -> return mapped', () => {
            const schema = new Schema('1', 'podcast', new TypeDefinition([
                {type: new Type(TypeId.Text), name: 'heading'}
            ]));

            const content = new Content(
                '1',
                'my first javascript podcast',
                schema,
                new Date(),
                new TypeMappings([
                    {type: new Type(TypeId.Text), name: 'heading', content: 'my first javascript podcast'}
                ])
            );

            const mapped = contentMapper.map(content);

            assert.deepStrictEqual(
                mapped,
                {
                    id: content.id,
                    name: content.name,
                    creationDate: {
                        seconds: Timestamp.fromDate(content.creationDate).seconds,
                        nanoseconds: Timestamp.fromDate(content.creationDate).nanoseconds
                    },
                    schema: schemaMapper.map(schema),
                    typeMappings: [
                        {
                            id: TypeId.Text,
                            name: 'heading',
                            content: 'my first javascript podcast'
                        }
                    ]
                }
            );
        });

    });

});