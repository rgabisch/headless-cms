import SpaceController from "./RepositoryController";
import SchemaController from "./SchemaController";
import ContentController from "./ContentController";
import IdGenerator from "../../shared/IdGenerator";
import {CreatorRepository} from "../../domain/repositories/CreatorRepository";
import TypeFactory from "../../domain/factories/TypeFactory";
import SpaceControllerBuilder from "../builder/SpaceControllerBuilder";
import SchemaControllerBuilder from "../builder/SchemaControllerBuilder";
import ContentControllerBuilder from "../builder/ContentControllerBuilder";

class ControllerFactory {
    private readonly space: SpaceController;
    private readonly schema: SchemaController;
    private readonly content: ContentController;

    constructor(private idGenerator: IdGenerator,
                private creatorRepository: CreatorRepository,
                private typeFactory: TypeFactory) {
        this.space = new SpaceControllerBuilder().withIdGenerator(idGenerator)
                                                 .withCreatorRepository(creatorRepository)
                                                 .withTypeFactory(typeFactory)
                                                 .build();

        this.schema = new SchemaControllerBuilder().withIdGenerator(idGenerator)
                                                   .withCreatorRepository(creatorRepository)
                                                   .withTypeFactory(typeFactory)
                                                   .build();

        this.content = new ContentControllerBuilder().withIdGenerator(idGenerator)
                                                     .withCreatorRepository(creatorRepository)
                                                     .withTypeFactory(typeFactory)
                                                     .build();
    }

    buildForSpace(): SpaceController {
        return this.space;
    }

    buildForSchema(): SchemaController {
        return this.schema;
    }

    buildForContent(): ContentController {
        return this.content;
    }
}

export default ControllerFactory;