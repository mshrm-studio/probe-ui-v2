'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import AuctionFromSubgraph from '@/utils/dto/Noun/Auction/FromSubgraph';
import Dialog from '@/app/_components/Dialog/Dialog';
import { useMemo, useState } from 'react';
import { formatEther } from 'ethers';
import EthAddress from '@/app/_components/Eth/Address';
import styles from '@/app/[lang]/lils/[id]/_styles/details/auction/bids.module.css';

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
                {dict.lil.details.auction.seeAllBids}
            </button>

            <Dialog
                open={open}
                setOpen={setOpen}
                title={dict.lil.details.auction.allBids}
            >
                <ul>
                    {sortedBids.map((bid) => (
                        <li key={bid.amount} className={styles.listItem}>
                            <span>Ξ {formatEther(BigInt(bid.amount))}</span>

                            <span>{dict.lil.details.auction.by}</span>

                            <span title={bid.bidder.id}>
                                <EthAddress address={bid.bidder.id} />
                            </span>
                        </li>
                    ))}
                </ul>
            </Dialog>
        </div>
    );
}
