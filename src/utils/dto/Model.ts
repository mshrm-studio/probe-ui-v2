export default interface Model {
    id: number | string;
    created_at: string;
    updated_at: string;
}

export function isModel(input: unknown): input is Model {
    return (
        typeof input === 'object' &&
        input !== null &&
        'id' in input &&
        typeof input.id === 'number'
    );
}
