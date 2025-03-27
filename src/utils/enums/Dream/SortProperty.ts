export enum DreamSortProperty {
    ID = 'id',
}

export const dreamSortProperties = Object.values(DreamSortProperty);

export function isDreamSortProperty(
    value: unknown
): value is DreamSortProperty {
    return (
        typeof value === 'string' &&
        (dreamSortProperties as string[]).includes(value)
    );
}
