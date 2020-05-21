import Creator from "../entities/Creator";

export interface CreatorRepository {
    findBy(id: string): Promise<Creator | undefined>;
}

