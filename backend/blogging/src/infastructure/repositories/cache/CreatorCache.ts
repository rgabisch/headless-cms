import Creator from "../../../domain/entities/Creator";

class CreatorCache {

    private idByCreator = new Map<string, Creator>();

    getBy(id: string): Creator {
        const creator = this.idByCreator.get(id);

        if (!creator)
            throw new Error(`creator with the id ${id} is not defined`);

        return creator;
    }

    add(creator: Creator): void {
        this.idByCreator.set(creator.id, creator);
    }

    contains(id: string): boolean {
        return this.idByCreator.has(id);
    }
}

export default CreatorCache;