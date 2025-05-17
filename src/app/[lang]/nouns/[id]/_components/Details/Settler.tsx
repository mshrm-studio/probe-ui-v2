'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import styles from '@/app/[lang]/nouns/[id]/_styles/details/settler.module.css';
import EthAddress from '@/app/_components/Eth/Address';
import EtherscanLink from '@/app/_components/EtherscanLink';
import LocalisedDateTime from '@/app/_components/LocalisedDateTime';
import useAuctionSettler from '@/hooks/useAuctionSettler';
import useNounMintBlock from '@/hooks/useNounMint';
import clsx from 'clsx';
import { useParams } from 'next/navigation';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dict: Dictionary;
}

export default function DetailsSettler({ className, dict }: Props) {
    const { id } = useParams();
    const { blockNumber } = useNounMintBlock(Number(id));
    const { settledByAddress, settledByTimestamp } =
        useAuctionSettler(blockNumber);

    if (!settledByAddress) return null;

    return (
        <div className={clsx(className, styles.container)}>
            <span>{dict.noun.details.settledBy}:</span>

            <span title={settledByAddress}>
                <EtherscanLink type="Address" address={settledByAddress}>
                    <EthAddress address={settledByAddress} />
                </EtherscanLink>
            </span>

            {settledByTimestamp && (
                <>
                    <span>{dict.noun.details.on}</span>

                    <LocalisedDateTime dateTime={settledByTimestamp} />
                </>
            )}
        </div>
    );
}
