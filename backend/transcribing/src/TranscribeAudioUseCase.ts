import TranscribeAudioCommand from "./TranscribeAudioCommand";
import TranscribedAudioEvent from "./TranscribeAudioEvent";
import {TranscribeStrategy} from "./TranscribeAudioStrategy";

class TranscribeAudioUseCase {

    constructor(private readonly transcribeStrategy: TranscribeStrategy) {
    }

    async execute(command: TranscribeAudioCommand): Promise<TranscribedAudioEvent> {
        const transcription = await this.transcribeStrategy.transcribe(command.audio, command.audioType);

        return new TranscribedAudioEvent(transcription);
    }

}

export default TranscribeAudioUseCase;