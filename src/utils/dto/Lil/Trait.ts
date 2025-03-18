import { LilTraitLayer } from '@/utils/enums/Lil/TraitLayer';

export default interface LilTrait {
    name: string;
    layer: LilTraitLayer;
    png_path: string | null;
    rle_data: string | null;
    seed_id: number;
    svg_path: string;
    svg_url: string;
}

export const isLilTrait = (input: unknown): input is LilTrait => {
    return (
        typeof input === 'object' &&
        input !== null &&
        'name' in input &&
        'layer' in input &&
        'seed_id' in input
    );
};

export const isLilTraitList = (input: unknown): input is LilTrait[] => {
    return Array.isArray(input) && input.every((item) => isLilTrait(item));
};
