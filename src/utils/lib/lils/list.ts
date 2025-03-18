import useApi from '@/hooks/useApi';
import LilFilters from '@/utils/dto/Lil/Filters';
import {
    isLilFromDBListResponse,
    LilFromDBListResponse,
} from '@/utils/dto/Lil/FromDB';
import { LilSortProperty } from '@/utils/enums/Lil/SortProperty';
import { SortMethod } from '@/utils/enums/SortMethod';

export default async function fetchLils(
    filters?: LilFilters
): Promise<LilFromDBListResponse> {
    const api = useApi();

    const params = new URLSearchParams();

    if (filters?.accessory) params.set('accessory', filters.accessory);

    if (filters?.background) params.set('background', filters.background);

    if (filters?.body) params.set('body', filters.body);

    if (filters?.color) params.set('color', filters.color);

    if (filters?.glasses) params.set('glasses', filters.glasses);

    if (filters?.head) params.set('head', filters.head);

    if (filters?.search) params.set('search', filters.search);

    params.set('sort_method', filters?.sort_method || SortMethod.Descending);

    params.set(
        'sort_property',
        filters?.sort_property || LilSortProperty.TokenID
    );

    params.set('page', filters?.page?.toString() || '1');

    params.set('per_page', '300');

    let url = '/lil-nouns';

    if (params) url += `?${params.toString()}`;

    const res = await api.get(url);

    if (!isLilFromDBListResponse(res.data)) {
        throw new Error('Invalid data');
    }

    return res.data;
}
