import Type from "../entities/Type";
import DefaultType from "../entities/types/DefaultType";

class TypeFactory {
    createBy(id: string): Type {
        return new DefaultType(id);
    }
}

export default TypeFactory;