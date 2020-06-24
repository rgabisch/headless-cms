import ControllerBuilder from "./ControllerBuilder";
import SpaceController from "../controller/RepositoryController";
import OpenSpaceUseCase from "../../domain/usecases/OpenSpaceUseCase";
import InMemorySpaceRepository from "../repositories/InMemorySpaceRepository";
import ListAllSpacesUseCase from "../../domain/usecases/ListAllSpacesUseCase";
import Environment from "../environment/Environment";
import FireBaseSpaceRepository from "../repositories/FireBaseSpaceRepository";

export class SpaceControllerBuilder extends ControllerBuilder<SpaceController> {

    build(): SpaceController {
        const spaceRepository = process.env.NODE_ENV == Environment.DEV ? new InMemorySpaceRepository() : new FireBaseSpaceRepository();
        const openSpaceUseCase = new OpenSpaceUseCase(spaceRepository, this.creatorRepository, this.idGenerator);
        const listAllSpacesUseCase = new ListAllSpacesUseCase(this.creatorRepository);
        return new SpaceController(openSpaceUseCase, listAllSpacesUseCase);
    }

}

export default SpaceControllerBuilder;