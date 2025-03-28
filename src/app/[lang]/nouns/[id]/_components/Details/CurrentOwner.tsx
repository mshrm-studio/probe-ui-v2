import { Dictionary } from '@/app/[lang]/dictionaries';
import AuctionFromSubgraph from '@/utils/dto/Noun/Auction/FromSubgraph';
import styles from '@/app/[lang]/nouns/[id]/_styles/details/current-owner.module.css';
import EthAddress from '@/app/_components/Eth/Address';
import clsx from 'clsx';
import EtherscanLink from '@/app/_components/EtherscanLink';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    auction: AuctionFromSubgraph;
    dict: Dictionary;
}

export default function DetailsWinningBid({ auction, className, dict }: Props) {
    if (auction.noun.owner === undefined) return null;

    return (
        <div className={clsx(className, styles.container)}>
            <span>{dict.noun.details.currentOwner}:</span>

            <span title={auction.noun.owner.id}>
                <EtherscanLink type="Address" address={auction.noun.owner.id}>
                    <EthAddress address={auction.noun.owner.id} />
                </EtherscanLink>
            </span>
        </div>
    );
}
