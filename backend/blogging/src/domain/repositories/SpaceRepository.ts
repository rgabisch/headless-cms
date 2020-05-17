import Space from "../entities/Space";

interface SpaceRepository {
    save(space: Space): void;

    findBy(id: string): Space | undefined;
}

export default SpaceRepository;