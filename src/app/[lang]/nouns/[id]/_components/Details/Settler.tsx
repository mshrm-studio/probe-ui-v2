'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import styles from '@/app/[lang]/nouns/[id]/_styles/details/settler.module.css';
import EthAddress from '@/app/_components/Eth/Address';
import EtherscanLink from '@/app/_components/EtherscanLink';
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
    const settler = useAuctionSettler(blockNumber);

    if (!settler) return null;

    return (
        <div className={clsx(className, styles.container)}>
            <span>{dict.noun.details.settledBy}:</span>

            <span title={settler}>
                <EtherscanLink type="Address" address={settler}>
                    <EthAddress address={settler} />
                </EtherscanLink>
            </span>
        </div>
    );
}
