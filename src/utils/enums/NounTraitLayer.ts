export enum NounTraitLayer {
    Accessory = 'accessory',
    Background = 'background',
    Body = 'body',
    Glasses = 'glasses',
    Head = 'head',
}

export const nounTraitLayers = Object.values(NounTraitLayer);

export function isNounTraitLayer(value: unknown): value is NounTraitLayer {
    return (
        typeof value === 'string' &&
        (nounTraitLayers as string[]).includes(value)
    );
}
