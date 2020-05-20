import {CreatorRepository} from "../../domain/repositories/DefineSchemaUseCase";
import Creator from "../../domain/entities/Creator";

class InMemoryCreatorRepository implements CreatorRepository {
    private creators = new Map<string, Creator>();

    async getBy(id: string): Promise<Creator | undefined> {
        return this.creators.get(id);
    }

    async add(creator: Creator) {
        this.creators.set(creator.id, creator);
    }
}

export default InMemoryCreatorRepository;