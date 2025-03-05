import { isObject } from 'lodash';
import {
    isModelResponse,
    isPaginatedModelListResponse,
    PaginatedModelListResponse,
} from '@/utils/dto/Api/Response';

export default interface NounFromDB {
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

export interface NounFromDBResponse {
    data: NounFromDB;
}

export interface NounFromDBListResponse
    extends Omit<PaginatedModelListResponse, 'data'> {
    data: NounFromDB[];
}

export const isNounFromDB = (i: unknown): i is NounFromDB => {
    return isObject(i) && 'token_id' in i && 'accessory_index' in i;
};

export const isNounFromDBList = (i: unknown): i is NounFromDB[] => {
    return Array.isArray(i) && i.every((item) => isNounFromDB(item));
};

export const isNounFromDBResponse = (i: unknown): i is NounFromDBResponse => {
    return isModelResponse(i) && isNounFromDB(i.data);
};

export const isNounFromDBListResponse = (
    i: unknown
): i is NounFromDBListResponse => {
    return isPaginatedModelListResponse(i) && isNounFromDBList(i.data);
};
