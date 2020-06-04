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
import Schema from "./domain/entities/Schema";
import TypeFactory from "./domain/factories/TypeFactory";
import ContentController from "./infastructure/controller/ContentController";
import WriteContentUseCase from "./domain/usecases/WriteContentUseCase";
import ListAllContentsUseCase from "./domain/usecases/ListAllContentsUseCase";
import ListAllSpacesUseCase from "./domain/usecases/ListAllSpacesUseCase";
import ViewContentUseCase from "./domain/usecases/ViewContentUseCase";
import ViewSchemaUseCase from "./domain/usecases/ViewSchemaUseCase"
import ListAllSchemasUseCase from "./domain/usecases/ListAllSchemasUseCase"
import { TypeDefinition } from './domain/entities/Schema';

const app = express();
const port = 3000;


// Create a new Creator
const creatorRepository = new InMemoryCreatorRepository();
const one_creator = new Creator('1', new Map(), new Map())
creatorRepository.add(one_creator);

// Create a new Type 'Number'
const typeFactory = new TypeFactory()
const type_number = typeFactory.createBy("Number")

// Create two Schemas
const type_1 = new TypeDefinition([{type: type_number, name:"Count"}])
const type_2 = new TypeDefinition([{type: type_number, name:"Alter"},{type: type_number, name:"Count"}])
const one_schema = new Schema("2", "test_schema", type_1)
const second_schema = new Schema("3", "test_schema_2", type_2)

// Define the Schemas to the Creator
one_creator.define(one_schema)
one_creator.define(second_schema)

const listAllSpacesUseCase = new ListAllSpacesUseCase(creatorRepository);
const spaceController = new SpaceController(new OpenSpaceUseCase(new InMemorySpaceRepository(), creatorRepository, new GlobalUniqueIdGenerator()), listAllSpacesUseCase);
const viewSchemaUseCase = new ViewSchemaUseCase(creatorRepository)
const defineSchemaUseCase = new DefineSchemaUseCase(new GlobalUniqueIdGenerator(), creatorRepository, new InMemoryTypeRepository(), new TypeFactory())
const listAllSchemasUseCase = new ListAllSchemasUseCase(creatorRepository)
const schemaController = new SchemaController(defineSchemaUseCase, viewSchemaUseCase, listAllSchemasUseCase);
const writeContentUseCase = new WriteContentUseCase(creatorRepository, new GlobalUniqueIdGenerator(), new TypeFactory());
const listAllContentsUseCase = new ListAllContentsUseCase(creatorRepository);
const viewContentUseCase = new ViewContentUseCase(creatorRepository);
const contentController = new ContentController(writeContentUseCase, listAllContentsUseCase, viewContentUseCase);
//const spaceController = new SpaceController(new OpenSpaceUseCase(new FireBaseSpaceRepository(), new GlobalUniqueIdGenerator()));

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