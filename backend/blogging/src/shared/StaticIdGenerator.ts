import IdGenerator from "./IdGenerator";

class StaticIdGenerator implements IdGenerator {
    constructor(private id: string) {
    }

    generate(): string {
        return '1';
    }
}

export default StaticIdGenerator