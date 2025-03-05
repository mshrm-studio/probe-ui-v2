export default interface ApiPaginationMeta {
    current_page: number;
    from: number | null;
    last_page: number;
    per_page: number;
    to: number | null;
    total: number;
}

export function isApiPaginationMeta(
    input?: unknown
): input is ApiPaginationMeta {
    return (
        typeof input === 'object' &&
        input !== null &&
        'current_page' in input &&
        typeof input.current_page === 'number' &&
        'from' in input &&
        'last_page' in input &&
        typeof input.last_page === 'number' &&
        'per_page' in input &&
        typeof input.per_page === 'number' &&
        'to' in input &&
        'total' in input &&
        typeof input.total === 'number'
    );
}
