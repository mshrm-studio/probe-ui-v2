'use client';

import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { DataProxyContext } from '@/context/DataProxy';
import { keccak256, toUtf8Bytes } from 'ethers';
import DreamFromDB, {
    isDreamFromDBWithCustomTrait,
} from '@/utils/dto/Dream/FromDB';

interface ProposalContext {
    isCandidate: boolean;
}

export const ProposalContext = createContext<ProposalContext>({
    isCandidate: false,
});

type Props = {
    children: React.ReactNode;
    dream: DreamFromDB;
};

const ProposalProvider: React.FC<Props> = ({ children, dream }) => {
    const { httpDataProxyContract } = useContext(DataProxyContext);
    const [isCandidate, setIsCandidate] = useState(false);

    useEffect(() => {
        const fetchDreamIsCandidate = async () => {
            if (!isDreamFromDBWithCustomTrait(dream)) {
                setIsCandidate(false);
                return;
            }

            if (!httpDataProxyContract) return;

            const isCandidate = await httpDataProxyContract.propCandidates(
                dream.dreamer,
                keccak256(toUtf8Bytes(`probe-dream-${dream.id}`))
            );

            if (typeof isCandidate !== 'boolean') {
                throw new Error('Invalid response from propCandidate');
            }

            setIsCandidate(isCandidate);
        };

        fetchDreamIsCandidate();
    }, [dream, httpDataProxyContract]);

    return (
        <ProposalContext.Provider
            value={{
                isCandidate,
            }}
        >
            {children}
        </ProposalContext.Provider>
    );
};

export default ProposalProvider;
