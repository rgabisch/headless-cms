import express from 'express';
import {DefineSchemaCommand} from "../../domain/commands/DefineSchemaCommand";
import DefineSchemaUseCase from "../../domain/usecases/DefineSchemaUseCase";
import WriteContentUseCase from "../../domain/usecases/WriteContentUseCase";
import WriteContentCommand from "../../domain/commands/WriteContentCommand";
import ListAllContentsUseCase from "../../domain/usecases/ListAllContentsUseCase";
import ViewContentUseCase from "../../domain/usecases/ViewContentUseCase";
import ViewContentCommand from "../../domain/commands/ViewContentCommand";
import moment from "moment";
import {WrittenContentEvent} from "../../domain/events/WriteContentEvent";
import {ListAllContentsCommand} from "../../domain/commands/ListAllContentsCommand";
import ListAllContentsUsersUseCase from "../../domain/usecases/ListAllContentsUsersUseCase";
import {ListAllContentsfromSpacesCommand} from "../../domain/commands/ListAllContentsfromSpacesCommand";
import BufferTransformer from "../repositories/firebase/BufferTransformer";
var formidable = require('formidable');
var util = require('util');

class ContentController {
    constructor(private writeContentUseCase: WriteContentUseCase,
                private listAllContentsUseCase: ListAllContentsUseCase,
                private listAllContentsUsersUseCase: ListAllContentsUsersUseCase,
                private viewContentUseCase: ViewContentUseCase) {
    }

    routes(): express.Router {
        const router = express.Router();

        router.post('/spaces/:spaceId/', async (req, res) => {
            if(req.headers["content-type"] == "application/json"){
                console.log("Content-Type application/json")
                const command = new WriteContentCommand(
                    req.body.schemaId,
                    <string>req.headers._creatorId,
                    req.params.spaceId,
                    req.body.name,
                    req.body.content,
                    <string | undefined>req.query.dateFormat,
                );
    
                try {
                    const writtenContentEvent = await this.writeContentUseCase.execute(command);
                    res.send({
                        contentId: writtenContentEvent.contentId,
                        creatorId: writtenContentEvent.creatorId,
                        creationDate: this.format(writtenContentEvent.creationDate, command.dateFormat),
                        content: writtenContentEvent.content
                    });
                } catch (e) {
                    res.status(400).send('post body is invalid');
                }
            }
            
            else{
                console.log("Content-Type "+req.headers["content-type"])
                let form = new formidable.IncomingForm();

                form.parse(req, function(err:any, fields:any, files:any) {
                    if (err) {
                      console.error(err.message);
                      return;
                    }

                    let contentJson = JSON.parse(fields.contentJson)

                    let command = new WriteContentCommand(
                        contentJson.body.schemaId,
                        <string>contentJson.headers._creatorId,
                        contentJson.params.spaceId,
                        contentJson.body.name,
                        contentJson.body.content,
                        <string | undefined>contentJson.query.dateFormat,
                    );
                    
                    let files_json = files

                    res.writeHead(200, {'content-type': 'text/plain'});
                    res.write('ok');
                    res.end(util.inspect({fields: fields, files: files}));
                })
            }
        });

        router.get('/spaces/:spaceId', async (req, res) => {
            const command = new ListAllContentsCommand(
                <string>req.headers._creatorId,
                req.params.spaceId,
                <string | undefined>req.query.dateFormat);

            try {
                const writtenContentEvent = await this.listAllContentsUseCase.execute(command);

                const response = writtenContentEvent.content
                                                    .map(({id, name, creationDate}) => ({
                                                        id,
                                                        name,
                                                        creationDate: this.format(creationDate, command.dateFormat)
                                                    }));
                res.send(response);
            } catch (e) {
                res.status(400).send('post body is invalid');
            }
        });

        router.get('/', async (req, res) => {

            const command = new ListAllContentsfromSpacesCommand(
                <string>req.headers._creatorId,
                <string | undefined>req.query.dateFormat);

            try {
                const writtenContentEvent = await this.listAllContentsUsersUseCase.execute(command);

                const response = writtenContentEvent.spaces.map(space => ({
                    space: space.space,
                    content: space.contents.map(content => ({
                        id: content.id,
                        name: content.name,
                        creationDate: this.format(content.creationDate, command.dateFormat)
                    }))
                }));

                res.send(response);
            } catch (e) {
                res.status(400)
            }
        });

        router.get('/:contentId/spaces/:spaceId', async (req, res) => {
            const command = new ViewContentCommand(
                <string>req.headers._creatorId,
                req.params.spaceId,
                req.params.contentId,
                <string | undefined>req.query.dateFormat
            );

            try {
                const viewedContentEvent = await this.viewContentUseCase.execute(command);
                res.send({
                    id: viewedContentEvent.id,
                    name: viewedContentEvent.name,
                    creationDate: this.format(viewedContentEvent.creationDate, command.dateFormat),
                    schema: viewedContentEvent.schema,
                    mapping: viewedContentEvent.mapping
                });
            } catch (e) {
                res.status(400).send('post body is invalid');
            }
        });

        return router;
    }


    private format(from: Date, to: string): string {
        return moment(from).format(to)
    }
}

export default ContentController;