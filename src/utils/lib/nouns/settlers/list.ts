import useApi from '@/hooks/useApi';

export default async function fetchSettlers(): Promise<string[]> {
    const api = useApi();

    const res = await api.get('/noun-settlers');

    if (!Array.isArray(res.data)) {
        throw new Error('Invalid data');
    }

    if (!res.data.every((noun) => typeof noun === 'string')) {
        throw new Error('Invalid data');
    }

    return res.data;
}
