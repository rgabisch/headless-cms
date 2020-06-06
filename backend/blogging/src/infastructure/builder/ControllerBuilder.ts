import {CreatorRepository} from "../../domain/repositories/CreatorRepository";
import IdGenerator from "../../shared/IdGenerator";
import TypeFactory from "../../domain/factories/TypeFactory";
import DateGenerator from "../../shared/DateGenerator";

abstract class ControllerBuilder<T> {
    protected creatorRepository!: CreatorRepository;
    protected idGenerator!: IdGenerator;
    protected typeFactory!: TypeFactory;
    protected dateGenerator!: DateGenerator;

    withIdGenerator(idGenerator: IdGenerator): ControllerBuilder<T> {
        this.idGenerator = idGenerator;
        return this;
    }

    withCreatorRepository(creatorRepository: CreatorRepository): ControllerBuilder<T> {
        this.creatorRepository = creatorRepository;
        return this;
    }

    withTypeFactory(typeFactory: TypeFactory): ControllerBuilder<T> {
        this.typeFactory = typeFactory;
        return this;
    }

    public withDateGenerator(dateGenerator: DateGenerator): ControllerBuilder<T> {
        this.dateGenerator = dateGenerator;
        return this;
    }

    abstract build(): T;
}

export default ControllerBuilder;