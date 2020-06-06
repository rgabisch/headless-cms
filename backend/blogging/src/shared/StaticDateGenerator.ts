import DateGenerator from "./DateGenerator";

class StaticDateGenerator implements DateGenerator {
    constructor(private date: Date) {
    }

    generate(): Date {
        return this.date;
    }
}

export default StaticDateGenerator;