'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import Countdown from '@/app/[lang]/nouns/[id]/_components/Details/Auction/Countdown';
import Bids from '@/app/[lang]/nouns/[id]/_components/Details/Auction/Bids';
import CurrentBid from '@/app/[lang]/nouns/[id]/_components/Details/Auction/CurrentBid';
import Form from '@/app/[lang]/nouns/[id]/_components/Details/Auction/Form';
import AuctionFromSubgraph from '@/utils/dto/Noun/Auction/FromSubgraph';
import { DateTime } from 'luxon';
import { useCallback, useEffect, useState } from 'react';
import AuctionHouseProvider from '@/context/AuctionHouse';
import styles from '@/app/[lang]/nouns/[id]/_styles/details/auction/auction.module.css';
import { useParams } from 'next/navigation';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    auction: AuctionFromSubgraph;
    dict: Dictionary;
}

export default function DetailsAuction({ auction, className, dict }: Props) {
    const { lang } = useParams();
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
                const l = lang as string;

                const f = l.startsWith('zh') ? `${l}-u-nu-hanidec` : l;

                const h = new Intl.NumberFormat(f).format(Math.floor(hours));
                const m = new Intl.NumberFormat(f).format(Math.floor(minutes));
                const s = new Intl.NumberFormat(f).format(Math.floor(seconds));

                const timeH = h + dict.noun.details.auction.h;
                const timeM = m + dict.noun.details.auction.m;
                const timeS = s + dict.noun.details.auction.m;

                setTimeRemaining(`${timeH} ${timeM} ${timeS}`);
            } else {
                setTimeRemaining('0');
            }
        }
    }, [auction, dict, lang]);

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

                    <AuctionHouseProvider>
                        <div className={styles.formContainer}>
                            <Form auction={auction} dict={dict} />
                        </div>
                    </AuctionHouseProvider>
                </>
            )}
        </div>
    );
}
