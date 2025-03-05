'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import NounList from '@/app/_components/Noun/List/List';
import FetchingImage from '@/app/_components/FetchingImage';
import styles from '@/app/[lang]/nouns/_styles/catalogue.module.css';
import Controls from '@/app/[lang]/nouns/_components/Controls/Controls';
import { FilterDisplayContext } from '@/context/FilterDisplay';
import { useSearchParams } from 'next/navigation';
import NounFromDB from '@/utils/dto/Noun/FromDB';
import ApiPaginationMeta from '@/utils/dto/Api/PaginationMeta';
import { isSortMethod, SortMethod } from '@/utils/enums/SortMethod';
import {
    isNounSortProperty,
    NounSortProperty,
} from '@/utils/enums/Noun/SortProperty';
import NounFilters from '@/utils/dto/Noun/Filters';
import fetchNouns from '@/utils/lib/nouns/list';

export default function NounsCatalogue() {
    const { show: showControls } = useContext(FilterDisplayContext);
    const [error, setError] = useState('');
    const [fetching, setFetching] = useState(false);
    const [meta, setMeta] = useState<ApiPaginationMeta>();
    const [nouns, setNouns] = useState<NounFromDB[]>([]);
    const searchParams = useSearchParams();
    const [page, setPage] = useState(1);
    const accessory = searchParams.get('accessory');
    const body = searchParams.get('body');
    const color = searchParams.get('color');
    const glasses = searchParams.get('glasses');
    const head = searchParams.get('head');
    const sort_method = searchParams.get('sort_method');
    const sort_property = searchParams.get('sort_property');
    const [lastScrollTop, setLastScrollTop] = useState(0);

    useEffect(() => {
        async function doFetch() {
            try {
                setFetching(true);
                setError('');

                const response = await fetchNouns({
                    accessory,
                    body,
                    color,
                    glasses,
                    head,
                    page,
                    sort_method: isSortMethod(sort_method)
                        ? sort_method
                        : SortMethod.Descending,
                    sort_property: isNounSortProperty(sort_property)
                        ? sort_property
                        : NounSortProperty.TokenID,
                });

                setNouns((prev) => [...prev, ...response.data]);
                setMeta(response.meta);
            } catch (err: unknown) {
                setError(String(err));
            } finally {
                setFetching(false);
            }
        }

        doFetch();
    }, [accessory, body, color, glasses, head, page]);

    useEffect(() => {
        const handleScroll = () => {
            if (fetching || !meta) return;

            const tolerance = 300;
            const scrollTop = document.documentElement.scrollTop;
            const scrolled = window.innerHeight + scrollTop;
            const totalHeight = document.documentElement.offsetHeight;

            const isNearBottom = totalHeight - scrolled <= tolerance;
            const isScrollingDown = scrollTop > lastScrollTop;
            setLastScrollTop(scrollTop);

            if (!isNearBottom || !isScrollingDown) return;

            const lastPage = meta.last_page;

            if (page <= meta.current_page && page < lastPage) {
                setPage((prev) => Math.min(prev + 1, lastPage));
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [fetching, lastScrollTop, meta]);

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
