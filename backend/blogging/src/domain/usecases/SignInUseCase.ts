import { SignInCommand } from "../commands/SignInCommand";
import {signIn} from '../../../../identifying/auth'
import { SignInEvent } from "../events/SignInEvent";

class SignInUseCase{

    async execute(signInCommand:SignInCommand) {
        const user = await signIn(signInCommand.email, signInCommand.pass)
        if (!user)
            console.log('Somethign went wrong, look up the firebase log')

        return new SignInEvent(user.user.uid)
    }   

}

export default SignInUseCase;