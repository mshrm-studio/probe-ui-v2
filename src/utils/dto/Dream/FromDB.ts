import isObject from 'lodash/isObject';
import {
    isModelResponse,
    isPaginatedModelListResponse,
    PaginatedModelListResponse,
} from '@/utils/dto/Api/Response';
import { NounTraitLayer } from '@/utils/enums/Noun/TraitLayer';
import NounTrait from '@/utils/dto/Noun/Trait';

interface BaseDreamFromDB {
    id: number;
    background_seed_id: number;
    background: NounTrait;
    created_at: string;
    dreamer: string;
}

interface DreamFromDBWithCustomAccessory {
    accessory_seed_id: null;
    accessory: null;
    custom_trait_image: string;
    custom_trait_image_url: string;
    custom_trait_layer: NounTraitLayer.Accessory;
    body_seed_id: number;
    body: NounTrait;
    glasses_seed_id: number;
    glasses: NounTrait;
    head_seed_id: number;
    head: NounTrait;
}

interface DreamFromDBWithCustomBody {
    accessory_seed_id: number;
    accessory: NounTrait;
    body_seed_id: null;
    body: null;
    custom_trait_image: string;
    custom_trait_image_url: string;
    custom_trait_layer: NounTraitLayer.Body;
    glasses_seed_id: number;
    glasses: NounTrait;
    head_seed_id: number;
    head: NounTrait;
}

interface DreamFromDBWithCustomGlasses {
    accessory_seed_id: number;
    accessory: NounTrait;
    body_seed_id: number;
    body: NounTrait;
    custom_trait_image: string;
    custom_trait_image_url: string;
    custom_trait_layer: NounTraitLayer.Glasses;
    glasses_seed_id: null;
    glasses: null;
    head_seed_id: number;
    head: NounTrait;
}

interface DreamFromDBWithCustomHead {
    accessory_seed_id: number;
    accessory: NounTrait;
    body_seed_id: number;
    body: NounTrait;
    custom_trait_image: string;
    custom_trait_image_url: string;
    custom_trait_layer: NounTraitLayer.Head;
    glasses_seed_id: number;
    glasses: NounTrait;
    head_seed_id: null;
    head: null;
}

interface DreamFromDBWithNoCustomTrait {
    accessory_seed_id: number;
    accessory: NounTrait;
    body_seed_id: number;
    body: NounTrait;
    custom_trait_image: null;
    custom_trait_image_url: null | undefined;
    custom_trait_layer: null;
    glasses_seed_id: number;
    glasses: NounTrait;
    head_seed_id: number;
    head: NounTrait;
}

type DreamFromDB = BaseDreamFromDB &
    (
        | DreamFromDBWithCustomAccessory
        | DreamFromDBWithCustomBody
        | DreamFromDBWithCustomGlasses
        | DreamFromDBWithCustomHead
        | DreamFromDBWithNoCustomTrait
    );

export default DreamFromDB;

export interface DreamFromDBResponse {
    data: DreamFromDB;
}

export interface DreamFromDBListResponse
    extends Omit<PaginatedModelListResponse, 'data'> {
    data: DreamFromDB[];
}

export const isDreamFromDB = (i: unknown): i is DreamFromDB => {
    return isObject(i) && 'dreamer' in i;
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
