import express from 'express';
import bodyParser from 'body-parser'
import GlobalUniqueIdGenerator from "./shared/GlobalUniqueIdGenerator";
import InMemoryCreatorRepository from "./infastructure/repositories/InMemoryCreatorRepository";
import Creator from "./domain/entities/Creator";
import Schema, {TypeDefinition} from "./domain/entities/Schema";
import TypeFactory from "./domain/factories/TypeFactory";
import CreatorRepositoryFactory from "./infastructure/repositories/CreatorRepositoryFactory";
import EnvironmentFactory from "./infastructure/environment/EnvironmentFactory";
import Environment from "./infastructure/environment/Environment";
import ControllerFactory from "./infastructure/controller/ControllerFactory";
import CurrentDateGenerator from "./shared/CurrentDateGenerator";


const app = express();
const port = 3000;

const creatorRepositoryFactory = new CreatorRepositoryFactory();
const environmentFactory = new EnvironmentFactory();
const environment = environmentFactory.buildBy(process.env.NODE_ENV);
const creatorRepository = creatorRepositoryFactory.buildBy(environment);
const controllerFactory = new ControllerFactory(new GlobalUniqueIdGenerator(), creatorRepository, new CurrentDateGenerator(), new TypeFactory());
const spaceController = controllerFactory.buildForSpace();
const schemaController = controllerFactory.buildForSchema();
const contentController = controllerFactory.buildForContent();
const creatorController = controllerFactory.buildForCreator();


if (process.env.NODE_ENV == Environment.DEV) {
    // Create a new Creator
    const one_creator = new Creator('1', new Map(), new Map());

    // Create a new Type 'Number'
    const typeFactory = new TypeFactory();
    const type_number = typeFactory.createBy("Number");

    // Create two Schemas
    const type_1 = new TypeDefinition([{type: type_number, name: "Count"}]);
    const type_2 = new TypeDefinition([{type: type_number, name: "Alter"}, {type: type_number, name: "Count"}]);
    const one_schema = new Schema("2", "test_schema", type_1);
    const second_schema = new Schema("3", "test_schema_2", type_2);

    // Define the Schemas to the Creator
    one_creator.define(one_schema);
    one_creator.define(second_schema);

    (creatorRepository as InMemoryCreatorRepository).add(one_creator);
}

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
app.use('/creators', creatorController.routes());

app.listen(port, () => console.log(`Server listening at port ${port}`));