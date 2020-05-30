import ViewContentCommand from "../commands/ViewContentCommand";
import ViewContentEvent from "../events/ViewContentEvent";
import {CreatorRepository} from "../repositories/CreatorRepository";
import {UnassignedIdException} from "../exceptions/UnassignedIdException";
import Content from "../entities/Content";
import {TypeMappings} from "../entities/Schema";

class ViewContentUseCase {

    constructor(private creatorRepository: CreatorRepository) {
    }

    async execute(command: ViewContentCommand): Promise<ViewContentEvent> {
        const creator = await this.creatorRepository.findBy(command.creatorId);

        if (!creator)
            throw new UnassignedIdException();

        if (creator.hasNotOpens(command.spaceId))
            throw new UnassignedIdException();

        if (creator.hasNotWritten(command.contentId, command.spaceId))
            throw new UnassignedIdException();

        const content = <Content>creator.getContent(command.contentId, command.spaceId);
        return {
            id: content.id,
            name: content.name,
            schema: {
                id: content.schemaId,
                name: content.schemaName
            },
            mapping: this.map(content.typeMappings)
        }
    }

    private map(typeMappings: TypeMappings): { type: { id: string, name: string }, content: string }[] {
        const mapped = [];

        for (let typeMapping of typeMappings) {
            mapped.push(
                {
                    type: {
                        id: typeMapping.type.id,
                        name: typeMapping.name
                    },
                    content: typeMapping.content
                }
            );
        }

        return mapped;
    }
}

export default ViewContentUseCase;