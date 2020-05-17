import {v1 as id} from 'uuid';

import IdGenerator from "./IdGenerator";

class GlobalUniqueIdGenerator implements IdGenerator {

    generate(): string {
        return id();
    }

}

export default GlobalUniqueIdGenerator;