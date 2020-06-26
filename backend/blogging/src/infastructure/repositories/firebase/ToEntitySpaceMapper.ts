import {Mapper} from "./ToDatabaseCreatorMapper";
import TypeFactory from "../../../domain/factories/TypeFactory";
import Space from "../../../domain/entities/Space";
import {MappedSpace} from "./ToDatabaseSpaceMapper";
import Content from "../../../domain/entities/Content";
import {TypeMappings} from "../../../domain/entities/Schema";
import ToEntitySchemaMapper from "./ToEntitySchemaMapper";

class ToEntitySpaceMapper implements Mapper<MappedSpace, Space> {
    constructor(private schemaMapper: ToEntitySchemaMapper,
                private typeFactory: TypeFactory) {
    }

    map(mappedSpace: MappedSpace): Space {
        const space = new Space(mappedSpace.id, mappedSpace.name);
        for (let mappedContent of mappedSpace.contents ?? []) {
            const schema = this.schemaMapper.map(mappedContent.schema);
            let date = new Date(new Date(0).setUTCSeconds(mappedContent.creationDate.seconds));
            const typeMappings = [];
            for (let typeMapping of mappedContent.typeMappings ?? []) {
                typeMappings.push({
                    type: this.typeFactory.createBy(typeMapping.id),
                    name: typeMapping.name,
                    content: typeMapping.content
                });
            }
            const typeMapping = new TypeMappings(typeMappings);

            const content = new Content(mappedContent.id, mappedContent.name, schema, date, typeMapping);
            space.add(content);
        }
        return space;
    }
}

export default ToEntitySpaceMapper;