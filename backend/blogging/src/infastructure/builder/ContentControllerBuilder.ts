import ControllerBuilder from "./ControllerBuilder";
import ContentController from "../controller/ContentController";
import WriteContentUseCase from "../../domain/usecases/WriteContentUseCase";
import ListAllContentsUseCase from "../../domain/usecases/ListAllContentsUseCase";
import ViewContentUseCase from "../../domain/usecases/ViewContentUseCase";

class ContentControllerBuilder extends ControllerBuilder<ContentController> {

    build(): ContentController {
        const writeContentUseCase = new WriteContentUseCase(this.creatorRepository, this.idGenerator, this.typeFactory);
        const listAllContentsUseCase = new ListAllContentsUseCase(this.creatorRepository);
        const viewContentUseCase = new ViewContentUseCase(this.creatorRepository);
        return new ContentController(writeContentUseCase, listAllContentsUseCase, viewContentUseCase);
    }

}

export default ContentControllerBuilder;