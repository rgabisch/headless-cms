import Space from "../entities/Space";
import Criteria from "./criterias/Criteria";

interface SpaceRepository {
    save(space: Space): void;

    findBy(id: string): Promise<Space | undefined>;

    query(query: Criteria<any>): Promise<Space[]>;
}

export default SpaceRepository;