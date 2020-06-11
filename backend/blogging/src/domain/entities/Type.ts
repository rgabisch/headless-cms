export enum TypeId {
    Text = '1',
    RichText = '2',
    Number = '3',
    Date = '4',
    Image = '5',
    Audio = '6'
}

class Type {
    constructor(readonly id: TypeId) {
    }

    equals(other: Type): boolean {
        return this.id === other.id;
    }

    isText(): boolean {
        return this.id === TypeId.Text;
    }

    isRichText(): boolean {
        return this.id === TypeId.RichText;
    }

    isNumber(): boolean {
        return this.id === TypeId.Number;
    }

    isDate(): boolean {
        return this.id === TypeId.Date;
    }

    isImage(): boolean {
        return this.id === TypeId.Image;
    }

    isAudio(): boolean {
        return this.id === TypeId.Audio;
    }
}

export default Type