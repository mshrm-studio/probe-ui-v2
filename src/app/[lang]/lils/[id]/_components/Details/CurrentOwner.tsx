import { Dictionary } from '@/app/[lang]/dictionaries';
import AuctionFromSubgraph from '@/utils/dto/Lil/Auction/FromSubgraph';
import styles from '@/app/[lang]/lils/[id]/_styles/details/current-owner.module.css';
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
            <span>{dict.lil.details.currentOwner}:</span>

            <span title={auction.noun.owner.id}>
                <EthAddress address={auction.noun.owner.id} />
            </span>
        </div>
    );
}
