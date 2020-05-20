import Criteria from "./Criteria";

class FindByNameCriteria implements Criteria<{ name: string, userId: string }> {

    constructor(private object: { name: string, userId: string }) {
    }

    matches(other: { name: string, userId: string }): boolean {
        const isEqualName = this.object.name === other.name;
        const isEqualUserId = this.object.userId === other.userId;

        return isEqualName && isEqualUserId;
    }

}

export default FindByNameCriteria;