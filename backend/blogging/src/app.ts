import express from 'express';
import bodyParser from 'body-parser'

import SpaceController from "./infastructure/controller/RepositoryController";
import OpenSpaceUseCase from "./domain/usecases/OpenSpaceUseCase";
import InMemorySpaceRepository from "./infastructure/repositories/InMemorySpaceRepository";
import GlobalUniqueIdGenerator from "./shared/GlobalUniqueIdGenerator";
import SchemaController from "./infastructure/controller/SchemaController";
import DefineSchemaUseCase from "./domain/usecases/DefineSchemaUseCase";
import InMemoryCreatorRepository from "./infastructure/repositories/InMemoryCreatorRepository";
import InMemoryTypeRepository from "./infastructure/repositories/InMemoryTypeRepository";
import Creator from "./domain/entities/Creator";
import TypeFactory from "./domain/factories/TypeFactory";
import ContentController from "./infastructure/controller/ContentController";
import WriteContentUseCase from "./domain/usecases/WriteContentUseCase";
import ListAllContentsUseCase from "./domain/usecases/ListAllContentsUseCase";
import ListAllSpacesUseCase from "./domain/usecases/ListAllSpacesUseCase";
import ViewContentUseCase from "./domain/usecases/ViewContentUseCase";
import ViewSchemaUseCase from "./domain/usecases/ViewSchemaUseCase"
import CreatorRepositoryFactory from "./infastructure/repositories/CreatorRepositoryFactory";

const app = express();
const port = 3000;

const creatorRepositoryFactory = new CreatorRepositoryFactory();
const creatorRepository = creatorRepositoryFactory.buildBy(process.env.NODE_ENV ?? "development");

if (process.env.NODE_ENV == "development") {
    (creatorRepository as InMemoryCreatorRepository).add(new Creator('1', new Map(), new Map()));
}

const listAllSpacesUseCase = new ListAllSpacesUseCase(creatorRepository);
const spaceController = new SpaceController(new OpenSpaceUseCase(new InMemorySpaceRepository(), creatorRepository, new GlobalUniqueIdGenerator()), listAllSpacesUseCase);
const viewSchemaUseCase = new ViewSchemaUseCase(creatorRepository);
const defineSchemaUseCase = new DefineSchemaUseCase(new GlobalUniqueIdGenerator(), creatorRepository, new InMemoryTypeRepository(), new TypeFactory())
const schemaController = new SchemaController(defineSchemaUseCase, viewSchemaUseCase);
const writeContentUseCase = new WriteContentUseCase(creatorRepository, new GlobalUniqueIdGenerator(), new TypeFactory());
const listAllContentsUseCase = new ListAllContentsUseCase(creatorRepository);
const viewContentUseCase = new ViewContentUseCase(creatorRepository);
const contentController = new ContentController(writeContentUseCase, listAllContentsUseCase, viewContentUseCase);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, creatorId');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use('/spaces', spaceController.routes());
app.use('/schemas', schemaController.routes());
app.use('/contents', contentController.routes());


app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server listening at port ${port}`));