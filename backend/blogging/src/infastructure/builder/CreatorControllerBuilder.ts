import ControllerBuilder from "./ControllerBuilder";
import CreatorController from "../controller/CreatorController";
import CreateCreatorUseCase from "../../domain/usecases/CreateCreatorUseCase";

class CreatorControllerBuilder extends ControllerBuilder<CreatorController> {

    build(): CreatorController {
        const writeContentUseCase = new CreateCreatorUseCase(this.creatorRepository);
        return new CreatorController(writeContentUseCase);
    }

}

export default CreatorControllerBuilder;