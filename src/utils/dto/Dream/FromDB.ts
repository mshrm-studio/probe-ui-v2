import { isObject } from 'lodash';
import {
    isModelResponse,
    isPaginatedModelListResponse,
    PaginatedModelListResponse,
} from '@/utils/dto/Api/Response';
import { NounTraitLayer } from '@/utils/enums/Noun/TraitLayer';

export default interface DreamFromDB {
    id: number;
    accessory_seed_id: number | null;
    accessory?: string | null;
    background_seed_id: number | null;
    background?: string | null;
    body_seed_id: number | null;
    body?: string | null;
    created_at: string;
    custom_trait_image: string | null;
    custom_trait_image_url?: string | null;
    custom_trait_layer: Exclude<
        NounTraitLayer,
        NounTraitLayer.Background
    > | null;
    dreamer: string;
    glasses_seed_id: number | null;
    glasses?: string | null;
    head_seed_id: number | null;
    head?: string | null;
}

export interface DreamFromDBResponse {
    data: DreamFromDB;
}

export interface DreamFromDBListResponse
    extends Omit<PaginatedModelListResponse, 'data'> {
    data: DreamFromDB[];
}

export const isDreamFromDB = (i: unknown): i is DreamFromDB => {
    return isObject(i) && 'accessory_seed_id' in i;
};

export const isDreamFromDBList = (i: unknown): i is DreamFromDB[] => {
    return Array.isArray(i) && i.every((item) => isDreamFromDB(item));
};

export const isDreamFromDBResponse = (i: unknown): i is DreamFromDBResponse => {
    return isModelResponse(i) && isDreamFromDB(i.data);
};

export const isDreamFromDBListResponse = (
    i: unknown
): i is DreamFromDBListResponse => {
    return isPaginatedModelListResponse(i) && isDreamFromDBList(i.data);
};
