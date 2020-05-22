import express from 'express';
import OpenSpaceCommand from "../../domain/commands/OpenSpaceCommand";
import EmptyUserIdException from "../../domain/exceptions/EmptyUserIdException";
import EmptyValueException from "../../domain/exceptions/EmptyValueException";
import MoreThan50CharactersException from "../../domain/exceptions/MoreThan50CharactersException";
import NotUniqueSpaceNameException from "../../domain/exceptions/NotUniqueSpaceNameException";
import {DefineSchemaCommand} from "../../domain/commands/DefineSchemaUseCase";
import DefineSchemaUseCase from "../../domain/usecases/DefineSchemaUseCase";

class SchemaController {
    private errorFactory = new ErrorMessageFactory();

    constructor(private defineSchemaUseCase: DefineSchemaUseCase) {
    }

    routes(): express.Router {
        const router = express.Router();

        router.post('/', async (req, res) => {
            const command = new DefineSchemaCommand(req.body.creatorId, req.body.name, req.body.types);

            try {
                const definedSchemaEvent = await this.defineSchemaUseCase.execute(command);
                res.send(definedSchemaEvent);
            } catch (e) {
                // let errorMessage = this.errorFactory.createFrom(e, command);
                res.status(400).send({});
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

export default SchemaController;