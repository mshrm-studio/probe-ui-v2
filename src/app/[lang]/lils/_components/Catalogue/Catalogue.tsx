'use client';

import { useCallback, useContext, useEffect, useState } from 'react';
import LilList from '@/app/[lang]/lils/_components/Lil/List/List';
import FetchingImage from '@/app/_components/FetchingImage';
import styles from '@/app/[lang]/lils/_styles/catalogue/catalogue.module.css';
import Controls from '@/app/[lang]/lils/_components/Catalogue/Controls/Controls';
import { FilterDisplayContext } from '@/context/FilterDisplay';
import { useSearchParams } from 'next/navigation';
import LilFromDB from '@/utils/dto/Lil/FromDB';
import ApiPaginationMeta from '@/utils/dto/Api/PaginationMeta';
import { isSortMethod, SortMethod } from '@/utils/enums/SortMethod';
import {
    isLilSortProperty,
    LilSortProperty,
} from '@/utils/enums/Lil/SortProperty';
import fetchLils from '@/utils/lib/lils/list';
import useCatalogueScroll from '@/hooks/useCatalogueScroll';

export default function LilsCatalogue() {
    const { show: showControls } = useContext(FilterDisplayContext);
    const [error, setError] = useState('');
    const [fetching, setFetching] = useState(false);
    const [meta, setMeta] = useState<ApiPaginationMeta>();
    const [lils, setLils] = useState<LilFromDB[]>([]);
    const searchParams = useSearchParams();
    const accessory = searchParams.get('accessory');
    const background = searchParams.get('background');
    const body = searchParams.get('body');
    const color = searchParams.get('color');
    const glasses = searchParams.get('glasses');
    const head = searchParams.get('head');
    const search = searchParams.get('search');
    const sort_method = searchParams.get('sort_method');
    const sort_property = searchParams.get('sort_property');
    const { page } = useCatalogueScroll({ fetching, meta });

    const initFetchLils = useCallback(
        async (pageNumber?: number) => {
            try {
                setFetching(true);
                setError('');

                const response = await fetchLils({
                    accessory,
                    background,
                    body,
                    color,
                    glasses,
                    head,
                    page: pageNumber,
                    search,
                    sort_method: isSortMethod(sort_method)
                        ? sort_method
                        : SortMethod.Descending,
                    sort_property: isLilSortProperty(sort_property)
                        ? sort_property
                        : LilSortProperty.TokenID,
                });

                setLils((prev) => {
                    const newItems = response.data.filter(
                        (newLil) =>
                            !prev.some(
                                (existingLil) =>
                                    existingLil.token_id === newLil.token_id
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
            color,
            glasses,
            head,
            search,
            sort_method,
            sort_property,
        ]
    );

    useEffect(() => {
        setLils([]);
        initFetchLils();
    }, [
        accessory,
        background,
        body,
        color,
        glasses,
        head,
        search,
        sort_method,
        sort_property,
    ]);

    useEffect(() => {
        initFetchLils(page);
    }, [page]);

    return (
        <div>
            {showControls && <Controls className={styles.controlsContainer} />}

            <LilList lils={lils} />

            {fetching && (
                <div className={styles.fetchingImgContainer}>
                    <FetchingImage />
                </div>
            )}
        </div>
    );
}
