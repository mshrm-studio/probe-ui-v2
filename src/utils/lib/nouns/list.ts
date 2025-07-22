import useApi from '@/hooks/useApi';
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
    const api = useApi();

    const params = new URLSearchParams();

    if (filters?.accessory) params.set('accessory', filters.accessory);

    if (filters?.background) params.set('background', filters.background);

    if (filters?.body) params.set('body', filters.body);

    if (filters?.color) params.set('color', filters.color);

    if (filters?.glasses) params.set('glasses', filters.glasses);

    if (filters?.head) params.set('head', filters.head);

    if (filters?.owner) params.set('owner', filters.owner);

    if (filters?.search) params.set('search', filters.search);

    if (filters?.settler) params.set('settler', filters.settler);

    params.set('sort_method', filters?.sort_method || SortMethod.Descending);

    params.set(
        'sort_property',
        filters?.sort_property || NounSortProperty.TokenID
    );

    params.set('page', filters?.page?.toString() || '1');

    params.set('per_page', '300');

    let url = '/nouns';

    if (params) url += `?${params.toString()}`;

    const res = await api.get(url);

    if (!isNounFromDBListResponse(res.data)) {
        throw new Error('Invalid data');
    }

    return res.data;
}
