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
import firebase from "../repositories/firebase/firebase";
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');

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
                        content: writtenContentEvent.content
                    });
                } catch (e) {
                    res.status(400).send('post body is invalid');
                    console.log(e)
                }
            }
            
            else{
                console.log("Content-Type "+req.headers["content-type"])
                let form = new formidable.IncomingForm();

                let x = this
                form.parse(req, async function(err:any, fields:any, files:any) {
                    if (err) {
                        console.error(err.message);
                        return;
                    }

                    let contentJson = JSON.parse(fields['json\n'])
                    let data = files

                    let storage = new firebase(<string>req.headers._creatorId)

                    for(let file in data){
                        let dataJson = data[file].toJSON()
                        
                        try{
                            fs.readFile(dataJson.path,function(err:any,data:any){
                                let bufferData = data
                                storage.storage_add(file.trim(),bufferData)
                            })
                        }catch(e){
                            console.log(e)
                        }
                        
                          for(let json in contentJson.content){
                            if(contentJson.content[json].name == file.trim()){
                                contentJson.content[json].content = <string>req.headers._creatorId+"/"+file.trim()
                            }
                        }
                        
                    }

                    let command = new WriteContentCommand(
                        contentJson.schemaId,
                        <string>req.headers._creatorId,
                        req.params.spaceId,
                        contentJson.name,
                        contentJson.content,
                        <string | undefined>req.query.dateFormat,
                    );

                    console.log(command)

                    try {
                        let writtenContentEvent = await x.writeContentUseCase.execute(command);
                        res.send({
                            contentId: writtenContentEvent.contentId,
                            creatorId: writtenContentEvent.creatorId,
                            creationDate: x.format(writtenContentEvent.creationDate, command.dateFormat),
                            content: writtenContentEvent.content
                        });
                    } catch (e) {
                        res.status(400).send('post body is invalid');
                        console.log(e)
                    }
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