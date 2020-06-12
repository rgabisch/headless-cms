class BufferTransformer {

    constructor(){
        
    }

    bufferToString(buffer: Buffer): string {
        return buffer.toString('utf-8');
    }

    stringToBuffer(string: string): Buffer {
        return Buffer.from(string, 'utf-8');
    }

    bufferToJson(buffer:Buffer): Object {
        return JSON.parse(this.bufferToString(buffer))
    }

    jsonToBuffer(object:object): Buffer {
        return this.stringToBuffer(JSON.stringify(object))
    }
    
}

export default BufferTransformer