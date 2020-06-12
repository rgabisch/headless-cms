import {TypeRepository} from "../../domain/repositories/TypeRepository";
import TypeFactory from "../../domain/factories/TypeFactory";
import Type from "../../domain/entities/Type";

class InMemoryTypeRepository implements TypeRepository {

    private typeFactory = new TypeFactory();

    async findBy(id: string): Promise<Type | undefined> {
        return this.typeFactory.createBy(id);
    }

    async findAllBy(ids: string[]): Promise<(Type | undefined)[]> {
        const founds = [];

        for (let id of ids) {
            founds.push(await this.findBy(id))
        }

        return founds;
    }

    async add(type: Type) {
        // is not supported
    }
}

export default InMemoryTypeRepository;