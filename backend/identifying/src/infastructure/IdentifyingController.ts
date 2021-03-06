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

        router.post('/api/signin', async (req, res) => {
            const command = new SignInCommand(req.body.email, req.body.password);

            try {
                const signInEvent = await this.signInUseCase.execute(command);
                res.send(signInEvent)
            } catch (e) {
                console.log(e)
                res.status(400).send('post body is invalid')
            }
        });

        router.post('/api/signup', async (req, res) => {
            const command = new SignUpCommand(req.body.email, req.body.password);
            try {
                const signUpEvent = await this.signUpUseCase.execute(command);
                res.send(signUpEvent)
            } catch (e) {
                console.log(e)
                res.status(400).send('post body is invalid')
            }
        });

        return router;
    }

}

export default IdentifyingController;