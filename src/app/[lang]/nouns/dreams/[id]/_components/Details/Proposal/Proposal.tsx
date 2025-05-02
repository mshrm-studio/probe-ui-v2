'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import { ProposalContext } from '@/context/Proposal';
import { DreamFromDBWithCustomTrait } from '@/utils/dto/Dream/FromDB';
import { useContext } from 'react';
import EthAddress from '@/app/_components/Eth/Address';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/details/proposal/proposal.module.css';
import Signatures from '@/app/[lang]/nouns/dreams/[id]/_components/Details/Proposal/Signatures/Signatures';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dict: Dictionary;
    dream: DreamFromDBWithCustomTrait;
}

export default function Proposal({ className, dict, dream }: Props) {
    // const { httpDataProxyContract } = useContext(DataProxyContext);

    // addSignature
    // https://etherscan.io/address/0xf790a5f59678dd733fb3de93493a91f472ca1365#writeProxyContract

    const { proposalCandidate } = useContext(ProposalContext);

    if (proposalCandidate) {
        return (
            <div className={className}>
                <Signatures dict={dict} proposalCandidate={proposalCandidate} />
            </div>
        );
    }

    return null;
}
