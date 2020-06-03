import Environment from "./Environment";

class EnvironmentFactory {
    private environmentByRepository = new Map<string, Environment>().set("development", Environment.DEV)
                                                                    .set("production", Environment.PROD);

    buildBy(environment: string = ""): Environment {
        const repository = this.environmentByRepository.get(environment);
        return repository ?? Environment.DEV;
    }

}

export default EnvironmentFactory;