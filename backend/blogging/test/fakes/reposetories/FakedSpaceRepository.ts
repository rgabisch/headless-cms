import SpaceRepository from "../../../src/domain/repositories/SpaceRepository";
import Space from "../../../src/domain/entities/Space";

class FakedSpaceRepository implements SpaceRepository {
    public spaces: Space[] = [];

    save(space: Space): void {
        this.spaces.push(space);
    }

}

export default FakedSpaceRepository;