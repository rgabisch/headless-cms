import {CreatorRepository} from "../../domain/repositories/CreatorRepository";
import InMemoryCreatorRepository from "./InMemoryCreatorRepository";
import FireBaseCreatorRepository from "./FireBaseCreatorRepository";
import Environment from "../environment/Environment";

class CreatorRepositoryFactory {
    private environmentByRepository = new Map<Environment, CreatorRepository>().set(Environment.DEV, new InMemoryCreatorRepository())
                                                                               .set(Environment.PROD, new FireBaseCreatorRepository());

    buildBy(environment: Environment): CreatorRepository {
        const repository = this.environmentByRepository.get(environment);
        return repository ?? new InMemoryCreatorRepository();
    }

}

export default CreatorRepositoryFactory;