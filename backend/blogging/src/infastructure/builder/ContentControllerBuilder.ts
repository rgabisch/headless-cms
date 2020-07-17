import ControllerBuilder from "./ControllerBuilder";
import ContentController from "../controller/ContentController";
import WriteContentUseCase from "../../domain/usecases/WriteContentUseCase";
import ListAllContentsUseCase from "../../domain/usecases/ListAllContentsUseCase";
import ViewContentUseCase from "../../domain/usecases/ViewContentUseCase";
import ListAllContentsUsersUseCase from "../../domain/usecases/ListAllContentsUsersUseCase";
import TranscribeAudioUseCase from "../../../../transcribing/src/TranscribeAudioUseCase";
import {TranscribeStrategy} from "../../../../transcribing/src/TranscribeAudioStrategy";
import RemoveContentUseCase from "../../domain/usecases/RemoveContentUseCase";
import EditContentUseCase from "../../domain/usecases/EditContentUseCase";

class ContentControllerBuilder extends ControllerBuilder<ContentController> {

    private transcribeStrategy!: TranscribeStrategy;

    build(): ContentController {
        const writeContentUseCase = new WriteContentUseCase(
            this.creatorRepository,
            this.idGenerator,
            this.typeFactory,
            this.dateGenerator,
            new TranscribeAudioUseCase(this.transcribeStrategy)
        );
        const listAllContentsUseCase = new ListAllContentsUseCase(this.creatorRepository);
        const listAllContentUsersUseCase = new ListAllContentsUsersUseCase(this.creatorRepository);
        const viewContentUseCase = new ViewContentUseCase(this.creatorRepository);
        const removeContentUseCase = new RemoveContentUseCase(this.creatorRepository);
        const editContentUseCase = new EditContentUseCase(this.creatorRepository, new TranscribeAudioUseCase(this.transcribeStrategy), this.typeFactory, this.dateGenerator);
        return new ContentController(
            writeContentUseCase,
            listAllContentsUseCase,
            listAllContentUsersUseCase,
            viewContentUseCase,
            removeContentUseCase,
            editContentUseCase
        );
    }

    withTranscribeStrategy(transcribeStrategy: TranscribeStrategy): ContentControllerBuilder {
        this.transcribeStrategy = transcribeStrategy;
        return this;
    }

}

export default ContentControllerBuilder;