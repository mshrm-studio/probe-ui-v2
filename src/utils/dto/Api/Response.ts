import { isModel } from '@/utils/dto/Model';
import type ApiPaginationMeta from '@/utils/dto/Api/PaginationMeta';
import { isApiPaginationMeta } from '@/utils/dto/Api/PaginationMeta';

export interface ModelResponse {
    data: unknown;
}

export interface PaginatedModelListResponse {
    data: unknown[];
    meta: ApiPaginationMeta;
}

export function isModelResponse(input: unknown): input is ModelResponse {
    return (
        typeof input === 'object' &&
        input !== null &&
        'data' in input &&
        isModel(input.data)
    );
}

export function isPaginatedModelListResponse(
    input: unknown
): input is PaginatedModelListResponse {
    return (
        typeof input === 'object' &&
        input !== null &&
        'data' in input &&
        Array.isArray(input.data) &&
        input.data.every((item) => isModel(item)) &&
        'meta' in input &&
        isApiPaginationMeta(input.meta)
    );
}
