import Criteria from "./Criteria";

class FindByNameCriteria implements Criteria<{ name: string }> {

    constructor(private object: { name: string }) {
    }

    matches(other: { name: string }): boolean {
        return this.object.name === other.name;
    }

}

export default FindByNameCriteria;