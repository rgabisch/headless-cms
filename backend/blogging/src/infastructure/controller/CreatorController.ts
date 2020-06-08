import express from 'express';
import CreateCreatorUseCase from "../../domain/usecases/CreateCreatorUseCase";
import CreateCreatorCommand from "../../domain/commands/CreateCreatorCommand";
import { SignInCommand } from '../../domain/commands/SignInCommand';
import SignInUseCase from '../../domain/usecases/SignInUseCase';
import { SignUpCommand } from '../../domain/commands/SignUpCommand';
import SignUpUseCase from '../../domain/usecases/SignUpUseCase';

class CreatorController {
    constructor(private createCreatorUseCase: CreateCreatorUseCase,
                private signInUseCase: SignInUseCase,
                private signUpUseCase: SignUpUseCase) {
    }

    routes(): express.Router {
        const router = express.Router();

        router.post('/', async (req, res) => {
            const command = new CreateCreatorCommand(req.body.creatorId);

            try {
                const createdCreatorEvent = await this.createCreatorUseCase.execute(command);
                res.send(createdCreatorEvent);
            } catch (e) {
                res.status(400).send('post body is invalid');
            }
        });


        router.post('/signIn', async(req, res) => {
            const command = new SignInCommand(req.body.email, req.body.pass)

            try{
                const signInEvent = await this.signInUseCase.execute(command)
                res.send(signInEvent)
            } catch(e){
                res.status(400).send('post body is invalid')
            }
        })

        router.post('/signUp', async(req, res) => {
            const command = new SignUpCommand(req.body.email, req.body.pass)

            try{
                const signUpEvent = await this.signUpUseCase.execute(command)
                res.send(signUpEvent)
            } catch(e){
                res.status(400).send('post body is invalid')
            }
        })


        return router;
    }
}

export default CreatorController;