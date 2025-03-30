import { Dictionary } from '@/app/[lang]/dictionaries';
import AuctionFromSubgraph from '@/utils/dto/Noun/Auction/FromSubgraph';
import { formatEther } from 'ethers';
import styles from '@/app/[lang]/nouns/[id]/_styles/details/winning-bid.module.css';
import EthAddress from '@/app/_components/Eth/Address';
import clsx from 'clsx';
import LocalisedNumber from '@/app/_components/LocalisedNumber';
import EtherscanLink from '@/app/_components/EtherscanLink';
import AuctionFromContract from '@/utils/dto/Noun/Auction/FromContract';
import { useMemo } from 'react';
import AuctionClient from '@/app/[lang]/nouns/[id]/_components/Details/Auction/Client';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    auction: AuctionFromSubgraph;
    liveAuction: AuctionFromContract | null;
    dict: Dictionary;
}

export default function DetailsAuctionCurrentBid({
    auction,
    className,
    dict,
    liveAuction,
}: Props) {
    const amount = useMemo(
        () =>
            liveAuction
                ? liveAuction.amount
                : auction.amount
                ? formatEther(BigInt(auction.amount))
                : null,
        [liveAuction, auction.amount]
    );

    const bidder = useMemo(
        () =>
            liveAuction
                ? liveAuction.bidder
                : typeof auction.bidder?.id === 'string'
                ? auction.bidder.id
                : null,
        [liveAuction, auction.bidder]
    );

    if (amount === null || bidder === null) return null;

    return (
        <div
            className={clsx(className, styles.container)}
            data-auction={JSON.stringify(auction)}
        >
            <span>{dict.noun.details.auction.currentBid}:</span>

            <span>
                Ξ <LocalisedNumber number={amount} />
            </span>

            {auction.bidder && (
                <>
                    <span>{dict.noun.details.auction.by}</span>

                    <span title={bidder}>
                        <EtherscanLink type="Address" address={bidder}>
                            <EthAddress address={bidder} />
                        </EtherscanLink>
                    </span>

                    <AuctionClient auction={auction} />
                </>
            )}
        </div>
    );
}
