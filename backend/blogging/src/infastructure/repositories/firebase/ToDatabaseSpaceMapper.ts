import Space from "../../../domain/entities/Space";
import {Mapper} from "./ToDatabaseCreatorMapper";
import ToDatabaseContentMapper, {MappedContent} from "./ToDatabaseContentMapper";

export type MappedSpace = {
    id: string,
    name: string,
    contents: MappedContent[]
}

class ToDatabaseSpaceMapper implements Mapper<Space, any> {
    constructor(private contentMapper: ToDatabaseContentMapper) {
    }

    map(space: Space): MappedSpace {
        const contents = space.getAll().map(content => this.contentMapper.map(content));

        return {
            id: space.id,
            name: space.name,
            contents: contents
        };
    }
}

export default ToDatabaseSpaceMapper;