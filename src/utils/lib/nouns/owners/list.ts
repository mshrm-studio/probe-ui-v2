import useApi from '@/hooks/useApi';

export default async function fetchOwners(): Promise<string[]> {
    const api = useApi();

    const res = await api.get('/noun-owners');

    if (!Array.isArray(res.data)) {
        throw new Error('Invalid data');
    }

    if (!res.data.every((owner) => typeof owner === 'string')) {
        throw new Error('Invalid data');
    }

    return res.data;
}
