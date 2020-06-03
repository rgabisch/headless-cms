import express from 'express';
import bodyParser from 'body-parser'
import GlobalUniqueIdGenerator from "./shared/GlobalUniqueIdGenerator";
import InMemoryCreatorRepository from "./infastructure/repositories/InMemoryCreatorRepository";
import Creator from "./domain/entities/Creator";
import TypeFactory from "./domain/factories/TypeFactory";
import CreatorRepositoryFactory from "./infastructure/repositories/CreatorRepositoryFactory";
import EnvironmentFactory from "./infastructure/environment/EnvironmentFactory";
import Environment from "./infastructure/environment/Environment";
import ControllerFactory from "./infastructure/controller/ControllerFactory";

const app = express();
const port = 3000;

const creatorRepositoryFactory = new CreatorRepositoryFactory();
const environmentFactory = new EnvironmentFactory();
const environment = environmentFactory.buildBy(process.env.NODE_ENV);
const creatorRepository = creatorRepositoryFactory.buildBy(environment);
const controllerFactory = new ControllerFactory(new GlobalUniqueIdGenerator(), creatorRepository, new TypeFactory());
const spaceController = controllerFactory.buildForSpace();
const schemaController = controllerFactory.buildForSchema();
const contentController = controllerFactory.buildForContent();
const creatorController = controllerFactory.buildForCreator();

if (process.env.NODE_ENV == Environment.DEV) {
    (creatorRepository as InMemoryCreatorRepository).add(new Creator('1', new Map(), new Map()));
}

app.use(bodyParser.json());

app.use('/spaces', spaceController.routes());
app.use('/schemas', schemaController.routes());
app.use('/contents', contentController.routes());
app.use('/creators', creatorController.routes());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, creatorId');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.listen(port, () => console.log(`Server listening at port ${port}`));