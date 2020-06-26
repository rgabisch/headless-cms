import Schema from "../../../domain/entities/Schema";
import {Mapper} from "./ToDatabaseCreatorMapper";

export type MappedSchema = {
    id: string,
    name: string,
    typeDefinitions: {
        type: string,
        name: string
    }[]
}


class ToDatabaseSchemaMapper implements Mapper<Schema, MappedSchema> {

    map(schema: Schema): MappedSchema {
        return {
            id: schema.id,
            name: schema.name,
            typeDefinitions: this.mapTypeDefinitions(schema)
        };
    }

    private mapTypeDefinitions(schema: Schema): { type: string, name: string }[] {
        const mapped = [];

        for (let typeDefinition of schema.typeDefinition) {
            mapped.push({
                type: typeDefinition.type.id,
                name: typeDefinition.name,
            });
        }

        return mapped;
    }

}

export default ToDatabaseSchemaMapper;