import { Dictionary } from '@/app/[lang]/dictionaries';
import AuctionFromSubgraph from '@/utils/dto/Auction/FromSubgraph';
import { formatEther } from 'ethers';
import styles from '@/app/[lang]/nouns/[id]/_styles/details/winning-bid.module.css';
import EthAddress from '@/app/_components/Eth/Address';
import clsx from 'clsx';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    auction: AuctionFromSubgraph;
    dict: Dictionary;
}

export default function DetailsAuctionCurrentBid({
    auction,
    className,
    dict,
}: Props) {
    if (auction.amount === undefined || auction.bidder === undefined)
        return null;

    return (
        <div className={clsx(className, styles.container)}>
            <span>{dict.noun.details.auction.currentBid}:</span>

            <span>Ξ {formatEther(BigInt(auction.amount))}</span>

            {auction.bidder && (
                <>
                    <span>{dict.noun.details.auction.by}</span>

                    <span title={auction.bidder.id}>
                        <EthAddress address={auction.bidder.id} />
                    </span>
                </>
            )}
        </div>
    );
}
