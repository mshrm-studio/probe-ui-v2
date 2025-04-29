'use client';

import { useContext, useEffect, useMemo, useState } from 'react';
import { createContext } from 'react';
import { DataProxyContext } from '@/context/DataProxy';
import { Interface, keccak256, toUtf8Bytes, TransactionResponse } from 'ethers';
import DreamFromDB, {
    isDreamFromDBWithCustomTrait,
} from '@/utils/dto/Dream/FromDB';
import { RpcContext } from '@/context/Rpc';
// import { nounsDataProxyContractABI } from '@/utils/contracts/NounsDataProxyContractABI';
import { FETCH_PROPOSAL_CANDIDATE } from '@/utils/lib/nouns/subgraph/proposalCandidate';
import useSubgraphClient from '@/hooks/useSubgraphClient';

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
    const { httpProvider } = useContext(RpcContext);
    const { httpDataProxyContract } = useContext(DataProxyContext);
    const [isCandidate, setIsCandidate] = useState(false);
    const [transaction, setTransaction] = useState<TransactionResponse>();

    const proposalCandidateId = useMemo(
        () => keccak256(toUtf8Bytes(`probe-dream-${dream.id}`)),
        [dream]
    );

    useEffect(() => {
        if (!isDreamFromDBWithCustomTrait(dream)) {
            setIsCandidate(false);
            return;
        }

        if (!httpDataProxyContract || !proposalCandidateId) return;

        const fetchDreamIsCandidate = async () => {
            const isCandidate = await httpDataProxyContract.propCandidates(
                dream.dreamer,
                proposalCandidateId
            );

            console.log(
                'keccak256(toUtf8Bytes(`probe-dream-${dream.id}`))',
                keccak256(toUtf8Bytes(`probe-dream-${dream.id}`))
            );

            console.log(
                'keccak256(toUtf8Bytes(`${dream.dreamer}-probe-dream-${dream.id}`))',
                keccak256(
                    toUtf8Bytes(`${dream.dreamer}-probe-dream-${dream.id}`)
                )
            );

            console.log(
                'keccak256((`probe-dream-${dream.id}-${dream.dreamer}`))',
                keccak256(
                    toUtf8Bytes(`probe-dream-${dream.id}-${dream.dreamer}`)
                )
            );

            if (typeof isCandidate !== 'boolean') {
                throw new Error('Invalid response from propCandidate');
            }

            setIsCandidate(isCandidate);
        };

        fetchDreamIsCandidate();
    }, [dream, httpDataProxyContract, proposalCandidateId]);

    useEffect(() => {
        if (!isCandidate || !proposalCandidateId) return;

        const fetchProposalCandidate = async () => {
            // Moved to API call.
            // environment variables only available there.

            const client = useSubgraphClient();

            const response1 = await client
                .query(FETCH_PROPOSAL_CANDIDATE, { id: proposalCandidateId })
                .toPromise();

            const response2 = await client
                .query(FETCH_PROPOSAL_CANDIDATE, {
                    id: keccak256(
                        toUtf8Bytes(`${dream.dreamer}-probe-dream-${dream.id}`)
                    ),
                })
                .toPromise();

            const response3 = await client
                .query(FETCH_PROPOSAL_CANDIDATE, {
                    id: keccak256(
                        toUtf8Bytes(`probe-dream-${dream.id}-${dream.dreamer}`)
                    ),
                })
                .toPromise();

            keccak256(toUtf8Bytes(`probe-dream-${dream.id}`));

            console.log('FETCH_PROPOSAL_CANDIDATE response1', response1);
            console.log('FETCH_PROPOSAL_CANDIDATE response2', response2);
            console.log('FETCH_PROPOSAL_CANDIDATE response3', response3);
        };

        fetchProposalCandidate();
    }, [isCandidate, proposalCandidateId]);

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
            }}
        >
            {children}
        </ProposalContext.Provider>
    );
};

export default ProposalProvider;
