'use client';

import { useContext, useEffect, useMemo, useState } from 'react';
import { createContext } from 'react';
import { DataProxyContext } from '@/context/DataProxy';
import { keccak256, toUtf8Bytes } from 'ethers';
import DreamFromDB, {
    isDreamFromDBWithCustomTrait,
} from '@/utils/dto/Dream/FromDB';
import NounProposalCandidateFromSubgraph, {
    isNounProposalCandidateFromSubgraph,
} from '@/utils/dto/Noun/Proposal/Candidate/FromSubgraph';
import NounProposalFromSubgraph, {
    isNounProposalFromSubgraph,
} from '@/utils/dto/Noun/Proposal/FromSubgraph';
import { DaoProxyContext } from '@/context//DaoProxy';
import NounProposalFromContract from '@/utils/dto/Noun/Proposal/FromContract';
import { LatestBlockContext } from '@/context/LatestBlock';

interface ProposalContext {
    isCandidate?: boolean;
    latestBlockAfterProposalEndBlock?: boolean;
    proposalCandidate?: NounProposalCandidateFromSubgraph;
    proposal?: NounProposalFromSubgraph;
}

export const ProposalContext = createContext<ProposalContext>({});

type Props = {
    children: React.ReactNode;
    dream: DreamFromDB;
};

const ProposalProvider: React.FC<Props> = ({ children, dream }) => {
    const { httpDaoProxyContract } = useContext(DaoProxyContext);
    const { httpDataProxyContract } = useContext(DataProxyContext);
    const [isCandidate, setIsCandidate] = useState<boolean>();
    const [proposalCandidate, setProposalCandidate] =
        useState<NounProposalCandidateFromSubgraph>();
    const [proposal, setProposal] = useState<NounProposalFromSubgraph>();
    const [proposalFromContract, setProposalFromContract] =
        useState<NounProposalFromContract>();
    const { number } = useContext(LatestBlockContext);

    useEffect(() => {
        console.log(
            '[context/Proposal] proposalFromContract:',
            proposalFromContract
        );
    }, [proposalFromContract]);

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

        const fetchProposalFromSubgraph = async () => {
            const id = matchingProposalIds[0];

            console.log(
                '[context/Proposal] Fetching proposal from subgraph for id:',
                id
            );

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

                console.log('[context/Proposal] subgraph result:', result);

                console.log(
                    '[context/Proposal] subgraph proposal:',
                    result.data.proposal
                );

                setProposal(result.data.proposal);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProposalFromSubgraph();
    }, [proposalCandidate]);

    useEffect(() => {
        if (!proposalCandidate) return;

        if (!httpDaoProxyContract) return;

        const matchingProposalIds =
            proposalCandidate.latestVersion.content.matchingProposalIds;

        if (matchingProposalIds.length === 0) return;

        const fetchProposalFromContract = async () => {
            const id = matchingProposalIds[0];

            console.log(
                '[context/Proposal] Fetching proposal from contract for id:',
                id
            );

            try {
                const response = await httpDaoProxyContract.proposalsV3(
                    Number(id)
                );

                console.log(
                    '[context/Proposal] contract proposalsV3 response:',
                    response
                );

                setProposalFromContract({
                    id: response[0],
                    proposer: response[1],
                    proposalThreshold: response[2],
                    quorumVotes: response[3],
                    eta: response[4],
                    startBlock: response[5],
                    endBlock: response[6],
                    forVotes: response[7],
                    againstVotes: response[8],
                    abstainVotes: response[9],
                    canceled: response[10],
                    vetoed: response[11],
                    executed: response[12],
                    totalSupply: response[13],
                    creationBlock: response[14],
                    signers: response[15],
                    updatePeriodEndBlock: response[16],
                    objectionPeriodEndBlock: response[17],
                    executeOnTimelockV1: response[18],
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchProposalFromContract();
    }, [httpDaoProxyContract, proposalCandidate]);

    const latestBlockAfterProposalEndBlock = useMemo(() => {
        if (
            typeof proposal?.endBlock !== 'string' ||
            typeof number !== 'number'
        )
            return undefined;

        return BigInt(number) > BigInt(proposal.endBlock);
    }, [number, proposal]);

    return (
        <ProposalContext.Provider
            value={{
                isCandidate,
                latestBlockAfterProposalEndBlock,
                proposalCandidate,
                proposal,
            }}
        >
            {children}
        </ProposalContext.Provider>
    );
};

export default ProposalProvider;
