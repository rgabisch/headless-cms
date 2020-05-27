import express from 'express';
import {DefineSchemaCommand} from "../../domain/commands/DefineSchemaCommand";
import DefineSchemaUseCase from "../../domain/usecases/DefineSchemaUseCase";

class SchemaController {
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
                res.status(400).send('post body is invalid');
            }
        });

        return router;
    }
}

export default SchemaController;