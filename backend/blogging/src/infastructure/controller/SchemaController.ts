import express from 'express';
import {DefineSchemaCommand} from "../../domain/commands/DefineSchemaCommand";
import DefineSchemaUseCase from "../../domain/usecases/DefineSchemaUseCase";
import ViewSchemaUseCase from "../../domain/usecases/ViewSchemaUseCase";
import ViewSchemaCommand from '../../domain/commands/ViewSchemaCommand';
import ListAllSchemasCommand from '../../domain/commands/ListAllSchemasCommand';
import ListAllSchemasUseCase from '../../domain/usecases/ListAllSchemasUseCase';

class SchemaController {
    constructor(private defineSchemaUseCase: DefineSchemaUseCase,
                private viewSchemaUseCase: ViewSchemaUseCase,
                private listAllSchemasUseCase: ListAllSchemasUseCase) {
    }

    routes(): express.Router {
        const router = express.Router();

        router.post('/', async (req, res) => {
            const command = new DefineSchemaCommand(<string>req.headers._creatorId, req.body.name, req.body.types);
            try {
                const definedSchemaEvent = await this.defineSchemaUseCase.execute(command);
                res.send(definedSchemaEvent);
            } catch (e) {
                res.status(400).send('post body is invalid');
            }
        });

        router.get('/', async (req, res) => {
            const command = new ListAllSchemasCommand(<string>req.headers._creatorId);
            try {
                const listAllSchemasEvent = await this.listAllSchemasUseCase.execute(command);
                res.send(listAllSchemasEvent)
            } catch (e) {
                res.status(404).send('404 - No Schema found');
            }
        });

        router.get('/:schemaId', async (req, res) => {
            const command = new ViewSchemaCommand(<string>req.headers._creatorId, req.params.schemaId);
            try {
                const viewSchemaEvent = await this.viewSchemaUseCase.execute(command);
                res.send(viewSchemaEvent)
            } catch (e) {
                res.status(404).send('404 - No Schema found');
            }

        });


        return router;
    }
}

export default SchemaController;