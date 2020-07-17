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
import {
    StaticTranscribeStrategy,
    TranscribeStrategy,
    WatsonDeveloperCloudTranscribeStrategy
} from "./transcribing/src/TranscribeAudioStrategy";

require('dotenv').config({path: path.resolve(__dirname, '../.env')});
let history = require('connect-history-api-fallback');
const app = express();
const port = process.env.PORT || 3000;

const creatorRepositoryFactory = new CreatorRepositoryFactory();
const environmentFactory = new EnvironmentFactory();
const environment = environmentFactory.buildBy(process.env.NODE_ENV);
const creatorRepository = creatorRepositoryFactory.buildBy(environment);

const transcribeStrategy: TranscribeStrategy = process.env.NODE_ENV == Environment.DEV
    ? new StaticTranscribeStrategy('lala')
    : new WatsonDeveloperCloudTranscribeStrategy(
        {apiKey: <string>process.env.API_KEY, url: <string>process.env.URL},
        true,
        .9
    );

const controllerFactory = new ControllerFactory(new GlobalUniqueIdGenerator(), creatorRepository, new CurrentDateGenerator(), new TypeFactory(), transcribeStrategy);
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

if (process.env.NODE_ENV === Environment.PROD) {
    app.use(express.static(__dirname + '/public'));
}
app.use(history());
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:8080',
    allowedHeaders: ['Origin, X-Requested-With, content-type, creatorId, Authorization']
}));

const authentication = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authorization = req.get('Authorization') ?? '';
    if (process.env.NODE_ENV == Environment.DEV) {
        req.headers._creatorId = authorization;
        return next();
    } else {
        try {
            if (authorization){
                const token = await fireBaseUserRepository.authToken(authorization);
                req.headers._creatorId = token.user_id;
                return next();
            } else if (req.baseUrl == "/api/contents" && req.method == "GET") {
                req.headers._creatorId = req.get('creatorId')
                return next();
            }
        } catch (e) {
            res.status(401).send(e);
            next(e)
        }
    }
}

app.use('', identifyingController.routes());
app.use('/api/contents', authentication, contentController.routes());
app.use('/api/spaces', authentication, spaceController.routes());
app.use('/api/schemas', authentication, schemaController.routes());
app.use('/api/creators', authentication, creatorController.routes());

app.listen(port, () => console.log(`Server listening at port ${port}`));
