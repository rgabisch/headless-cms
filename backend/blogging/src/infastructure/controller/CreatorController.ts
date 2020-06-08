import express from 'express';
import CreateCreatorUseCase from "../../domain/usecases/CreateCreatorUseCase";
import CreateCreatorCommand from "../../domain/commands/CreateCreatorCommand";
import { SignInCommand } from '../../domain/commands/SignInCommand';
import SignInUseCase from '../../../../identifying/src/domain/usecases/SignInUseCase';
import { SignUpCommand } from '../../domain/commands/SignUpCommand';
import SignUpUseCase from '../../../../identifying/src/domain/usecases/SignUpUseCase';

class CreatorController {
    constructor(private createCreatorUseCase: CreateCreatorUseCase) {
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

        return router;
    }
}

export default CreatorController;