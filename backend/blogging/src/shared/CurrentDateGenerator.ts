import DateGenerator from "./DateGenerator";

class CurrentDateGenerator implements DateGenerator {

    generate(): Date {
        return new Date();
    }

}

export default CurrentDateGenerator;