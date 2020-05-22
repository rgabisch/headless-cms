class Content {
    constructor(readonly id: string, private content: { typeId: string; content: string }[]) {
    }

}

export default Content;