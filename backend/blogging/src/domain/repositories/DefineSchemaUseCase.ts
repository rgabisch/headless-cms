import Creator from "../entities/Creator";

export interface CreatorRepository {
    getBy(id: string): Promise<Creator | undefined>;
}