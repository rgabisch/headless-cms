import ControllerBuilder from "./ControllerBuilder";
import CreatorController from "../controller/CreatorController";
import CreateCreatorUseCase from "../../domain/usecases/CreateCreatorUseCase";
import SignInUseCase from "../../domain/usecases/SignInUseCase";
import SignUpUseCase from "../../domain/usecases/SignUpUseCase";

class CreatorControllerBuilder extends ControllerBuilder<CreatorController> {

    build(): CreatorController {
        const writeContentUseCase = new CreateCreatorUseCase(this.creatorRepository);
        const signInUseCase = new SignInUseCase();
        const signUpUseCase = new SignUpUseCase();
        return new CreatorController(writeContentUseCase, signInUseCase,signUpUseCase);
    }

}

export default CreatorControllerBuilder;