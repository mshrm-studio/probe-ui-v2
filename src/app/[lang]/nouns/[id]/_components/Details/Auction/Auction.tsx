'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import Countdown from '@/app/[lang]/nouns/[id]/_components/Details/Auction/Countdown';
import Bids from '@/app/[lang]/nouns/[id]/_components/Details/Auction/Bids';
import CurrentBid from '@/app/[lang]/nouns/[id]/_components/Details/Auction/CurrentBid';
import Form from '@/app/[lang]/nouns/[id]/_components/Details/Auction/Form';
import AuctionFromSubgraph from '@/utils/dto/Noun/Auction/FromSubgraph';
import { DateTime } from 'luxon';
import { useCallback, useEffect, useState } from 'react';
import styles from '@/app/[lang]/nouns/[id]/_styles/details/auction/auction.module.css';
import { useParams } from 'next/navigation';
import useLiveAuction from '@/hooks/useLiveAuction';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    auction: AuctionFromSubgraph;
    dict: Dictionary;
}

export default function DetailsAuction({ auction, className, dict }: Props) {
    const { lang } = useParams();
    const [timeRemaining, setTimeRemaining] = useState<string>('0');
    const liveAuction = useLiveAuction();

    const calculateTimeRemaining = useCallback(() => {
        const endTime = liveAuction
            ? DateTime.fromSeconds(Number(liveAuction.endTime))
            : DateTime.fromSeconds(Number(auction.endTime));

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

                const h = new Intl.NumberFormat(l).format(Math.floor(hours));
                const m = new Intl.NumberFormat(l).format(Math.floor(minutes));
                const s = new Intl.NumberFormat(l).format(Math.floor(seconds));

                const timeH = h + dict.noun.details.auction.h;
                const timeM = m + dict.noun.details.auction.m;
                const timeS = s + dict.noun.details.auction.s;

                setTimeRemaining(`${timeH} ${timeM} ${timeS}`);
            } else {
                setTimeRemaining('0');
            }
        }
    }, [auction, dict, lang, liveAuction]);

    useEffect(() => {
        calculateTimeRemaining();

        const interval = setInterval(calculateTimeRemaining, 1000);

        return () => clearInterval(interval);
    }, [calculateTimeRemaining]);

    return (
        <div className={className}>
            {timeRemaining !== '0' && (
                <>
                    <Countdown dict={dict} timeRemaining={timeRemaining} />

                    <div className={styles.currentBidContainer}>
                        <CurrentBid
                            auction={auction}
                            liveAuction={liveAuction}
                            dict={dict}
                        />
                    </div>

                    <div className={styles.bidsContainer}>
                        <Bids auction={auction} dict={dict} />
                    </div>

                    {liveAuction && (
                        <div className={styles.formContainer}>
                            <Form auction={liveAuction} dict={dict} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
