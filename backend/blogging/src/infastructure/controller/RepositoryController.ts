import express from 'express';
import OpenSpaceUseCase from "../../domain/usecases/OpenSpaceUseCase";
import OpenSpaceCommand from "../../domain/commands/OpenSpaceCommand";
import EmptyUserIdException from "../../domain/exceptions/EmptyUserIdException";
import EmptySpaceNameException from "../../domain/exceptions/EmptySpaceNameException";
import MoreThan50CharactersSpaceNameException from "../../domain/exceptions/MoreThan50CharactersSpaceNameException";
import NotUniqueSpaceNameException from "../../domain/exceptions/NotUniqueSpaceNameException";

class SpaceController {
    constructor(private openSpaceUseCase: OpenSpaceUseCase) {
    }

    routes(): express.Router {
        const router = express.Router();

        router.post('/', (req, res) => {
            const name = req.body.name;
            const userId = req.body.userid;

            const command = new OpenSpaceCommand(name, userId);

            try {
                const openedSpaceEvent = this.openSpaceUseCase.execute(command);
                res.send(openedSpaceEvent);
            } catch (e) {
                let message;

                if (e instanceof EmptyUserIdException) {
                    message = {
                        field: 'userid',
                        value: userId || '',
                        cause: 'userid can not be empty or made of whitespace'
                    }
                }

                if (e instanceof EmptySpaceNameException) {
                    message = {
                        field: 'name',
                        value: name || '',
                        cause: 'name can not be empty or made of whitespace'
                    }
                }

                if (e instanceof MoreThan50CharactersSpaceNameException) {
                    message = {
                        field: 'name',
                        value: name || '',
                        cause: 'name can not contain more than 50 characters'
                    }
                }

                if (e instanceof NotUniqueSpaceNameException) {
                    message = {
                        field: 'name',
                        value: name || '',
                        cause: 'it already exists a space with an equal name'
                    }
                }

                res.status(400).send(message);
            }

        });

        return router;
    }
}

export default SpaceController;