'use client';

import NounFromSubgraph, {
    isNounFromSubgraphList,
} from '@/utils/dto/Noun/FromSubgraph';
import { useContext, useEffect, useState } from 'react';
import NounList from '@/app/_components/Noun/List/List';
import FetchingImage from '@/app/_components/FetchingImage';
import styles from '@/app/[lang]/nouns/_styles/catalogue.module.css';
import Controls from '@/app/[lang]/nouns/_components/Controls/Controls';
import { FilterDisplayContext } from '@/context/FilterDisplay';
import { useSearchParams } from 'next/navigation';
import { ImageData } from '@noundry/nouns-assets';

export default function NounsCatalogue() {
    const { show: showControls } = useContext(FilterDisplayContext);
    const [error, setError] = useState('');
    const [fetching, setFetching] = useState(false);
    const [idsError, setIdsError] = useState('');
    const [fetchingIds, setFetchingIds] = useState(false);
    const [nouns, setNouns] = useState<NounFromSubgraph[]>([]);
    const searchParams = useSearchParams();
    const { images } = ImageData;
    const [idIn, setIdIn] = useState<number[]>([]);
    const accessory = searchParams.get('accessory');
    const color = searchParams.get('color');
    const body = searchParams.get('body');
    const glasses = searchParams.get('glasses');
    const head = searchParams.get('head');

    useEffect(() => {
        async function fetchNouns() {
            try {
                setFetchingIds(true);
                setIdsError('');

                const params = new URLSearchParams();

                if (color) params.set('color', color);

                params.set('per_page', '300');

                params.set('select', 'token_id');

                const res = await fetch(
                    `${
                        process.env.NEXT_PUBLIC_API_URL
                    }/nouns?${params.toString()}`
                );

                const { data } = await res.json();

                if (
                    Array.isArray(data) &&
                    data.every(
                        (item) =>
                            typeof item === 'object' &&
                            item !== null &&
                            'token_id' in item
                    )
                ) {
                    setIdIn(data.map((item) => item.token_id));
                } else {
                    throw new Error('Invalid data');
                }
            } catch (err: unknown) {
                setIdsError(String(err));
            } finally {
                setFetchingIds(false);
            }
        }

        if (color) {
            fetchNouns();
        } else {
            setIdIn([]);
        }
    }, [color]);

    useEffect(() => {
        setNouns([]);
    }, [accessory, body, glasses, head, idIn]);

    useEffect(() => {
        async function fetchNouns() {
            try {
                setFetching(true);
                setError('');

                const params = new URLSearchParams();

                params.set('skip', nouns.length.toString());

                const accessoryIndex = images.accessories.findIndex(
                    (acc) => acc.filename === accessory
                );

                const bodyIndex = images.bodies.findIndex(
                    (acc) => acc.filename === body
                );

                const glassesIndex = images.glasses.findIndex(
                    (acc) => acc.filename === glasses
                );

                const headIndex = images.heads.findIndex(
                    (acc) => acc.filename === head
                );

                if (accessoryIndex > -1)
                    params.set('accessory', accessoryIndex.toString());

                if (bodyIndex > -1) params.set('body', bodyIndex.toString());

                if (glassesIndex > -1)
                    params.set('glasses', glassesIndex.toString());

                if (headIndex > -1) params.set('head', headIndex.toString());

                if (idIn.length > 0) params.set('idIn', idIn.join('-'));

                const res = await fetch(
                    `/api/subgraph/nouns?${params.toString()}`
                );

                const response = await res.json();

                if (!res.ok) {
                    throw new Error(response?.error);
                }

                if (!isNounFromSubgraphList(response?.result?.data?.nouns)) {
                    throw new Error('Invalid data');
                }

                setNouns((prev) => {
                    const merged = [...prev, ...response.result.data.nouns];

                    const seen = new Set();

                    const deduped = merged.filter((item) => {
                        if (seen.has(item.id)) return false;
                        seen.add(item.id);
                        return true;
                    });

                    return deduped.sort((a, b) => Number(b.id) - Number(a.id));
                });
            } catch (err: unknown) {
                setError(String(err));
            } finally {
                setFetching(false);
            }
        }

        if (!fetchingIds && !fetching) fetchNouns();
    }, [nouns.length]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {showControls && <Controls />}

            <NounList nouns={nouns} />

            {fetching && (
                <div className={styles.fetchingImgContainer}>
                    <FetchingImage />
                </div>
            )}
        </div>
    );
}
