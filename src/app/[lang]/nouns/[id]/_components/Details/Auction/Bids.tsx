'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import AuctionFromSubgraph from '@/utils/dto/Noun/Auction/FromSubgraph';
import Dialog from '@/app/_components/Dialog/Dialog';
import { useMemo, useState } from 'react';
import { formatEther } from 'ethers';
import EthAddress from '@/app/_components/Eth/Address';
import styles from '@/app/[lang]/nouns/[id]/_styles/details/auction/bids.module.css';
import LocalisedNumber from '@/app/_components/LocalisedNumber';
import EtherscanLink from '@/app/_components/EtherscanLink';
import AuctionClient from '@/app/[lang]/nouns/[id]/_components/Details/Auction/Client';
import LocalisedDateTime from '@/app/_components/LocalisedDateTime';
import { DateTime } from 'luxon';

interface Props {
    auction: AuctionFromSubgraph;
    dict: Dictionary;
}

export default function DetailsAuctionBids({ auction, dict }: Props) {
    const [open, setOpen] = useState(false);

    const sortedBids = useMemo(
        () => auction.bids?.sort((a, b) => Number(b.amount) - Number(a.amount)),
        [auction]
    );

    if (sortedBids === undefined) return null;

    return (
        <div>
            <button
                type="button"
                className={styles.button}
                onClick={() => setOpen(true)}
            >
                {dict.noun.details.auction.seeAllBids}
            </button>

            <Dialog
                open={open}
                setOpen={setOpen}
                title={dict.noun.details.auction.allBids}
            >
                <ul>
                    {sortedBids.map((bid) => (
                        <li key={bid.amount} className={styles.listItem}>
                            <span>
                                Ξ{' '}
                                <LocalisedNumber
                                    number={formatEther(BigInt(bid.amount))}
                                />
                            </span>

                            <span>{dict.noun.details.auction.by}</span>

                            <span title={bid.bidder.id}>
                                <EtherscanLink
                                    type="Address"
                                    address={bid.bidder.id}
                                >
                                    <EthAddress address={bid.bidder.id} />
                                </EtherscanLink>
                            </span>

                            <AuctionClient bid={bid} />

                            {'('}
                            <LocalisedDateTime
                                dateTime={bid.blockTimestamp}
                                format={DateTime.TIME_SIMPLE}
                            />
                            {')'}
                        </li>
                    ))}
                </ul>
            </Dialog>
        </div>
    );
}
