'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import Countdown from '@/app/[lang]/nouns/[id]/_components/Details/Auction/Countdown';
import Bids from '@/app/[lang]/nouns/[id]/_components/Details/Auction/Bids';
import CurrentBid from '@/app/[lang]/nouns/[id]/_components/Details/Auction/CurrentBid';
import Form from '@/app/[lang]/nouns/[id]/_components/Details/Auction/Form';
import AuctionFromSubgraph from '@/utils/dto/Auction/FromSubgraph';
import { DateTime } from 'luxon';
import { useCallback, useEffect, useState } from 'react';
import RpcProvider from '@/context/Rpc';
import AuctionHouseProvider from '@/context/AuctionHouse';
import styles from '@/app/[lang]/nouns/[id]/_styles/details/auction/auction.module.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    auction: AuctionFromSubgraph;
    dict: Dictionary;
}

export default function DetailsAuction({ auction, className, dict }: Props) {
    const [timeRemaining, setTimeRemaining] = useState<string>('0');

    const calculateTimeRemaining = useCallback(() => {
        const endTime = DateTime.fromSeconds(Number(auction.endTime));

        const timeDifference = endTime.diff(DateTime.now(), [
            'hours',
            'minutes',
            'seconds',
        ]);

        if (timeDifference.as('seconds') <= 0) {
            setTimeRemaining('0');
        } else {
            const { hours, minutes, seconds } = timeDifference.toObject();

            if (
                typeof hours === 'number' &&
                typeof minutes === 'number' &&
                typeof seconds === 'number'
            ) {
                setTimeRemaining(
                    `${Math.floor(hours)}H ${Math.floor(minutes)}M ${Math.floor(
                        seconds
                    )}S`
                );
            } else {
                setTimeRemaining('0');
            }
        }
    }, [auction]);

    useEffect(() => {
        calculateTimeRemaining();

        const interval = setInterval(calculateTimeRemaining, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={className}>
            {timeRemaining !== '0' && (
                <>
                    <Countdown dict={dict} timeRemaining={timeRemaining} />

                    <div className={styles.currentBidContainer}>
                        <CurrentBid auction={auction} dict={dict} />
                    </div>

                    <div className={styles.bidsContainer}>
                        <Bids auction={auction} dict={dict} />
                    </div>

                    <RpcProvider>
                        <AuctionHouseProvider>
                            <div className={styles.formContainer}>
                                <Form auction={auction} dict={dict} />
                            </div>
                        </AuctionHouseProvider>
                    </RpcProvider>
                </>
            )}
        </div>
    );
}
