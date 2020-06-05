import ControllerBuilder from "./ControllerBuilder";
import SchemaController from "../controller/SchemaController";
import ViewSchemaUseCase from "../../domain/usecases/ViewSchemaUseCase";
import DefineSchemaUseCase from "../../domain/usecases/DefineSchemaUseCase";
import InMemoryTypeRepository from "../repositories/InMemoryTypeRepository";
import ListAllSchemasUseCase from "../../domain/usecases/ListAllSchemasUseCase";

class SchemaControllerBuilder extends ControllerBuilder<SchemaController> {

    build(): SchemaController {
        const viewSchemaUseCase = new ViewSchemaUseCase(this.creatorRepository);
        const defineSchemaUseCase = new DefineSchemaUseCase(this.idGenerator, this.creatorRepository, new InMemoryTypeRepository(), this.typeFactory);
        const listAllSchemasUseCase = new ListAllSchemasUseCase(this.creatorRepository);
        return new SchemaController(defineSchemaUseCase, viewSchemaUseCase, listAllSchemasUseCase);
    }

}

export default SchemaControllerBuilder;