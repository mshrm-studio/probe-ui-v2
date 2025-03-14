import { DreamSortProperty } from '@/utils/enums/Dream/SortProperty';
import { SortMethod } from '@/utils/enums/SortMethod';

export default interface DreamFilters {
    accessory_seed_id?: number | string | null;
    background_seed_id?: number | string | null;
    body_seed_id?: number | string | null;
    glasses_seed_id?: number | string | null;
    head_seed_id?: number | string | null;
    page?: number | null;
    search?: string | null;
    sort_method?: SortMethod | null;
    sort_property?: DreamSortProperty | null;
}
