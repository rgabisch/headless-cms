import {SignInCommand} from "../../../../blogging/src/domain/commands/SignInCommand";
import {signIn} from '../../infastructure/auth'
import {SignInEvent} from "../../../../blogging/src/domain/events/SignInEvent";
import UserRepository from "../UserRepository";
import FireBaseUserRepository from "../../infastructure/FireBaseUserRepository"

class SignInUseCase {

    constructor(private userRepository: UserRepository) {
    }

    async execute(signInCommand: SignInCommand) {
        console.log(signInCommand);
        const user = await this.userRepository.signIn(signInCommand.email, signInCommand.pass)

        if (!user)
            console.log('Somethign went wrong, look up the firebase log')

        return new SignInEvent(user.user.xa)
    }

}

export default SignInUseCase;