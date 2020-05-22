import Type from "../entities/Type";

export interface TypeRepository {
    findBy(id: string): Promise<Type | undefined>

    findAllBy(ids: string[]): Promise<(Type | undefined)[]>

    add(type: Type): void
}