import { NounTraitLayer } from '@/utils/enums/NounTraitLayer';

export default interface NounTrait {
    name: string;
    layer: NounTraitLayer;
    png_path: string | null;
    rle_data: string | null;
    seed_id: number;
    svg_path: string;
    svg_url: string;
}

export const isNounTrait = (input: unknown): input is NounTrait => {
    return (
        typeof input === 'object' &&
        input !== null &&
        'name' in input &&
        'layer' in input &&
        'seed_id' in input
    );
};

export const isNounTraitList = (input: unknown): input is NounTrait[] => {
    return Array.isArray(input) && input.every((item) => isNounTrait(item));
};
