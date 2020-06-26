import {MappedCreator, Mapper} from "./ToDatabaseCreatorMapper";
import Creator from "../../../domain/entities/Creator";
import TypeFactory from "../../../domain/factories/TypeFactory";
import ToEntitySchemaMapper from "./ToEntitySchemaMapper";
import ToEntitySpaceMapper from "./ToEntitySpaceMapper";

class ToEntityCreatorMapper implements Mapper<MappedCreator, Creator> {
    constructor(private schemaMapper: ToEntitySchemaMapper,
                private spaceMapper: ToEntitySpaceMapper) {
    }

    map(mappedCreator: MappedCreator): Creator {
        const typeFactory = new TypeFactory();
        const creator = new Creator(mappedCreator.id, new Map(), new Map());

        for (let mappedSchema of mappedCreator.schemas ?? []) {
            const schema = this.schemaMapper.map(mappedSchema);
            creator.define(schema);
        }

        for (let mappedSpace of mappedCreator.spaces ?? []) {
            const space = this.spaceMapper.map(mappedSpace);
            creator.open(space);
        }

        return creator;
    }

// {
//         const typeFactory = new TypeFactory();
//         const creator = new Creator(mappedCreator.id, new Map(), new Map());
//         for (let mappedSchema of mappedCreator.schemas ?? []) {
//
//             const typeDefinitions = [];
//             for (let typeDefinition of mappedSchema.typeDefinitions ?? []) {
//                 typeDefinitions.push({
//                         type: typeFactory.createBy(typeDefinition.type),
//                         name: typeDefinition.name
//                     }
//                 );
//             }
//             const schema = new Schema(mappedSchema.id, mappedSchema.name, new TypeDefinition(typeDefinitions));
//             creator.define(schema);
//         }
//
//         for (let mappedSpace of mappedCreator.spaces ?? []) {
//             const space = new Space(mappedSpace.id, mappedSpace.name);
//             creator.open(space);
//             for (let mappedContent of mappedSpace.contents ?? []) {
//                 const schema = creator.getSchemaBy(mappedContent.schema.id);
//                 const date = new Date(new Date(0).setUTCSeconds(mappedContent.creationDate.seconds));
//                 const typeMappings = [];
//                 for (let typeMapping of mappedContent.typeMappings ?? []) {
//                     typeMappings.push({
//                         type: typeFactory.createBy(typeMapping.id),
//                         name: typeMapping.name,
//                         content: typeMapping.content
//                     });
//                 }
//                 const typeMapping = new TypeMappings(typeMappings);
//
//                 const content = new Content(mappedContent.id, mappedContent.name, schema, date, typeMapping);
//                 creator.write(content, space);
//             }
//         }
//         return creator;
//     }
}

export default ToEntityCreatorMapper;