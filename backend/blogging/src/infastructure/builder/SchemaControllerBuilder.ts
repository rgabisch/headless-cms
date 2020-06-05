import ControllerBuilder from "./ControllerBuilder";
import SchemaController from "../controller/SchemaController";
import ViewSchemaUseCase from "../../domain/usecases/ViewSchemaUseCase";
import DefineSchemaUseCase from "../../domain/usecases/DefineSchemaUseCase";
import InMemoryTypeRepository from "../repositories/InMemoryTypeRepository";

class SchemaControllerBuilder extends ControllerBuilder<SchemaController> {

    build(): SchemaController {
        const viewSchemaUseCase = new ViewSchemaUseCase(this.creatorRepository);
        const defineSchemaUseCase = new DefineSchemaUseCase(this.idGenerator, this.creatorRepository, new InMemoryTypeRepository(), this.typeFactory);
        return new SchemaController(defineSchemaUseCase, viewSchemaUseCase);
    }

}

export default SchemaControllerBuilder;