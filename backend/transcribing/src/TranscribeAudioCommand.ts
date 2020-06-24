import {Readable} from "stream";

class TranscribeAudioCommand {
    constructor(public audio: Readable,
                public audioType: "mp3" | "flac"
    ) {
    }
}

export default TranscribeAudioCommand;