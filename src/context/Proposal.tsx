'use client';

import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { DataProxyContext } from '@/context/DataProxy';
import { keccak256, toUtf8Bytes, TransactionResponse } from 'ethers';
import DreamFromDB, {
    isDreamFromDBWithCustomTrait,
} from '@/utils/dto/Dream/FromDB';
import NounProposalCandidateFromSubgraph, {
    isNounProposalCandidateFromSubgraph,
} from '@/utils/dto/Noun/Proposal/Candidate/FromSubgraph';
import NounProposalFromSubgraph, {
    isNounProposalFromSubgraph,
} from '@/utils/dto/Noun/Proposal/FromSubgraph';

interface ProposalContext {
    isCandidate?: boolean;
    proposalCandidate?: NounProposalCandidateFromSubgraph;
    proposal?: NounProposalFromSubgraph;
}

export const ProposalContext = createContext<ProposalContext>({});

type Props = {
    children: React.ReactNode;
    dream: DreamFromDB;
};

const ProposalProvider: React.FC<Props> = ({ children, dream }) => {
    const { httpDataProxyContract } = useContext(DataProxyContext);
    const [isCandidate, setIsCandidate] = useState<boolean>();
    const [proposalCandidate, setProposalCandidate] =
        useState<NounProposalCandidateFromSubgraph>();
    const [proposal, setProposal] = useState<NounProposalFromSubgraph>();

    useEffect(() => {
        if (!isDreamFromDBWithCustomTrait(dream)) {
            setIsCandidate(false);
            return;
        }

        if (!httpDataProxyContract) return;

        const fetchDreamIsCandidate = async () => {
            const isCandidate = await httpDataProxyContract.propCandidates(
                dream.dreamer,
                keccak256(toUtf8Bytes(`probe-dream-${dream.id}`))
            );

            if (typeof isCandidate !== 'boolean') {
                throw new Error('Invalid response from propCandidates');
            }

            setIsCandidate(isCandidate);
        };

        fetchDreamIsCandidate();
    }, [dream, httpDataProxyContract]);

    useEffect(() => {
        if (!isCandidate) return;

        const fetchProposalCandidate = async () => {
            const id = `${dream.dreamer}-probe-dream-${dream.id}`;

            try {
                const response = await fetch(
                    `/api/nouns/subgraph/proposal-candidate?id=${id}`,
                    {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch proposal candidate');
                }

                const { result } = await response.json();

                if (
                    !isNounProposalCandidateFromSubgraph(
                        result.data.proposalCandidate
                    )
                ) {
                    throw new Error('Invalid data');
                }

                setProposalCandidate(result.data.proposalCandidate);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProposalCandidate();
    }, [dream, isCandidate]);

    useEffect(() => {
        if (!proposalCandidate) return;

        const matchingProposalIds =
            proposalCandidate.latestVersion.content.matchingProposalIds;

        if (matchingProposalIds.length === 0) return;

        const fetchProposal = async () => {
            const id = matchingProposalIds[0];

            try {
                const response = await fetch(
                    `/api/nouns/subgraph/proposal?id=${id}`,
                    {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch proposal');
                }

                const { result } = await response.json();

                if (!isNounProposalFromSubgraph(result.data.proposal)) {
                    throw new Error('Invalid data');
                }

                console.log('proposal', result.data.proposal);

                setProposal(result.data.proposal);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProposal();
    }, [proposalCandidate]);

    return (
        <ProposalContext.Provider
            value={{
                isCandidate,
                proposalCandidate,
                proposal,
            }}
        >
            {children}
        </ProposalContext.Provider>
    );
};

export default ProposalProvider;
