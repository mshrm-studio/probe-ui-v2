import useApi from '@/hooks/useApi';
import DreamFilters from '@/utils/dto/Dream/Filters';
import {
    isDreamFromDBListResponse,
    DreamFromDBListResponse,
} from '@/utils/dto/Dream/FromDB';
import { DreamSortProperty } from '@/utils/enums/Dream/SortProperty';
import { SortMethod } from '@/utils/enums/SortMethod';

export default async function fetchDreams(
    filters?: DreamFilters
): Promise<DreamFromDBListResponse> {
    const api = useApi();

    const params = new URLSearchParams();

    if (filters?.accessory_seed_id)
        params.set('accessory', filters.accessory_seed_id.toString());

    if (filters?.background_seed_id)
        params.set('background', filters.background_seed_id.toString());

    if (filters?.body_seed_id)
        params.set('body_seed_id', filters.body_seed_id.toString());

    if (filters?.glasses_seed_id)
        params.set('glasses', filters.glasses_seed_id.toString());

    if (filters?.head_seed_id)
        params.set('head', filters.head_seed_id.toString());

    if (filters?.search) params.set('search', filters.search);

    params.set('sort_method', filters?.sort_method || SortMethod.Descending);

    params.set(
        'sort_property',
        filters?.sort_property || DreamSortProperty.TokenID
    );

    params.set('page', filters?.page?.toString() || '1');

    params.set('per_page', '300');

    let url = '/dreams';

    if (params) url += `?${params.toString()}`;

    const res = await api.get(url);

    if (!isDreamFromDBListResponse(res.data)) {
        throw new Error('Invalid data');
    }

    return res.data;
}
