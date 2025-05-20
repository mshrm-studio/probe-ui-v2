'use client';

import { useCallback, useContext, useEffect, useState } from 'react';
import FetchingImage from '@/app/_components/FetchingImage';
import { FilterDisplayContext } from '@/context/FilterDisplay';
import { useSearchParams } from 'next/navigation';
import ApiPaginationMeta from '@/utils/dto/Api/PaginationMeta';
import { isSortMethod, SortMethod } from '@/utils/enums/SortMethod';
import useCatalogueScroll from '@/hooks/useCatalogueScroll';
import styles from '@/app/[lang]/nouns/dreams/_styles/catalogue/catalogue.module.css';
import {
    DreamSortProperty,
    isDreamSortProperty,
} from '@/utils/enums/Dream/SortProperty';
import DreamFromDB from '@/utils/dto/Dream/FromDB';
import fetchDreams from '@/utils/lib/nouns/dreams/list';
import DreamList from '@/app/[lang]/nouns/dreams/_components/Dream/List/List';
import Controls from '@/app/[lang]/nouns/dreams/_components/Catalogue/Controls/Controls';
import { ProposalsContext } from '@/context/Proposals';

export default function DreamsCatalogue() {
    const { show: showControls } = useContext(FilterDisplayContext);
    const [error, setError] = useState('');
    const [fetching, setFetching] = useState(false);
    const [meta, setMeta] = useState<ApiPaginationMeta>();
    const [dreams, setDreams] = useState<DreamFromDB[]>([]);
    const searchParams = useSearchParams();
    const accessory = searchParams.get('accessory');
    const background = searchParams.get('background');
    const body = searchParams.get('body');
    const glasses = searchParams.get('glasses');
    const head = searchParams.get('head');
    const search = searchParams.get('search');
    const sort_method = searchParams.get('sort_method');
    const sort_property = searchParams.get('sort_property');
    const { page } = useCatalogueScroll({ fetching, meta });
    const { activeProposals } = useContext(ProposalsContext);

    const initFetchDreams = useCallback(
        async (pageNumber?: number) => {
            try {
                setFetching(true);
                setError('');

                const response = await fetchDreams({
                    accessory_seed_id: accessory,
                    background_seed_id: background,
                    body_seed_id: body,
                    glasses_seed_id: glasses,
                    head_seed_id: head,
                    page: pageNumber,
                    search,
                    sort_method: isSortMethod(sort_method)
                        ? sort_method
                        : SortMethod.Descending,
                    sort_property: isDreamSortProperty(sort_property)
                        ? sort_property
                        : DreamSortProperty.ID,
                });

                setDreams((prev) => {
                    const newItems = response.data.filter(
                        (newDream) =>
                            !prev.some(
                                (existingDream) =>
                                    existingDream.id === newDream.id
                            )
                    );

                    return [...prev, ...newItems];
                });

                setMeta(response.meta);
            } catch (err: unknown) {
                setError(String(err));
            } finally {
                setFetching(false);
            }
        },
        [
            accessory,
            background,
            body,
            glasses,
            head,
            search,
            sort_method,
            sort_property,
        ]
    );

    useEffect(() => {
        setDreams([]);
        initFetchDreams();
    }, [
        accessory,
        background,
        body,
        glasses,
        head,
        search,
        sort_method,
        sort_property,
    ]);

    useEffect(() => {
        initFetchDreams(page);
    }, [page]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {showControls && <Controls className={styles.controlsContainer} />}

            <DreamList activeProposals={activeProposals} dreams={dreams} />

            {fetching && (
                <div className={styles.fetchingImgContainer}>
                    <FetchingImage />
                </div>
            )}
        </div>
    );
}
