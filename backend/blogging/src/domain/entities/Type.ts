abstract class Type {
    protected constructor(readonly id: string) {

    }

    equals(other: Type): boolean {
        return this.id === other.id;
    }
}

class TextType extends Type {

}

class RichTextType extends Type {

}

class NumberType extends Type {

}

class DateType extends Type {

}

class ImageType extends Type {

}

class AudioType extends Type {

}

export default Type