import { SignUpCommand } from "../commands/SignUpCommand";
import {signUp} from '../../../../identifying/auth'
import { SignUpEvent } from "../events/SignUpEvent";

class SignUpUseCase{

    async execute(signInCommand:SignUpCommand) {
        const user = await signUp(signInCommand.email, signInCommand.pass)
        if (!user)
            console.log('Somethign went wrong, look up the firebase log')

        return new SignUpEvent(user.user.uid)
    }   

}

export default SignUpUseCase;