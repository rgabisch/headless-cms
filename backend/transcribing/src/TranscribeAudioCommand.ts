class TranscribeAudioCommand {
    constructor(public audio: Buffer,
                public audioType: "mp3" | "flac"
    ) {
    }
}

export default TranscribeAudioCommand;