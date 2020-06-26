import express from 'express';
import bodyParser from 'body-parser'
import GlobalUniqueIdGenerator from "./blogging/src/shared/GlobalUniqueIdGenerator";
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
import path from "path";
import cors from 'cors';

require('dotenv').config({path: path.resolve(__dirname, '../.env')});

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
    signUpUseCase.execute({email: 'test@mail.de', pass: 'test'});
}

app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:8080',
    allowedHeaders: ['Origin, X-Requested-With, content-type, creatorId, Authorization']
}));

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
