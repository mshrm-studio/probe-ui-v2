'use client';

import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import NounList from '@/app/[lang]/nouns/_components/Noun/List/List';
import FetchingImage from '@/app/_components/FetchingImage';
import styles from '@/app/[lang]/nouns/_styles/catalogue/catalogue.module.css';
import Controls from '@/app/[lang]/nouns/_components/Catalogue/Controls/Controls';
import { FilterDisplayContext } from '@/context/FilterDisplay';
import { useSearchParams } from 'next/navigation';
import NounFromDB from '@/utils/dto/Noun/FromDB';
import ApiPaginationMeta from '@/utils/dto/Api/PaginationMeta';
import { isSortMethod, SortMethod } from '@/utils/enums/SortMethod';
import {
    isNounSortProperty,
    NounSortProperty,
} from '@/utils/enums/Noun/SortProperty';
import fetchNouns from '@/utils/lib/nouns/list';
import AuctionFromSubgraph, {
    isAuctionFromSubgraphList,
} from '@/utils/dto/Noun/Auction/FromSubgraph';
import useCatalogueScroll from '@/hooks/useCatalogueScroll';
import { Dictionary } from '@/app/[lang]/dictionaries';

interface Props {
    dict: Dictionary;
}

export default function NounsCatalogue({ dict }: Props) {
    const { show: showControls } = useContext(FilterDisplayContext);
    const [error, setError] = useState('');
    const [fetching, setFetching] = useState(false);
    const [meta, setMeta] = useState<ApiPaginationMeta>();
    const [nouns, setNouns] = useState<NounFromDB[]>([]);
    const [auctions, setAuctions] = useState<AuctionFromSubgraph[]>([]);
    const searchParams = useSearchParams();
    const accessory = searchParams.get('accessory');
    const background = searchParams.get('background');
    const body = searchParams.get('body');
    const color = searchParams.get('color');
    const glasses = searchParams.get('glasses');
    const head = searchParams.get('head');
    const owner = searchParams.get('owner');
    const search = searchParams.get('search');
    const settler = searchParams.get('settler');
    const sort_method = searchParams.get('sort_method');
    const sort_property = searchParams.get('sort_property');
    const { page } = useCatalogueScroll({ fetching, meta });

    const initFetchNouns = useCallback(
        async (pageNumber?: number) => {
            try {
                setFetching(true);
                setError('');

                const response = await fetchNouns({
                    accessory,
                    background,
                    body,
                    color,
                    glasses,
                    head,
                    owner,
                    page: pageNumber,
                    search,
                    settler,
                    sort_method: isSortMethod(sort_method)
                        ? sort_method
                        : SortMethod.Descending,
                    sort_property: isNounSortProperty(sort_property)
                        ? sort_property
                        : NounSortProperty.TokenID,
                });

                setNouns((prev) => {
                    const newItems = response.data.filter(
                        (newNoun) =>
                            !prev.some(
                                (existingNoun) =>
                                    existingNoun.token_id === newNoun.token_id
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
            owner,
            search,
            settler,
            sort_method,
            sort_property,
        ]
    );

    useEffect(() => {
        setNouns([]);
        initFetchNouns();
    }, [
        accessory,
        background,
        body,
        color,
        glasses,
        head,
        owner,
        search,
        settler,
        sort_method,
        sort_property,
    ]);

    useEffect(() => {
        initFetchNouns(page);
    }, [page]);

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const response = await fetch('/api/nouns/subgraph/auctions', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch auctions');
                }

                const { result } = await response.json();

                if (!isAuctionFromSubgraphList(result.data.auctions)) {
                    throw new Error('Invalid auction data');
                }

                setAuctions(result.data.auctions);
            } catch (error) {
                alert(error);
                console.error(error);
            }
        };

        fetchAuctions();
    }, []);

    const absentAuctions = useMemo(() => {
        const nounTokenIds = new Set(nouns.map((n) => n.token_id));

        return auctions.filter(
            (auction) => !nounTokenIds.has(Number(auction.noun.id))
        );
    }, [auctions, nouns]);

    const listIsFiltered =
        !!accessory ||
        !!background ||
        !!body ||
        !!color ||
        !!glasses ||
        !!head ||
        !!owner ||
        !!search ||
        !!settler;

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {showControls && <Controls className={styles.controlsContainer} />}

            <NounList
                absentAuctions={absentAuctions}
                auctions={auctions}
                isFiltered={listIsFiltered}
                dict={dict}
                nouns={nouns}
            />

            {fetching && (
                <div className={styles.fetchingImgContainer}>
                    <FetchingImage />
                </div>
            )}
        </div>
    );
}
