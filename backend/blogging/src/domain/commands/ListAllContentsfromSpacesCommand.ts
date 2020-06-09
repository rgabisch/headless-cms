import ContentCommand from "./ContentCommand";

export class ListAllContentsfromSpacesCommand extends ContentCommand {
    constructor(public creatorId: string,
                dateFormat: string | undefined) {
        super(dateFormat)
    }
}