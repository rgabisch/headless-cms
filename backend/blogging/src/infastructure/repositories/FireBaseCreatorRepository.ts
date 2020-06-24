import {CreatorRepository} from "../../domain/repositories/CreatorRepository";
import Creator from "../../domain/entities/Creator";
import FireBase from './firebase/firebase'
import Schema, { TypeDefinition, TypeMappings } from "../../domain/entities/Schema";
import { format } from "path";
import Content from "../../domain/entities/Content";
import Space from "../../domain/entities/Space";
import Type from "../../domain/entities/Type";
import { type } from "os";

class FireBaseCreatorRepository extends FireBase implements CreatorRepository {

    constructor() {
        super('Creator')
    }

    async findBy(id: string): Promise<Creator | undefined> {
    
        if (Creator.inCache(id)){
            return Creator.get(id)
        }
        const fromStore = await super.db_get(id);
        if (fromStore){
            const creator = FireBaseCreatorRepository.dbtoObject(fromStore)
            //const creator = new Creator(fromStore.id, fromStore.schemas ?  new Map(Object.entries(fromStore.schemas)) :  new Map(), fromStore.spaces ? new Map(Object.entries(fromStore.spaces)) :  new Map());
            return creator 
        } else{
            return fromStore
        }
    }

    async add(creator: Creator) {
        const creator_data = {
            id : creator.id,
            spaces : creator.spaces,
            schemas : creator.schemas
        }
        return super.db_add(creator.id, creator_data)
    }

    update(creator: Creator): void {
        const creator_data : any = {
            id : creator.id,
            spaces : creator.spaces,
            schemas : creator.schemas
        }
        super.db_update(creator.id, creator_data)
    }

    private static dbtoObject(db: any) //: Creator
    {
        const spaces = db.spaces ? this.mapWithSpace(db.spaces) : new Map()
        const schemas = db.schemas ? this.mapWithSchema(db.schemas) : new Map()
        this.mapWithContent(schemas, spaces, db.spaces)
        const creator = this.mapWithCreator(db.id, schemas, spaces)
        return creator
    }

    private static mapWithCreator(id: string, schemas: Map<string, Schema>, spaces: Map<string, Space>) : Creator{
        return new Creator(id, schemas, spaces)
    }

    private static mapWithSchema(db: any) : Map<string, Schema>
    {
        const schemas = new Map()
        Object.entries(db).forEach(
            ([key, value] : [string, any]) => {
                const schema_id = value.id
                const schema_name = value.name
                const schema_definitions = []
                for (const index in value.typeDefinition.definitions){
                    const definition = value.typeDefinition.definitions[index]
                    schema_definitions.push({ type : new Type(definition.type.id), name : definition.name})
                }

                schemas.set(key, new Schema(schema_id, schema_name, new TypeDefinition(schema_definitions)))
            }
        );
        return schemas
    }

    private static mapWithContent(schemas : Map<string, Schema>, spaces : Map<string, Space>, db: any)
    {
        try{
            Object.entries(db).forEach(
                ([key, value] : [string, any]) => {
                    const space = spaces.get(key)
                    if (!space || !value.contents){
                        return
                    }
                    Object.entries(value.contents).forEach(
                        ([_, value_2] : [string, any]) => {
                            const content_id = value_2.id
                            const content_name = value_2.name
                            const content_schema = schemas.get(value_2.schema.id) 
                            const content_creationDate = new Date(new Date(0).setUTCSeconds(value_2.creationDate._seconds))
                            const typeMappings = []
                            for(const index in value_2.typeMappings.mappings){
                                const current = value_2.typeMappings.mappings[index]
                                typeMappings.push({type : new Type(current.type.id), name : current.name, content:current.content})
                            }
                            const content_typeMappings = new TypeMappings(typeMappings)
                            if (content_schema){
                                const content = new Content(content_id, content_name, content_schema, content_creationDate, content_typeMappings)
                                space.add(content)
                            }
                        })
                })
        } catch(e){
            console.log(e)
        }
       
    }

    private static mapWithSpace(db: any) : Map<string, Space>
    {
        const spaces = new Map()
        Object.entries(db).forEach(
            ([key, value] : [string, any]) => {
                const space_id = value.id
                const space_user = value.userId
                const space_name = value.name
                const space = new Space(space_id, space_user, space_name)
                spaces.set(key, space)
            }
        );
        return spaces
    }

}



export default FireBaseCreatorRepository;