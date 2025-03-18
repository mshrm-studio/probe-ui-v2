export enum LilTraitLayer {
    Accessory = 'accessory',
    Background = 'background',
    Body = 'body',
    Glasses = 'glasses',
    Head = 'head',
}

export const lilTraitLayers = Object.values(LilTraitLayer);

export function isNounTraitLayer(value: unknown): value is LilTraitLayer {
    return (
        typeof value === 'string' &&
        (lilTraitLayers as string[]).includes(value)
    );
}
