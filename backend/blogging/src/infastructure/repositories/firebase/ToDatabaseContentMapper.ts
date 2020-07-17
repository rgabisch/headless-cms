import {Mapper} from "./ToDatabaseCreatorMapper";
import Content from "../../../domain/entities/Content";
import admin from "firebase-admin";
import ToDatabaseSchemaMapper, {MappedSchema} from "./ToDatabaseSchemaMapper";
import Timestamp = admin.firestore.Timestamp;

export type MappedContent = {
    id: string,
    name: string,
    creationDate: {
        nanoseconds: number,
        seconds: number
    },
    editDate: {
        nanoseconds: number,
        seconds: number
    },
    schema: MappedSchema,
    typeMappings: {
        id: string,
        name: string,
        content: string,
        contentURL?: string
    }[]
}

class ToDatabaseContentMapper implements Mapper<Content, MappedContent> {

    constructor(private schemaMapper: ToDatabaseSchemaMapper) {
    }

    map(content: Content): MappedContent {
        const creationTimestamp = Timestamp.fromDate(content.creationDate);
        const editTimestamp = Timestamp.fromDate(content.editDate);

        return {
            id: content.id,
            name: content.name,
            creationDate: {
                nanoseconds: creationTimestamp.nanoseconds,
                seconds: creationTimestamp.seconds
            },
            editDate: {
                nanoseconds: editTimestamp.nanoseconds,
                seconds: editTimestamp.seconds
            },
            schema: this.schemaMapper.map(content.schema),
            typeMappings: this.mapTypeMapping(content)
        };
    }

    private mapTypeMapping(content: Content): { id: string, name: string, content: string, contentURL?: string }[] {
        const mapped = [];

        for (let typeMapping of content.typeMappings) {
            mapped.push({
                id: typeMapping.type.id,
                name: typeMapping.name,
                content: typeMapping.content,
                contentURL: typeMapping.contentURL || ""
            });
        }

        return mapped;
    }


}

export default ToDatabaseContentMapper;