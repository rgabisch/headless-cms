import SpaceController from "./SpaceController";
import SchemaController from "./SchemaController";
import ContentController from "./ContentController";
import IdGenerator from "../../shared/IdGenerator";
import {CreatorRepository} from "../../domain/repositories/CreatorRepository";
import TypeFactory from "../../domain/factories/TypeFactory";
import SpaceControllerBuilder from "../builder/SpaceControllerBuilder";
import SchemaControllerBuilder from "../builder/SchemaControllerBuilder";
import ContentControllerBuilder from "../builder/ContentControllerBuilder";
import CreatorController from "./CreatorController";
import CreatorControllerBuilder from "../builder/CreatorControllerBuilder";
import DateGenerator from "../../shared/DateGenerator";
import {TranscribeStrategy} from "../../../../transcribing/src/TranscribeAudioStrategy";

class ControllerFactory {
    private readonly spaceController: SpaceController;
    private readonly schemaController: SchemaController;
    private readonly contentController: ContentController;
    private readonly creatorController: CreatorController;

    constructor(private idGenerator: IdGenerator,
                private creatorRepository: CreatorRepository,
                private dateGenerator: DateGenerator,
                private typeFactory: TypeFactory,
                private transcribeStrategy: TranscribeStrategy) {
        this.spaceController = new SpaceControllerBuilder().withIdGenerator(idGenerator)
                                                           .withCreatorRepository(creatorRepository)
                                                           .withTypeFactory(typeFactory)
                                                           .build();

        this.schemaController = new SchemaControllerBuilder().withIdGenerator(idGenerator)
                                                             .withCreatorRepository(creatorRepository)
                                                             .withTypeFactory(typeFactory)
                                                             .build();

        this.contentController = new ContentControllerBuilder().withTranscribeStrategy(transcribeStrategy)
                                                               .withIdGenerator(idGenerator)
                                                               .withCreatorRepository(creatorRepository)
                                                               .withTypeFactory(typeFactory)
                                                               .withDateGenerator(dateGenerator)
                                                               .build();

        this.creatorController = new CreatorControllerBuilder().withIdGenerator(idGenerator)
                                                               .withCreatorRepository(creatorRepository)
                                                               .withTypeFactory(typeFactory)
                                                               .build();
    }

    buildForSpace(): SpaceController {
        return this.spaceController;
    }

    buildForSchema(): SchemaController {
        return this.schemaController;
    }

    buildForContent(): ContentController {
        return this.contentController;
    }

    buildForCreator(): CreatorController {
        return this.creatorController;
    }
}

export default ControllerFactory;