abstract class Type {
    protected constructor(readonly id: string) {

    }

    equals(other: Type): boolean {
        return this.id === other.id;
    }
}

class AudioFile extends Type {

}

export default Type