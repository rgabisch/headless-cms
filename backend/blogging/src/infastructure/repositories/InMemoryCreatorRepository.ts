import {CreatorRepository} from "../../domain/repositories/CreatorRepository";
import Creator from "../../domain/entities/Creator";

class InMemoryCreatorRepository implements CreatorRepository {
    private creators = new Map<string, Creator>();

    async findBy(id: string): Promise<Creator | undefined> {
        return this.creators.get(id);
    }

    async add(creator: Creator) {
        this.creators.set(creator.id, creator);
    }

    update(creator: Creator): void {
        this.creators.set(creator.id, creator);
    }
}

export default InMemoryCreatorRepository;