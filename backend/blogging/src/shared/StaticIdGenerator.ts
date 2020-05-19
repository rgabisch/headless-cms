import IdGenerator from "./IdGenerator";

class StaticIdGenerator implements IdGenerator {
    constructor(private id: string) {
    }

    generate(): string {
        return this.id;
    }
}

export default StaticIdGenerator