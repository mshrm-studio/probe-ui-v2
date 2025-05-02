'use client';

import { useContext, useEffect, useMemo, useState } from 'react';
import { createContext } from 'react';
import { DataProxyContext } from '@/context/DataProxy';
import { keccak256, toUtf8Bytes, TransactionResponse } from 'ethers';
import DreamFromDB, {
    isDreamFromDBWithCustomTrait,
} from '@/utils/dto/Dream/FromDB';
import { RpcContext } from '@/context/Rpc';
import NounProposalCandidateFromSubgraph, {
    isNounProposalCandidateFromSubgraph,
} from '@/utils/dto/Noun/ProposalCandidate/FromSubgraph';
// import { nounsDataProxyContractABI } from '@/utils/contracts/NounsDataProxyContractABI';

interface ProposalContext {
    isCandidate?: boolean;
    proposalCandidate?: NounProposalCandidateFromSubgraph;
}

export const ProposalContext = createContext<ProposalContext>({});

type Props = {
    children: React.ReactNode;
    dream: DreamFromDB;
};

const ProposalProvider: React.FC<Props> = ({ children, dream }) => {
    const { httpProvider } = useContext(RpcContext);
    const { httpDataProxyContract } = useContext(DataProxyContext);
    const [isCandidate, setIsCandidate] = useState<boolean>();
    const [proposalCandidate, setProposalCandidate] =
        useState<NounProposalCandidateFromSubgraph>();

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
                throw new Error('Invalid response from propCandidate');
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

                console.log('ProposalCandidate response', response);

                if (!response.ok) {
                    throw new Error('Failed to fetch proposal candidate');
                }

                const { result } = await response.json();

                console.log('ProposalCandidate result', result);
                console.log(
                    'ProposalCandidate !isNounProposalCandidateFromSubgraph(result.data.proposalCandidate)',
                    !isNounProposalCandidateFromSubgraph(
                        result.data.proposalCandidate
                    )
                );

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

    // useEffect(() => {
    //     if (!isCandidate || !httpProvider || transaction) return;

    //     console.log('>>>> useEffect');
    //     const fetchDreamTransaction = async () => {
    //         console.log('>>>> getTx');

    //         // TODO: get the transaction hash from the contract
    //         const tx = await httpProvider.getTransaction(
    //             '0x9b7f226659636a35b4a68257e99674bc9a560ddf53244830189e580fc9782567'
    //         );

    //         if (tx) setTransaction(tx);

    //         console.log('tx:', tx);
    //     };

    //     fetchDreamTransaction();
    // }, [isCandidate, httpProvider, transaction]);

    // useEffect(() => {
    //     if (!transaction) return;

    //     // Create an Interface instance with your contract's ABI
    //     const iface = new Interface(nounsDataProxyContractABI);

    //     try {
    //         // Parse the transaction data. Note: include value if relevant.
    //         const parsedTx = iface.parseTransaction({
    //             data: transaction.data,
    //             value: transaction.value,
    //         });

    //         if (!parsedTx) return;

    //         console.log('Decoded transaction data:', parsedTx);

    //         // 1. Extract parameter names
    //         const paramNames = parsedTx.fragment.inputs.map(
    //             (input) => input.name
    //         );

    //         // 2. Extract parameter values
    //         const paramValues = parsedTx.args;

    //         // 3. Combine them into a neat object
    //         const decodedParams: any = {};
    //         for (let i = 0; i < paramNames.length; i++) {
    //             decodedParams[paramNames[i]] = paramValues[i];
    //         }

    //         console.log('Function name:', parsedTx.name);
    //         console.log('Decoded params:', decodedParams);
    //         // parsedTx.name gives the function name (e.g. "createProposalCandidate")
    //         // parsedTx.args contains the decoded arguments
    //     } catch (err) {
    //         console.error('Error decoding transaction data:', err);
    //     }
    // }, [transaction]);

    return (
        <ProposalContext.Provider
            value={{
                isCandidate,
                proposalCandidate,
            }}
        >
            {children}
        </ProposalContext.Provider>
    );
};

export default ProposalProvider;
