import {Readable} from "stream";

const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');

export interface TranscribeStrategy {
    transcribe(readSteam: Readable, fileExtension: "mp3" | "flac"): Promise<string>;
}

export class StaticTranscribeStrategy implements TranscribeStrategy {

    constructor(readonly value: string) {
    }

    async transcribe(readSteam: Readable, fileExtension: "mp3" | "flac"): Promise<string> {
        return this.value;
    }

}

export class WatsonDeveloperCloudTranscribeStrategy implements TranscribeStrategy {
    private speech_to_text: any;

    constructor(watsonOption: { apiKey: string, url: string },
                private timestamps: boolean,
                private wordAlternativesThreshold: number) {
        this.speech_to_text = new SpeechToTextV1({
            iam_apikey: watsonOption.apiKey,
            url: watsonOption.url
        });
    }

    async transcribe(readSteam: Readable, fileExtension: "mp3" | "flac"): Promise<string> {
        const params = {
            audio: readSteam,
            content_type: `audio/${fileExtension}`,
            timestamps: this.timestamps,
            word_alternatives_threshold: this.wordAlternativesThreshold,
        };

        const recognition = await this.speech_to_text.recognize(params);

        return recognition.results[0].alternatives[0].transcript;
    }

}