import {SignUpCommand} from "../../../../blogging/src/domain/commands/SignUpCommand";
import {signUp} from '../../infastructure/auth'
import {SignUpEvent} from "../../../../blogging/src/domain/events/SignUpEvent";
import UserRepository from "../UserRepository";
import CreateCreatorUseCase from "../../../../blogging/src/domain/usecases/CreateCreatorUseCase";
import CreateCreatorCommand from "../../../../blogging/src/domain/commands/CreateCreatorCommand";
import FireBaseUserRepository from "../../infastructure/FireBaseUserRepository"

class SignUpUseCase {

    constructor(private userRepository: FireBaseUserRepository,
                private createCreatorUseCase: CreateCreatorUseCase) {
    }

    async execute(signUpCommand: SignUpCommand) {
        const user = await this.userRepository.signUp(signUpCommand.email, signUpCommand.pass);

        if (!user)
            console.log('Somethign went wrong, look up the firebase log');

        const createCreatorCommand = new CreateCreatorCommand(user.user.uid);
        await this.createCreatorUseCase.execute(createCreatorCommand);

        return new SignUpEvent(user.user.xa)
    }

}

export default SignUpUseCase;