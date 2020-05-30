import express from 'express';
import {DefineSchemaCommand} from "../../domain/commands/DefineSchemaCommand";
import DefineSchemaUseCase from "../../domain/usecases/DefineSchemaUseCase";
import ViewSchemaUseCase from "../../domain/usecases/ViewSchemaUseCase";
import ViewSchemaCommand from '../../domain/commands/ViewSchemaCommand';

class SchemaController {
    constructor(private defineSchemaUseCase: DefineSchemaUseCase,
                private viewSchemaUseCase: ViewSchemaUseCase) {
    }

    routes(): express.Router {
        const router = express.Router();

        router.post('/', async (req, res) => {
            const command = new DefineSchemaCommand(req.body.creatorId, req.body.name, req.body.types);

            try {
                const definedSchemaEvent = await this.defineSchemaUseCase.execute(command);
                res.send(definedSchemaEvent);
            } catch (e) {
                res.status(400).send('post body is invalid');
            }
        });

        router.get('/:schemaId/creator/:creatorId', async (req,res) =>{
            const command = new ViewSchemaCommand(req.params.creatorId, req.params.schemaId)

            try{
                const viewSchemaEvent = await this.viewSchemaUseCase.execute(command);
                res.send(viewSchemaEvent)
            } catch(e){
                res.status(404).send('404 - No Schema found')
            }

        })

        return router;
    }
}

export default SchemaController;