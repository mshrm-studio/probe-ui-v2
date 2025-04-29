'use client';

import { ProposalContext } from '@/context/Proposal';
import { DreamFromDBWithCustomTrait } from '@/utils/dto/Dream/FromDB';
import { useContext, useEffect } from 'react';

interface Props {
    dream: DreamFromDBWithCustomTrait;
}

export default function Proposal({ dream }: Props) {
    // const { httpDataProxyContract } = useContext(DataProxyContext);

    const { isCandidate } = useContext(ProposalContext);

    // addSignature
    // https://etherscan.io/address/0xf790a5f59678dd733fb3de93493a91f472ca1365#writeProxyContract

    return <div>isCandidate: {isCandidate ? 'true' : 'false'}</div>;
}
