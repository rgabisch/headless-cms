import FireBase from "./firebase/firebase"
import SpaceRepository from "../../../src/domain/repositories/SpaceRepository";
import Space from "../../../src/domain/entities/Space";
import Criteria from "../../domain/repositories/criterias/Criteria";

class FireBaseSpaceRepository extends FireBase implements SpaceRepository{

    constructor(){
        super("Space")
    }

    save(space: Space): void {
        super.insert(space.id, space)
    }

    findBy(id: string): Promise<Space | undefined> {
        return super.read(id)
    }

    query(query: Criteria<any>): Promise<Space[]> {
        throw new Error("Method not implemented.");
    }

}

export default FireBaseSpaceRepository;