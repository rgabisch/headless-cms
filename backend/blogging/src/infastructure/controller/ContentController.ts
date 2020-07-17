import express from 'express';
import WriteContentUseCase from "../../domain/usecases/WriteContentUseCase";
import WriteContentCommand from "../../domain/commands/WriteContentCommand";
import ListAllContentsUseCase from "../../domain/usecases/ListAllContentsUseCase";
import ViewContentUseCase from "../../domain/usecases/ViewContentUseCase";
import ViewContentCommand from "../../domain/commands/ViewContentCommand";
import moment from "moment";
import {ListAllContentsCommand} from "../../domain/commands/ListAllContentsCommand";
import ListAllContentsUsersUseCase from "../../domain/usecases/ListAllContentsUsersUseCase";
import {ListAllContentsfromSpacesCommand} from "../../domain/commands/ListAllContentsfromSpacesCommand";
import {TypeId} from "../../domain/entities/Type";
import {promises as fs} from "fs";
import RemoveContentUseCase from "../../domain/usecases/RemoveContentUseCase";
import EditContentUseCase from "../../domain/usecases/EditContentUseCase";
import EditContentCommand from "../../domain/commands/EditContentCommand";

const formidable = require('formidable');

class ContentController {
    constructor(private writeContentUseCase: WriteContentUseCase,
                private listAllContentsUseCase: ListAllContentsUseCase,
                private listAllContentsUsersUseCase: ListAllContentsUsersUseCase,
                private viewContentUseCase: ViewContentUseCase,
                private removeContentUseCase: RemoveContentUseCase,
                private editContentUseCase: EditContentUseCase) {
    }

    routes(): express.Router {
        const router = express.Router();

        router.post('/spaces/:spaceId/', async (req, res) => {
            if (req.headers["content-type"]?.includes("application/json")) {

                let command = new WriteContentCommand(
                    req.body.schemaId,
                    <string>req.headers._creatorId,
                    req.params.spaceId,
                    req.body.name,
                    req.body.content,
                    <string | undefined>req.query.dateFormat,
                );

                try {
                    let writtenContentEvent = await this.writeContentUseCase.execute(command);
                    res.send({
                        contentId: writtenContentEvent.contentId,
                        creatorId: writtenContentEvent.creatorId,
                        creationDate: this.format(writtenContentEvent.creationDate, command.dateFormat),
                        editDate: this.format(writtenContentEvent.editDate, command.dateFormat),
                        content: writtenContentEvent.content
                    });
                } catch (e) {
                    res.status(400).send('post body is invalid');
                    console.log(e)
                }
            } else {
                console.log("Content-Type " + req.headers["content-type"])
                let form = new formidable.IncomingForm();

                let x = this
                form.parse(req, async function (err: any, fields: any, files: any) {
                    if (err) {
                        console.error(err.message);
                        return;
                    }

                    const content = JSON.parse(<string>fields['json']);

                    const mappedContent: { typeId: string; name: string, content: string, raw?: Buffer }[] = [];

                    for (let c of content.content) {
                        if (c.typeId !== TypeId.Audio) {
                            mappedContent.push(c);
                        } else {
                            if (files[c.name]) {
                                mappedContent.push(Object.assign(c, {
                                    content: '',
                                    raw: await fs.readFile(files[c.name].path)
                                }));
                            }
                        }
                    }

                    let command = new WriteContentCommand(
                        content.schemaId,
                        <string>req.headers._creatorId,
                        req.params.spaceId,
                        content.name,
                        mappedContent,
                        <string | undefined>req.query.dateFormat,
                    );

                    try {
                        let writtenContentEvent = await x.writeContentUseCase.execute(command);
                        res.send({
                            contentId: writtenContentEvent.contentId,
                            creatorId: writtenContentEvent.creatorId,
                            creationDate: x.format(writtenContentEvent.creationDate, command.dateFormat),
                            editDate: x.format(writtenContentEvent.editDate, command.dateFormat),
                            content: writtenContentEvent.content
                        });
                    } catch (e) {
                        res.status(400).send('post body is invalid');
                        console.log(e)
                    }
                })
            }
        });

        router.put('/:contentId/spaces/:spaceId/', async (req, res) => {
            console.log("Content-Type " + req.headers["content-type"])
            let form = new formidable.IncomingForm();

            let x = this
            form.parse(req, async function (err: any, fields: any, files: any) {
                if (err) {
                    console.error(err.message);
                    return;
                }

                const content = JSON.parse(<string>fields['json']);

                const mappedContent: { typeId: string; name: string, content: string, raw?: Buffer }[] = [];

                for (let c of content.content) {
                    mappedContent.push(c);
                }

                let command = new EditContentCommand(
                    <string>req.headers._creatorId,
                    req.params.contentId,
                    req.params.spaceId,
                    mappedContent,
                    <string | undefined>req.query.dateFormat,
                );

                try {
                    let editedContentEvent = await x.editContentUseCase.execute(command);
                    res.send({
                        contentId: editedContentEvent.contentId,
                        creatorId: editedContentEvent.creatorId,
                        creationDate: x.format(editedContentEvent.creationDate, command.dateFormat),
                        editDate: x.format(editedContentEvent.editDate, command.dateFormat),
                        content: editedContentEvent.content
                    });
                } catch (e) {
                    res.status(400).send('post body is invalid');
                    console.log(e)
                }
            })
        });

        router.get('/spaces/:spaceId', async (req, res) => {
            const command = new ListAllContentsCommand(
                <string>req.headers._creatorId,
                req.params.spaceId,
                <string | undefined>req.query.dateFormat);

            try {
                const writtenContentEvent = await this.listAllContentsUseCase.execute(command);

                const response = writtenContentEvent.content
                                                    .map(({id, name, creationDate, editDate}) => ({
                                                        id,
                                                        name,
                                                        creationDate: this.format(creationDate, command.dateFormat),
                                                        editDate: this.format(editDate, command.dateFormat)
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
                        creationDate: this.format(content.creationDate, command.dateFormat),
                        editDate: this.format(content.editDate, command.dateFormat)
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
                    editDate: this.format(viewedContentEvent.editDate, command.dateFormat),
                    schema: viewedContentEvent.schema,
                    mapping: viewedContentEvent.mapping
                });
            } catch (e) {
                res.status(400).send('post body is invalid');
            }
        });

        router.delete('/:contentId/spaces/:spaceId', async (req, res) => {
            await this.removeContentUseCase.execute({
                creatorId: <string>req.headers._creatorId,
                contentId: req.params.contentId,
                spaceId: req.params.spaceId,
            });

            res.sendStatus(200);
        });

        return router;
    }


    private format(from: Date, to: string): string {
        return moment(from).format(to)
    }
}

export default ContentController;