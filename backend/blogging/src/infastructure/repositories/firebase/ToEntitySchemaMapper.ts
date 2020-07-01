import {Mapper} from "./ToDatabaseCreatorMapper";
import TypeFactory from "../../../domain/factories/TypeFactory";
import Schema, {TypeDefinition} from "../../../domain/entities/Schema";
import {MappedSchema} from "./ToDatabaseSchemaMapper";

class ToEntitySchemaMapper implements Mapper<MappedSchema, Schema> {
    constructor(private typeFactory: TypeFactory) {
    }

    map(mappedSchema: MappedSchema): Schema {
        const typeDefinitions = [];
        for (let typeDefinition of mappedSchema.typeDefinitions ?? []) {
            typeDefinitions.push({
                    type: this.typeFactory.createBy(typeDefinition.type),
                    name: typeDefinition.name
                }
            );
        }
        return new Schema(mappedSchema.id, mappedSchema.name, new TypeDefinition(typeDefinitions));
    }
}

export default ToEntitySchemaMapper;