import express from 'express';
import OpenSpaceUseCase from "../../domain/usecases/OpenSpaceUseCase";
import OpenSpaceCommand from "../../domain/commands/OpenSpaceCommand";
import EmptyUserIdException from "../../domain/exceptions/EmptyUserIdException";
import EmptyValueException from "../../domain/exceptions/EmptyValueException";
import MoreThan50CharactersException from "../../domain/exceptions/MoreThan50CharactersException";
import NotUniqueSpaceNameException from "../../domain/exceptions/NotUniqueSpaceNameException";
import ListAllSpacesUseCase, {ListAllSpacesCommand} from "../../domain/usecases/ListAllSpacesUseCase";

class SpaceController {
    private errorFactory = new ErrorMessageFactory();

    constructor(private openSpaceUseCase: OpenSpaceUseCase,
                private listAllSpacesUseCase: ListAllSpacesUseCase) {
    }

    routes(): express.Router {
        const router = express.Router();

        router.post('/', async (req, res) => {
            const name = req.body.name;
            const userId = req.body.userid;

            const command = new OpenSpaceCommand(name, userId);

            try {
                const openedSpaceEvent = await this.openSpaceUseCase.execute(command);
                res.send(openedSpaceEvent);
            } catch (e) {
                let errorMessage = this.errorFactory.createFrom(e, command);
                res.status(400).send(errorMessage);
            }
        });

        router.get('/', async (req, res) => {
            const command = new ListAllSpacesCommand(<string>req.headers._creatorId);

            try {
                const writtenSpacesEvent = await this.listAllSpacesUseCase.execute(command);
                res.send(writtenSpacesEvent.content);
            } catch (e) {
                res.status(400).send('post body is invalid');
            }

        });

        return router;
    }
}

class ErrorMessageFactory {

    createFrom(e: Error, command: OpenSpaceCommand): { field: string, value: string, cause: string } {
        if (e instanceof EmptyUserIdException) {
            return {
                field: 'userid',
                value: command.userId || '',
                cause: 'userid can not be empty or made of whitespace'
            }
        }

        if (e instanceof EmptyValueException) {
            return {
                field: 'name',
                value: command.name || '',
                cause: 'name can not be empty or made of whitespace'
            }
        }

        if (e instanceof MoreThan50CharactersException) {
            return {
                field: 'name',
                value: command.name || '',
                cause: 'name can not contain more than 50 characters'
            }
        }

        if (e instanceof NotUniqueSpaceNameException) {
            return {
                field: 'name',
                value: command.name || '',
                cause: 'it already exists a space with an equal name'
            }
        }

        return {
            field: '',
            value: '',
            cause: 'unknown error'
        }
    }
}

export default SpaceController;