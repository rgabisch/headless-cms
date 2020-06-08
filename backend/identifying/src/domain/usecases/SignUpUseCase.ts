import {SignUpCommand} from "../../../../blogging/src/domain/commands/SignUpCommand";
import {signUp} from '../../infastructure/auth'
import {SignUpEvent} from "../../../../blogging/src/domain/events/SignUpEvent";
import UserRepository from "../UserRepository";

class SignUpUseCase {

    constructor(private userRepository: UserRepository) {
    }

    async execute(signInCommand: SignUpCommand) {
        const user = await this.userRepository.signUp(signInCommand.email, signInCommand.pass)

        if (!user)
            console.log('Somethign went wrong, look up the firebase log');

        return new SignUpEvent(user.user.uid)
    }

}

export default SignUpUseCase;