import {CreatorRepository} from "../../domain/repositories/CreatorRepository";
import IdGenerator from "../../shared/IdGenerator";
import TypeFactory from "../../domain/factories/TypeFactory";

abstract class ControllerBuilder<T> {
    protected creatorRepository!: CreatorRepository;
    protected idGenerator!: IdGenerator;
    protected typeFactory!: TypeFactory;

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

    abstract build(): T;
}

export default ControllerBuilder;