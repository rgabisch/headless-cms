import TranscribeAudioCommand from "../src/TranscribeAudioCommand";
import TranscribeAudioUseCase from "../src/TranscribeAudioUseCase";
import {ReadStream} from "fs";
import {assert} from "chai";
import TranscribedAudioEvent from "../src/TranscribeAudioEvent";
import {StaticTranscribeStrategy} from "../src/TranscribeAudioStrategy";
import {Readable} from "stream";

suite('Transcribe Audio Use Case', () => {

    const transcribeStrategy = new StaticTranscribeStrategy('Lorem Ipsum');
    const useCase = new TranscribeAudioUseCase(transcribeStrategy);

    suite('when execute', () => {
        test('given valid command -> return transcription', async () => {
            const command: TranscribeAudioCommand = {
                audio: Buffer.from('test'),
                audioType: "mp3"
            };

            const event = await useCase.execute(command);

            assert.deepStrictEqual(event, new TranscribedAudioEvent(transcribeStrategy.value));
        });
    })
});