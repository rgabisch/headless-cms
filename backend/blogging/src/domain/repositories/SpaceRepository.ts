import Space from "../entities/Space";

interface SpaceRepository {
    save(space: Space): void;
}

export default SpaceRepository;