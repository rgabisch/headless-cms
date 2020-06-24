import {SignUpCommand} from "../../../../blogging/src/domain/commands/SignUpCommand";
import {SignUpEvent} from "../../../../blogging/src/domain/events/SignUpEvent";
import UserRepository from "../UserRepository";
import CreateCreatorUseCase from "../../../../blogging/src/domain/usecases/CreateCreatorUseCase";
import CreateCreatorCommand from "../../../../blogging/src/domain/commands/CreateCreatorCommand";

class SignUpUseCase {

    constructor(private userRepository: UserRepository,
                private createCreatorUseCase: CreateCreatorUseCase) {
    }

    async execute(signUpCommand: SignUpCommand) {
        const user = await this.userRepository.signUp(signUpCommand.email, signUpCommand.pass);
        const createCreatorCommand = new CreateCreatorCommand(user.user.uid);
        await this.createCreatorUseCase.execute(createCreatorCommand);
        return new SignUpEvent(user.user.xa)
    }

}

export default SignUpUseCase;