import express from 'express';
import bodyParser from 'body-parser'

import SpaceController from "./infastructure/controller/RepositoryController";
import OpenSpaceUseCase from "./domain/usecases/OpenSpaceUseCase";
import InMemorySpaceRepository from "./infastructure/repositories/InMemorySpaceRepository";
//import FireBaseSpaceRepository from "./infastructure/repositories/FireBaseSpaceRepository";
import GlobalUniqueIdGenerator from "./shared/GlobalUniqueIdGenerator";
import SchemaController from "./infastructure/controller/SchemaController";
import DefineSchemaUseCase from "./domain/usecases/DefineSchemaUseCase";
import InMemoryCreatorRepository from "./infastructure/repositories/InMemoryCreatorRepository";
import InMemoryTypeRepository from "./infastructure/repositories/InMemoryTypeRepository";
import Creator from "./domain/entities/Creator";

const app = express();
const port = 3000;


const creatorRepository = new InMemoryCreatorRepository();
creatorRepository.add(new Creator('1', []));

const spaceController = new SpaceController(new OpenSpaceUseCase(new InMemorySpaceRepository(), new GlobalUniqueIdGenerator()));
const schemaController = new SchemaController(new DefineSchemaUseCase(new GlobalUniqueIdGenerator(), creatorRepository, new InMemoryTypeRepository()));
//const spaceController = new SpaceController(new OpenSpaceUseCase(new FireBaseSpaceRepository(), new GlobalUniqueIdGenerator()));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(bodyParser.json());
app.use('/spaces', spaceController.routes());
app.use('/schemas', schemaController.routes());


app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server listening at port ${port}`));