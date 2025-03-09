import { Dictionary } from '@/app/[lang]/dictionaries';
import AuctionFromSubgraph from '@/utils/dto/Auction/FromSubgraph';
import styles from '@/app/[lang]/nouns/[id]/_styles/details/current-owner.module.css';
import EthAddress from '@/app/_components/Eth/Address';
import clsx from 'clsx';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    auction: AuctionFromSubgraph;
    dict: Dictionary;
}

export default function DetailsWinningBid({ auction, className, dict }: Props) {
    if (auction.noun.owner === undefined) return null;

    return (
        <div className={clsx(className, styles.container)}>
            <span>{dict.noun.details.currentOwner}:</span>

            <span>
                <EthAddress address={auction.noun.owner.id} />
            </span>
        </div>
    );
}
