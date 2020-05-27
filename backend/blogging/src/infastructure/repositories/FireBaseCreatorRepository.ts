import {CreatorRepository} from "../../domain/repositories/CreatorRepository";
import Creator from "../../domain/entities/Creator";
import FireBase from './firebase/firebase'

class FireBaseCreatorRepository extends FireBase implements CreatorRepository {

    constructor(){
        super('Creator')
    }

    async findBy(id: string): Promise<Creator | undefined> {
        return super.db_get(id)
    }

    async add(creator: Creator) {
        return super.db_add(creator.id, creator)
    }

    update(creator: Creator): void {
        super.db_update(creator.id, creator)
    }
}

export default FireBaseCreatorRepository;