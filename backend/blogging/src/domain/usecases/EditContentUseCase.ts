import EditContentCommand from "../commands/EditContentCommand";
import EditedContentEvent from "../entities/EditedContentEvent";
import {CreatorRepository} from "../repositories/CreatorRepository";
import {UnassignedIdException} from "../exceptions/UnassignedIdException";
import TypeFactory from "../factories/TypeFactory";
import TranscribeAudioUseCase from "../../../../transcribing/src/TranscribeAudioUseCase";
import {StaticTranscribeStrategy} from "../../../../transcribing/src/TranscribeAudioStrategy";
import {TypeMappings} from "../entities/Schema";

class EditContentUseCase {
    private typeFactory = new TypeFactory();
    private transcribeAudioUseCase = new TranscribeAudioUseCase(new StaticTranscribeStrategy('lala'));

    constructor(private readonly creatorRepository: CreatorRepository) {
    }

    public async execute(command: EditContentCommand): Promise<EditedContentEvent> {
        const creator = await this.creatorRepository.findBy(command.creatorId);

        if (!creator)
            throw new UnassignedIdException();

        if (creator.hasNotWritten(command.contentId, command.spaceId))
            throw new UnassignedIdException();

        const content = creator.getContent(command.contentId, command.spaceId);


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

        content.edit(new TypeMappings(typeMapping));

        this.creatorRepository.update(creator);

        return {
            creatorId: creator.id,
            contentId: content.id,
            spaceId: command.spaceId,
            content: command.content
        };
    }
}

export default EditContentUseCase;