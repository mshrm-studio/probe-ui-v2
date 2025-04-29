import isObject from 'lodash/isObject';
import {
    isModelResponse,
    isPaginatedModelListResponse,
    PaginatedModelListResponse,
} from '@/utils/dto/Api/Response';

export default interface LilFromDB {
    area: number | null;
    accessory_index: number;
    accessory_name: string;
    background_index: number;
    background_name: string;
    block_number: string;
    body_index: number;
    body_name: string;
    color_histogram: Record<string, number> | null;
    glasses_index: number;
    glasses_name: string;
    head_index: number;
    head_name: string;
    minted_at: string;
    png_path: string | null;
    png_url: string | null;
    svg_path: string | null;
    svg_url: string | null;
    token_id: number;
    token_uri?: string | null;
    weight: number | null;
}

export interface LilFromDBResponse {
    data: LilFromDB;
}

export interface LilFromDBListResponse
    extends Omit<PaginatedModelListResponse, 'data'> {
    data: LilFromDB[];
}

export const isLilFromDB = (i: unknown): i is LilFromDB => {
    return isObject(i) && 'token_id' in i && 'accessory_index' in i;
};

export const isLilFromDBList = (i: unknown): i is LilFromDB[] => {
    return Array.isArray(i) && i.every((item) => isLilFromDB(item));
};

export const isLilFromDBResponse = (i: unknown): i is LilFromDBResponse => {
    return isModelResponse(i) && isLilFromDB(i.data);
};

export const isLilFromDBListResponse = (
    i: unknown
): i is LilFromDBListResponse => {
    return isPaginatedModelListResponse(i) && isLilFromDBList(i.data);
};
