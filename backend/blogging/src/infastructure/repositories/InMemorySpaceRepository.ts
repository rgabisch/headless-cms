import SpaceRepository from "../../domain/repositories/SpaceRepository";
import Space from "../../domain/entities/Space";

class InMemorySpaceRepository implements SpaceRepository {
    spaces: Space[] = [];

    save(space: Space): void {
        this.spaces.push(space);
    }

}

export default InMemorySpaceRepository;