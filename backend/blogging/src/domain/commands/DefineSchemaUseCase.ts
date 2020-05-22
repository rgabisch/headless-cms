export class DefineSchemaCommand {
    constructor(public creatorId: string,
                public name: string,
                public types: { id: string, name: string }[]) {
    }
}