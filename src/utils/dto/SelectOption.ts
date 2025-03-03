import { EncodedImage } from '@nouns/sdk';

export default interface SelectOption<ValueType> {
    encodedImage?: EncodedImage;
    imgSrc?: string;
    label: string;
    value: ValueType;
}
