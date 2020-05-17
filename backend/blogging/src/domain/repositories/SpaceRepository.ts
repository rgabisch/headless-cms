import Space from "../entities/Space";
import Criteria from "./criterias/Criteria";

interface SpaceRepository {
    save(space: Space): void;

    findBy(id: string): Space | undefined;

    query(query: Criteria<any>): Space[];
}

export default SpaceRepository;