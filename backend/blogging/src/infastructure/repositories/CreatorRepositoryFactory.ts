import {CreatorRepository} from "../../domain/repositories/CreatorRepository";
import InMemoryCreatorRepository from "./InMemoryCreatorRepository";
import FireBaseCreatorRepository from "./FireBaseCreatorRepository";

class CreatorRepositoryFactory {
    private environmentByRepository = new Map<string, CreatorRepository>().set("development", new InMemoryCreatorRepository())
                                                                          .set("production", new FireBaseCreatorRepository());

    buildBy(environment: string): CreatorRepository {
        const repository = this.environmentByRepository.get(environment);
        return repository ?? new InMemoryCreatorRepository();
    }

}

export default CreatorRepositoryFactory;