import OpenSpaceCommand from "../commands/OpenSpaceCommand";
import SpaceRepository from "../repositories/SpaceRepository";
import OpenedSpaceEvent from "../events/OpenedSpaceEvent";
import Space from "../entities/Space";
import IdGenerator from "../../shared/IdGenerator";


class OpenSpaceUseCase {
    constructor(private repository: SpaceRepository,
                private idGenerator: IdGenerator) {
    }

    execute(command: OpenSpaceCommand): OpenedSpaceEvent {
        try {
            const space = new Space(this.idGenerator.generate(), command.name);
            this.repository.save(space);
            return new OpenedSpaceEvent(space.id, space.name);
        } catch (exception) {
            throw exception;
        }
    }

}

export default OpenSpaceUseCase;