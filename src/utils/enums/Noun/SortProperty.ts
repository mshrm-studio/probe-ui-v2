export enum NounSortProperty {
    Area = 'area',
    Colorfulness = 'colorfulness',
    MintedAt = 'minted_at',
    TokenID = 'token_id',
    Weight = 'weight',
}

export const nounSortProperties = Object.values(NounSortProperty);

export function isNounSortProperty(value: unknown): value is NounSortProperty {
    return (
        typeof value === 'string' &&
        (nounSortProperties as string[]).includes(value)
    );
}
