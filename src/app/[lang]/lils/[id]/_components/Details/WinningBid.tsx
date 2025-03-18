import { Dictionary } from '@/app/[lang]/dictionaries';
import AuctionFromSubgraph from '@/utils/dto/Noun/Auction/FromSubgraph';
import { formatEther } from 'ethers';
import styles from '@/app/[lang]/lils/[id]/_styles/details/winning-bid.module.css';
import EthAddress from '@/app/_components/Eth/Address';
import clsx from 'clsx';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    auction: AuctionFromSubgraph;
    dict: Dictionary;
}

export default function DetailsWinningBid({ auction, className, dict }: Props) {
    if (auction.amount === undefined || auction.bidder === undefined)
        return null;

    return (
        <div className={clsx(className, styles.container)}>
            <span>{dict.lil.details.auction.winningBid}:</span>

            <span>Ξ {formatEther(BigInt(auction.amount))}</span>

            <span>{dict.lil.details.auction.by}</span>

            <span title={auction.bidder.id}>
                <EthAddress address={auction.bidder.id} />
            </span>
        </div>
    );
}
