'use client';

import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
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
import AuctionFromSubgraph, {
    isAuctionFromSubgraphList,
} from '@/utils/dto/Lil/Auction/FromSubgraph';
import useDictionary from '@/hooks/useDictionary';

export default function LilsCatalogue() {
    const dict = useDictionary();
    const { show: showControls } = useContext(FilterDisplayContext);
    const [error, setError] = useState('');
    const [fetching, setFetching] = useState(false);
    const [meta, setMeta] = useState<ApiPaginationMeta>();
    const [lils, setLils] = useState<LilFromDB[]>([]);
    const [auctions, setAuctions] = useState<AuctionFromSubgraph[]>([]);
    const searchParams = useSearchParams();
    const [page, setPage] = useState(1);
    const accessory = searchParams.get('accessory');
    const background = searchParams.get('background');
    const body = searchParams.get('body');
    const color = searchParams.get('color');
    const glasses = searchParams.get('glasses');
    const head = searchParams.get('head');
    const search = searchParams.get('search');
    const sort_method = searchParams.get('sort_method');
    const sort_property = searchParams.get('sort_property');
    const [lastScrollTop, setLastScrollTop] = useState(0);

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

    // useEffect(() => {
    //     const fetchAuctions = async () => {
    //         try {
    //             const response = await fetch('/api/lils/subgraph/auctions', {
    //                 method: 'GET',
    //                 headers: { 'Content-Type': 'application/json' },
    //             });

    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch auctions');
    //             }

    //             const { result } = await response.json();

    //             if (!isAuctionFromSubgraphList(result.data.auctions)) {
    //                 throw new Error('Invalid auction data');
    //             }

    //             setAuctions(result.data.auctions);
    //         } catch (error) {
    //             alert(error);
    //             console.error(error);
    //         }
    //     };

    //     fetchAuctions();
    // }, []);

    const absentAuctions = useMemo(() => {
        if (!accessory && !background && !body && !color && !glasses && !head) {
            const lilTokenIds = new Set(lils.map((n) => n.token_id));

            return auctions.filter(
                (auction) => !lilTokenIds.has(Number(auction.noun.id))
            );
        }

        return [];
    }, [accessory, auctions, background, body, color, glasses, head, lils]);

    return (
        <div>
            {showControls && <Controls className={styles.controlsContainer} />}

            <LilList
                absentAuctions={absentAuctions}
                auctions={auctions}
                dict={dict}
                lils={lils}
            />

            {fetching && (
                <div className={styles.fetchingImgContainer}>
                    <FetchingImage />
                </div>
            )}
        </div>
    );
}
