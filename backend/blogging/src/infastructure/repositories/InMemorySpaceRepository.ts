import SpaceRepository from "../../../src/domain/repositories/SpaceRepository";
import Space from "../../../src/domain/entities/Space";
import Criteria from "../../domain/repositories/criterias/Criteria";

class InMemorySpaceRepository implements SpaceRepository {
    private spaces: Map<string, Space> = new Map<string, Space>();

    save(space: Space): void {
        this.spaces.set(space.id, space);
    }

    async findBy(id: string): Promise<Space | undefined> {
        return this.spaces.get(id);
    }

    async query(criteria: Criteria<any>): Promise<Space[]> {
        const filtered = [];

        for (let space of this.spaces.values()) {
            if (criteria.matches(space)) {
                filtered.push(space);
            }
        }

        return filtered;
    }

}

export default InMemorySpaceRepository;