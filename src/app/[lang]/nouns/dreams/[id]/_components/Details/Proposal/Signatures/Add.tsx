'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import NounProposalCandidateFromSubgraph from '@/utils/dto/Noun/ProposalCandidate/FromSubgraph';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/details/proposal/signatures/add.module.css';
import Button from '@/app/_components/Button';
import clsx from 'clsx';
import { BrowserProvider, Contract, Eip1193Provider } from 'ethers';
import {
    useAppKit,
    useAppKitAccount,
    useAppKitProvider,
} from '@reown/appkit/react';
import { DataProxyContext } from '@/context/DataProxy';
import { useContext } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dict: Dictionary;
    proposalCandidate: NounProposalCandidateFromSubgraph;
}

export default function SignatureList({
    className,
    dict,
    proposalCandidate,
}: Props) {
    const { address, isConnected } = useAppKitAccount();
    const { open } = useAppKit();
    const { walletProvider } = useAppKitProvider('eip155');
    const { httpDataProxyContract } = useContext(DataProxyContext);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // sig (bytes) the signature bytes.
        // expirationTimestamp (uint256) the signature's expiration timestamp.
        // proposer (address) the proposer account that posted the candidate proposal with the provided slug.
        // slug (string) the slug of the proposal candidate signer signed on.
        // proposalIdToUpdate (uint256) proposalIdToUpdate (uint256) if this is an update to an existing proposal, the ID of the proposal to update, otherwise 0.
        // encodedProp (bytes) the abi encoding of the candidate version signed; should be identical to the output of the `NounsDAOProposals.calcProposalEncodeData` function.
        // reason (string) signer's reason free text.

        e.preventDefault();

        if (!walletProvider || !httpDataProxyContract) return;

        if (!isConnected || !address) {
            open();
            return;
        }

        try {
            const content = proposalCandidate.latestVersion.content;
            const expirationTimestamp =
                Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 days in seconds
            const proposer = proposalCandidate.proposer;
            const slug = proposalCandidate.slug;
            const proposalIdToUpdate = content.proposalIdToUpdate;
            const encodedProp = content.encodedProposalHash;
            const reason = '';

            console.log('expirationTimestamp:', expirationTimestamp);
            console.log('proposer:', proposer);
            console.log('slug:', slug);
            console.log('proposalIdToUpdate:', proposalIdToUpdate);
            console.log('encodedProp:', encodedProp);
            console.log('reason:', reason);

            const message = `
I, ${address}, support proposal '${slug}'.

Encoded proposal hash:
${encodedProp}

This signature expires at ${new Date(
                expirationTimestamp * 1000
            ).toISOString()} (Unix: ${expirationTimestamp})

proposalIdToUpdate: ${proposalIdToUpdate}
`;

            console.log('message:', message);

            const provider = new BrowserProvider(
                walletProvider as Eip1193Provider
            );

            const signer = await provider.getSigner();

            const typedData = {
                types: {
                    Signature: [
                        { name: 'proposer', type: 'address' },
                        { name: 'slug', type: 'string' },
                        { name: 'proposalIdToUpdate', type: 'uint256' },
                        { name: 'encodedProp', type: 'bytes32' },
                        { name: 'expirationTimestamp', type: 'uint256' },
                        { name: 'reason', type: 'string' },
                    ],
                },
                domain: {
                    name: 'probe.wtf',
                    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
                    verifyingContract: httpDataProxyContract.target,
                },
                primaryType: 'Signature',
                message: {
                    proposer,
                    slug,
                    proposalIdToUpdate,
                    encodedProp,
                    expirationTimestamp,
                    reason,
                },
            };

            const sig = await (walletProvider as any).signTypedData({
                method: 'eth_signTypedData_v4',
                params: [address, JSON.stringify(typedData)],
            });

            // const sig = await signer.signMessage(message.trim());

            console.log('sig:', sig);

            const contractWithSigner = httpDataProxyContract.connect(
                signer
            ) as Contract;

            // const gasEstimate =
            //     await contractWithSigner.addSignature.estimateGas(
            //         sig,
            //         expirationTimestamp,
            //         proposer,
            //         slug,
            //         proposalIdToUpdate,
            //         encodedProp,
            //         reason
            //     );

            // const gasLimit = gasEstimate + BigInt(10_000); // buffer

            const tx = await contractWithSigner.addSignature(
                sig,
                expirationTimestamp,
                proposer,
                slug,
                proposalIdToUpdate,
                encodedProp,
                reason
                // {
                //     value: gasLimit,
                // }
            );

            const response = await tx.wait();

            console.log('Transaction response:', response);
        } catch (error: any) {
            console.error('Error signing message:', error);
            alert(error?.info?.error?.message || error.code);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={clsx(className, styles.form)}>
            <Button type="submit" color="purple">
                {dict.dream.details.addSignature}
            </Button>
        </form>
    );
}
