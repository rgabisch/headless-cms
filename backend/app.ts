import express from 'express';
import bodyParser from 'body-parser'
import GlobalUniqueIdGenerator from "./blogging/src/shared/GlobalUniqueIdGenerator";
import InMemoryCreatorRepository from "./blogging/src/infastructure/repositories/InMemoryCreatorRepository";
import Creator from "./blogging/src/domain/entities/Creator";
import Schema, {TypeDefinition} from "./blogging/src/domain/entities/Schema";
import TypeFactory from "./blogging/src/domain/factories/TypeFactory";
import CreatorRepositoryFactory from "./blogging/src/infastructure/repositories/CreatorRepositoryFactory";
import EnvironmentFactory from "./blogging/src/infastructure/environment/EnvironmentFactory";
import Environment from "./blogging/src/infastructure/environment/Environment";
import ControllerFactory from "./blogging/src/infastructure/controller/ControllerFactory";
import CurrentDateGenerator from "./blogging/src/shared/CurrentDateGenerator";
import IdentifyingController from "./identifying/src/infastructure/IdentifyingController";
import SignInUseCase from "./identifying/src/domain/usecases/SignInUseCase";
import FireBaseUserRepository from "./identifying/src/infastructure/FireBaseUserRepository";
import SignUpUseCase from "./identifying/src/domain/usecases/SignUpUseCase";
import InMemoryUserRepository from "./identifying/src/infastructure/InMemoryUserRepository";
import CreateCreatorUseCase from './blogging/src/domain/usecases/CreateCreatorUseCase';
import {resolveSoa} from 'dns';


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

const fireBaseUserRepository = new FireBaseUserRepository();
const userRepository = process.env.NODE_ENV == Environment.DEV ? new InMemoryUserRepository() : fireBaseUserRepository;
let signUpUseCase = new SignUpUseCase(userRepository, new CreateCreatorUseCase(creatorRepository));
const identifyingController = new IdentifyingController(new SignInUseCase(userRepository), signUpUseCase);


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

    signUpUseCase.execute({email: 'test@mail.de', pass: 'test'});
}

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, creatorId, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use('', identifyingController.routes());

app.use(async (req, res, next) => {
    const authorization = req.get('Authorization') ?? '';

    if (process.env.NODE_ENV == Environment.DEV) {
        req.headers._creatorId = authorization;
        return next();
    } else {
        try {
            const token = await fireBaseUserRepository.authToken(authorization);
            req.headers._creatorId = token.user_id;
            return next();
        } catch (e) {
            res.status(401).send(e);
            next(e)
        }
    }
});

app.use('/spaces', spaceController.routes());
app.use('/schemas', schemaController.routes());
app.use('/contents', contentController.routes());
app.use('/creators', creatorController.routes());


app.listen(port, () => console.log(`Server listening at port ${port}`));