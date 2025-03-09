'use client';

import NounFromDB from '@/utils/dto/Noun/FromDB';
import Colors from '@/app/[lang]/nouns/[id]/_components/Details/Colors';
import Traits from '@/app/[lang]/nouns/[id]/_components/Details/Traits';
import { Dictionary } from '@/app/[lang]/dictionaries';
import styles from '@/app/[lang]/nouns/[id]/_styles/details/details.module.css';
import { useEffect, useState } from 'react';
import AuctionFromSubgraph, {
    isAuctionFromSubgraph,
} from '@/utils/dto/Auction/FromSubgraph';
import WinningBid from '@/app/[lang]/nouns/[id]/_components/Details/WinningBid';
import CurrentOwner from '@/app/[lang]/nouns/[id]/_components/Details/CurrentOwner';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dict: Dictionary;
    noun: NounFromDB;
}

export default function Details({ className, dict, noun }: Props) {
    const [auction, setAuction] = useState<AuctionFromSubgraph>();

    useEffect(() => {
        const fetchAuction = async () => {
            try {
                const response = await fetch(
                    `/api/subgraph/auction?id=${noun.token_id}`,
                    {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch auction');
                }

                const { result } = await response.json();

                if (!isAuctionFromSubgraph(result.data.auction)) {
                    throw new Error('Invalid auction data');
                }

                setAuction(result.data.auction);
            } catch (error) {
                alert(error);
                console.error(error);
            }
        };

        fetchAuction();
    }, []);

    return (
        <div className={className}>
            {auction && auction.settled && (
                <>
                    <WinningBid
                        auction={auction}
                        dict={dict}
                        className={styles.winningBidContainer}
                    />

                    <CurrentOwner
                        auction={auction}
                        dict={dict}
                        className={styles.currentOwnerContainer}
                    />
                </>
            )}

            <Colors
                noun={noun}
                dict={dict}
                className={styles.colorsContainer}
            />

            <Traits noun={noun} dict={dict} />
        </div>
    );
}
