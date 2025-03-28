'use client';

import Comboxbox from '@/app/_components/Combobox/Combobox';
import useDictionary from '@/hooks/useDictionary';
import { useEffect, useMemo, useState } from 'react';
import fetchSettlers from '@/utils/lib/nouns/settlers/list';

interface Props {
    selected: string | null;
    setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SelectNounOwner({ selected, setSelected }: Props) {
    const dict = useDictionary();
    const [error, setError] = useState<any>('');
    const [fetching, setFetching] = useState(false);
    const [settlers, setSettlers] = useState<string[]>([]);

    const initFetchSettlers = async () => {
        console.log('initFetchSettlers');
        try {
            setFetching(true);
            setError('');

            const data = await fetchSettlers();

            console.log('data:', data);

            setSettlers((prev) => {
                const newItems = data.filter(
                    (newSettler) =>
                        !prev.some(
                            (existingSettler) => existingSettler === newSettler
                        )
                );

                return [...prev, ...newItems];
            });
        } catch (err: unknown) {
            setError(String(err));
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        setSettlers([]);
        initFetchSettlers();
    }, []);

    const options = useMemo(() => {
        return settlers.map((settler) => ({
            label: settler,
            value: settler,
        }));
    }, [settlers]);

    if (options.length === 0) return null;

    return (
        <Comboxbox
            label={dict.common.settler}
            options={options}
            selected={selected}
            setSelected={setSelected}
        />
    );
}
