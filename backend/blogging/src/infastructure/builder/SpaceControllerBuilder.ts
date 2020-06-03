import ControllerBuilder from "./ControllerBuilder";
import SpaceController from "../controller/RepositoryController";
import OpenSpaceUseCase from "../../domain/usecases/OpenSpaceUseCase";
import InMemorySpaceRepository from "../repositories/InMemorySpaceRepository";
import ListAllSpacesUseCase from "../../domain/usecases/ListAllSpacesUseCase";

export class SpaceControllerBuilder extends ControllerBuilder<SpaceController> {

    build(): SpaceController {
        const openSpaceUseCase = new OpenSpaceUseCase(new InMemorySpaceRepository(), this.creatorRepository, this.idGenerator);
        const listAllSpacesUseCase = new ListAllSpacesUseCase(this.creatorRepository);
        return new SpaceController(openSpaceUseCase, listAllSpacesUseCase);
    }

}

export default SpaceControllerBuilder;