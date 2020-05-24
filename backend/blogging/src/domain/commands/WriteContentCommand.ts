export class WriteContentCommand {
    constructor(public schemaId: string,
                public creatorId: string,
                public content: { typeId: string; content: string }[]) {
    }
}

export interface WriteContentCommand {
    schemaId: string,
    creatorId: string,
    content: { typeId: string; content: string }[]
}