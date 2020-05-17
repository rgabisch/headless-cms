import OpenSpaceCommand from "../commands/OpenSpaceCommand";
import SpaceRepository from "../repositories/SpaceRepository";
import OpenedSpaceEvent from "../events/OpenedSpaceEvent";
import Space from "../entities/Space";
import IDGenerator from "../../shared/IDGenerator";


class OpenSpaceUseCase {
    constructor(private repository: SpaceRepository,
                private idGenerator: IDGenerator) {
    }

    execute(command: OpenSpaceCommand): OpenedSpaceEvent {
        try {
            const space = new Space(this.idGenerator.generate(), command.name);
            this.repository.save(space);
            return {};
        } catch (e) {
            throw e;
        }
    }

}

export default OpenSpaceUseCase;