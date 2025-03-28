import { Dictionary } from '@/app/[lang]/dictionaries';
import AuctionFromSubgraph from '@/utils/dto/Noun/Auction/FromSubgraph';
import { formatEther } from 'ethers';
import styles from '@/app/[lang]/nouns/[id]/_styles/details/winning-bid.module.css';
import EthAddress from '@/app/_components/Eth/Address';
import clsx from 'clsx';
import LocalisedNumber from '@/app/_components/LocalisedNumber';
import EtherscanLink from '@/app/_components/EtherscanLink';

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

            <span>
                Ξ{' '}
                <LocalisedNumber number={formatEther(BigInt(auction.amount))} />
            </span>

            {auction.bidder && (
                <>
                    <span>{dict.noun.details.auction.by}</span>

                    <span title={auction.bidder.id}>
                        <EtherscanLink
                            type="Address"
                            address={auction.bidder.id}
                        >
                            <EthAddress address={auction.bidder.id} />
                        </EtherscanLink>
                    </span>
                </>
            )}
        </div>
    );
}
