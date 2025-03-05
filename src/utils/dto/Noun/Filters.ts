import { NounSortProperty } from '@/utils/enums/Noun/SortProperty';
import { SortMethod } from '@/utils/enums/SortMethod';

export default interface NounFilters {
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
    sort_property?: NounSortProperty | null;
}
