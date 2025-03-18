import { LilSortProperty } from '@/utils/enums/Lil/SortProperty';
import { SortMethod } from '@/utils/enums/SortMethod';

export default interface LilFilters {
    accessory?: string | null;
    background?: string | null;
    body?: string | null;
    color?: string | null;
    glasses?: string | null;
    head?: string | null;
    page?: number | null;
    per_page?: number | null;
    search?: string | null;
    settler?: string | null;
    sort_method?: SortMethod | null;
    sort_property?: LilSortProperty | null;
}
