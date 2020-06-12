import {TypeRepository} from "../../domain/repositories/TypeRepository";
import Type from "../../domain/entities/Type";
import DefaultType from "../../domain/entities/types/DefaultType";

class InMemoryTypeRepository implements TypeRepository {
    private types = new Map()
        .set('1', new DefaultType('1'))
        .set('2', new DefaultType('2'))
        .set('3', new DefaultType('3'))
        .set('4', new DefaultType('4'))
        .set('5', new DefaultType('5'))
        .set('6', new DefaultType('6'))
        .set('7', new DefaultType('7'))
        .set('8', new DefaultType('8'));

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