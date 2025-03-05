export enum SortMethod {
    Ascending = 'asc',
    Descending = 'desc',
}

export const sortMethods = Object.values(SortMethod);

export function isSortMethod(value: unknown): value is SortMethod {
    return (
        typeof value === 'string' && (sortMethods as string[]).includes(value)
    );
}
