import WriteContentCommand from "../commands/WriteContentCommand";
import {WrittenContentEvent} from "../events/WriteContentEvent";
import {UnassignedIdException} from "../exceptions/UnassignedIdException";
import {CreatorRepository} from "../repositories/CreatorRepository";
import IdGenerator from "../../shared/IdGenerator";
import Content from "../entities/Content";
import {TypeMappings} from "../entities/Schema";
import TypeFactory from "../factories/TypeFactory";
import Space from "../entities/Space";
import DateGenerator from "../../shared/DateGenerator";
import TranscribeAudioUseCase from "../../../../transcribing/src/TranscribeAudioUseCase";
import {TranscribeStrategy} from "../../../../transcribing/src/TranscribeAudioStrategy";
import {Readable} from "stream";

class WriteContentUseCase {
    constructor(private creatorRepository: CreatorRepository,
                private idGenerator: IdGenerator,
                private typeFactory: TypeFactory,
                private dateGenerator: DateGenerator,
                private transcribeAudioUseCase: TranscribeAudioUseCase) {
    }

    async execute(command: WriteContentCommand): Promise<WrittenContentEvent> {
        const creator = await this.creatorRepository.findBy(command.creatorId);

        if (!creator)
            throw new UnassignedIdException();

        if (creator.hasNotDefined(command.schemaId))
            throw new UnassignedIdException();

        if (creator.hasNotOpens(command.spaceId))
            throw new UnassignedIdException();

        const typeMapping = await Promise.all(command.content.map(async ({typeId, name, content, raw}) => {
            const type = this.typeFactory.createBy(typeId);

            if (type.isAudio()) {
                const transcribedAudioEvent = await this.transcribeAudioUseCase.execute({
                    audio: <Buffer>raw,
                    audioType: 'mp3'
                });

                content = transcribedAudioEvent.transcription
            }

            return {
                type: this.typeFactory.createBy(typeId),
                name,
                content: <string>content
            }
        }));

        const space = creator.getSpace(command.spaceId);

        const content = new Content(
            this.idGenerator.generate(),
            command.contentName,
            creator.getSchemaBy(command.schemaId),
            this.dateGenerator.generate(),
            new TypeMappings(typeMapping)
        );

        creator.write(content, space);

        this.creatorRepository.update(creator);


        return new WrittenContentEvent(
            content.id,
            creator.id,
            content.creationDate,
            typeMapping.map(({type, name, content}) => ({
                typeId: type.id,
                name,
                content
            }))
        );
    }
}

export default WriteContentUseCase;