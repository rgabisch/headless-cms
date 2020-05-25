import OpenSpaceCommand from "../commands/OpenSpaceCommand";
import SpaceRepository from "../repositories/SpaceRepository";
import OpenedSpaceEvent from "../events/OpenedSpaceEvent";
import Space from "../entities/Space";
import IdGenerator from "../../shared/IdGenerator";
import NotUniqueSpaceNameException from "../exceptions/NotUniqueSpaceNameException";
import FindByNameCriteria from "../repositories/criterias/FindByNameCriteria";
import {CreatorRepository} from "../repositories/DefineSchemaUseCase";
import {UnassignedIdException} from "../exceptions/DefineSchemaUseCase";


class OpenSpaceUseCase {
    constructor(private repository: SpaceRepository,
                private creatorRepository: CreatorRepository,
                private idGenerator: IdGenerator) {
    }

    async execute(command: OpenSpaceCommand): Promise<OpenedSpaceEvent> {
        const creator = await this.creatorRepository.findBy(command.userId);

        if (!creator)
            throw new UnassignedIdException();

        const space = new Space(this.idGenerator.generate(), command.userId, command.name);
        const spacesWithEqualName = await this.repository.query(new FindByNameCriteria(space));

        if (spacesWithEqualName.length > 0) {
            throw new NotUniqueSpaceNameException();
        }
        creator.open(space);
        this.repository.save(space);
        await this.creatorRepository.update(creator);

        return new OpenedSpaceEvent(space.id, space.name);
    }

}

export default OpenSpaceUseCase;