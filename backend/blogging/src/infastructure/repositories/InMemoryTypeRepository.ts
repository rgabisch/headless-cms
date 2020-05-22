import {TypeRepository} from "../../domain/repositories/TypeRepository";
import Type from "../../domain/entities/Type";

class InMemoryTypeRepository implements TypeRepository {
    private types = new Map<string, Type>();

    async findBy(id: string): Promise<Type | undefined> {
        return this.types.get(id);
    }

    async findAllBy(ids: string[]): Promise<(Type | undefined)[]> {
        const founds = [];

        for (let id of ids) {
            founds.push(await this.findBy(id))
        }

        return founds;
    }

    async add(type: Type) {
        this.types.set(type.id, type);
    }
}

export default InMemoryTypeRepository;