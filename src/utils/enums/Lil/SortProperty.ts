export enum LilSortProperty {
    Area = 'area',
    Colorfulness = 'colorfulness',
    MintedAt = 'minted_at',
    TokenID = 'token_id',
    Weight = 'weight',
}

export const lilSortProperties = Object.values(LilSortProperty);

export function isLilSortProperty(value: unknown): value is LilSortProperty {
    return (
        typeof value === 'string' &&
        (lilSortProperties as string[]).includes(value)
    );
}
