import NounFilters from '@/utils/dto/Noun/Filters';
import {
    isNounFromDBListResponse,
    NounFromDBListResponse,
} from '@/utils/dto/Noun/FromDB';
import { NounSortProperty } from '@/utils/enums/Noun/SortProperty';
import { SortMethod } from '@/utils/enums/SortMethod';

export default async function fetchNouns(
    filters?: NounFilters
): Promise<NounFromDBListResponse> {
    const params = new URLSearchParams();

    if (filters?.accessory) params.set('accessory', filters.accessory);

    if (filters?.body) params.set('body', filters.body);

    if (filters?.color) params.set('color', filters.color);

    if (filters?.glasses) params.set('glasses', filters.glasses);

    if (filters?.head) params.set('head', filters.head);

    params.set('sort_method', filters?.sort_method || SortMethod.Descending);

    params.set(
        'sort_property',
        filters?.sort_property || NounSortProperty.TokenID
    );

    params.set('page', filters?.page?.toString() || '1');

    params.set('per_page', '300');

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    let url = `${baseUrl}/nouns`;

    if (params) url += `?${params.toString()}`;

    const res = await fetch(url);

    const json = await res.json();

    if (!isNounFromDBListResponse(json)) {
        throw new Error('Invalid data');
    }

    return json;
}
