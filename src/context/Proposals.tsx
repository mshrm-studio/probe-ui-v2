'use client';

import { act, useContext, useEffect, useMemo, useState } from 'react';
import { createContext } from 'react';
import DreamFromDB from '@/utils/dto/Dream/FromDB';
import NounProposalCandidateFromSubgraph, {
    isNounProposalCandidateFromSubgraphList,
} from '@/utils/dto/Noun/Proposal/Candidate/FromSubgraph';
import NounProposalFromSubgraph, {
    isNounProposalFromSubgraphList,
} from '@/utils/dto/Noun/Proposal/FromSubgraph';
import { LatestBlockContext } from '@/context/LatestBlock';

export type NounProposalFromSubgraphWithCandidateSlug =
    NounProposalFromSubgraph & {
        candidateSlug: string;
        latestBlockAfterProposalEndBlock?: boolean;
    };

interface Proposals {
    activeProposals?: NounProposalFromSubgraphWithCandidateSlug[];
}

export const ProposalsContext = createContext<Proposals>({});

type Props = {
    children: React.ReactNode;
};

const ProposalProvider: React.FC<Props> = ({ children }) => {
    const [proposalCandidates, setProposalCandidates] =
        useState<NounProposalCandidateFromSubgraph[]>();
    const [proposals, setProposals] = useState<NounProposalFromSubgraph[]>();
    const { number } = useContext(LatestBlockContext);

    const activeProposals = useMemo(() => {
        if (!Array.isArray(proposalCandidates) || !Array.isArray(proposals)) {
            return [];
        }

        const matched: NounProposalFromSubgraphWithCandidateSlug[] = [];

        for (const candidate of proposalCandidates) {
            const matchingIds =
                candidate.latestVersion?.content?.matchingProposalIds ?? [];

            for (const id of matchingIds) {
                const proposalMatch = proposals.find((p) => p.id === id);

                if (proposalMatch) {
                    matched.push({
                        ...proposalMatch,
                        candidateSlug: candidate.slug,
                        latestBlockAfterProposalEndBlock:
                            number !== undefined
                                ? BigInt(number) >
                                  BigInt(proposalMatch.endBlock)
                                : undefined,
                    });
                }
            }
        }

        return matched;
    }, [proposalCandidates, proposals]);

    useEffect(() => {
        const fetchProposalCandidates = async () => {
            try {
                const response = await fetch(
                    `/api/nouns/subgraph/proposal-candidates`,
                    {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch proposal candidates');
                }

                const { result } = await response.json();

                if (
                    !isNounProposalCandidateFromSubgraphList(
                        result.data.proposalCandidates
                    )
                ) {
                    throw new Error('Invalid data');
                }

                console.log(
                    '[context/Proposals] proposalCandidates',
                    result.data.proposalCandidates
                );

                setProposalCandidates(result.data.proposalCandidates);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProposalCandidates();
    }, []);

    useEffect(() => {
        if (!Array.isArray(proposalCandidates)) return;

        if (proposalCandidates.length === 0) return;

        const fetchProposals = async () => {
            try {
                const response = await fetch(`/api/nouns/subgraph/proposals`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch proposals');
                }

                const { result } = await response.json();

                if (!isNounProposalFromSubgraphList(result.data.proposals)) {
                    throw new Error('Invalid data');
                }

                console.log(
                    '[context/Proposals] proposals',
                    result.data.proposals
                );

                setProposals(result.data.proposals);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProposals();
    }, [proposalCandidates]);

    return (
        <ProposalsContext.Provider
            value={{
                activeProposals,
            }}
        >
            {children}
        </ProposalsContext.Provider>
    );
};

export default ProposalProvider;
