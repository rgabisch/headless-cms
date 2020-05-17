import SpaceRepository from "../../../src/domain/repositories/SpaceRepository";
import Space from "../../../src/domain/entities/Space";

class InMemorySpaceRepository implements SpaceRepository {
    private spaces: Map<string, Space> = new Map<string, Space>();

    save(space: Space): void {
        this.spaces.set(space.id, space);
    }

    findBy(id: string): Space | undefined {
        return this.spaces.get(id);
    }

}

export default InMemorySpaceRepository;