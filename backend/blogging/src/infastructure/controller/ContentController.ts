import express from 'express';
import {DefineSchemaCommand} from "../../domain/commands/DefineSchemaCommand";
import DefineSchemaUseCase from "../../domain/usecases/DefineSchemaUseCase";
import WriteContentUseCase from "../../domain/usecases/WriteContentUseCase";
import WriteContentCommand from "../../domain/commands/WriteContentCommand";
import ListAllContentsUseCase, {ListAllContentsCommand} from "../../domain/usecases/ListAllContentsUseCase";

class ContentController {
    constructor(private writeContentUseCase: WriteContentUseCase,
                private listAllContentsUseCase: ListAllContentsUseCase) {
    }

    routes(): express.Router {
        const router = express.Router();

        router.post('/spaces/:spaceId/', async (req, res) => {
            const command = new WriteContentCommand(
                req.body.schemaId,
                req.body.creatorId,
                req.params.spaceId,
                req.body.name,
                req.body.content
            );

            try {
                const writtenContentEvent = await this.writeContentUseCase.execute(command);
                res.send(writtenContentEvent);
            } catch (e) {
                res.status(400).send('post body is invalid');
            }
        });

        router.get('/spaces/:spaceId', async (req, res) => {
            console.log(req.get('creatorId'))
            const command = new ListAllContentsCommand(req.get('creatorId') ?? "", req.params.spaceId);

            try {
                const writtenContentEvent = await this.listAllContentsUseCase.execute(command);
                res.send(writtenContentEvent.content);
            } catch (e) {
                console.log(e.name)
                res.status(400).send('post body is invalid');
            }

        });

        return router;
    }
}

export default ContentController;