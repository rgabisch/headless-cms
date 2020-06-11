import SignInUseCase from "../domain/usecases/SignInUseCase";
import SignUpUseCase from "../domain/usecases/SignUpUseCase";
import express from "express";
import {SignInCommand} from "../../../blogging/src/domain/commands/SignInCommand";
import {SignUpCommand} from "../../../blogging/src/domain/commands/SignUpCommand";

class IdentifyingController {
    constructor(private signInUseCase: SignInUseCase,
                private signUpUseCase: SignUpUseCase) {
    }

    routes(): express.Router {
        const router = express.Router();

        router.post('/signin', async (req, res) => {
            const command = new SignInCommand(req.body.email, req.body.pass);

            try {
                const signInEvent = await this.signInUseCase.execute(command);
                res.send(signInEvent)
            } catch (e) {
                res.status(400).send('post body is invalid')
            }
        });

        router.post('/signup', async (req, res) => {
            const command = new SignUpCommand(req.body.email, req.body.pass);
            console.log(command)
            try {
                const signUpEvent = await this.signUpUseCase.execute(command);
                res.send(signUpEvent)
            } catch (e) {
                res.status(400).send('post body is invalid')
            }
        });

        return router;
    }

}

export default IdentifyingController;