abstract class ContentCommand {
    protected constructor(private _dateFormat: string | undefined = "DD.MM.YY HH:mm") {
    }

    get dateFormat(): string {
        return <string>this._dateFormat
    }
}

export default ContentCommand;