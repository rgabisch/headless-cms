import OpenSpaceCommand from "../commands/OpenSpaceCommand";
import SpaceRepository from "../repositories/SpaceRepository";
import OpenedSpaceEvent from "../events/OpenedSpaceEvent";
import Space from "../entities/Space";
import IdGenerator from "../../shared/IdGenerator";
import NotUniqueSpaceNameException from "../exceptions/NotUniqueSpaceNameException";
import FindByNameCriteria from "../repositories/criterias/FindByNameCriteria";


class OpenSpaceUseCase {
    constructor(private repository: SpaceRepository,
                private idGenerator: IdGenerator) {
    }

    execute(command: OpenSpaceCommand): OpenedSpaceEvent {
        const space = new Space(this.idGenerator.generate(), command.userId, command.name);
        const spacesWithEqualName = this.repository.query(new FindByNameCriteria(space));

        if (spacesWithEqualName.length > 0) {
            throw new NotUniqueSpaceNameException();
        }

        this.repository.save(space);

        return new OpenedSpaceEvent(space.id, space.name);
    }

}

export default OpenSpaceUseCase;