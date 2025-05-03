'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import Button from '@/app/_components/Button';
import NounProposalCandidateFromSubgraph from '@/utils/dto/Noun/ProposalCandidate/FromSubgraph';
import {
    useAppKit,
    useAppKitAccount,
    useAppKitProvider,
} from '@reown/appkit/react';
import { DaoProxyContext } from '@/context/DaoProxy';
import { useContext } from 'react';
import { BrowserProvider, Contract, Eip1193Provider } from 'ethers';

interface Props {
    className?: string;
    dict: Dictionary;
    proposalCandidate: NounProposalCandidateFromSubgraph;
}

export default function Promote({ className, dict, proposalCandidate }: Props) {
    const { address, isConnected } = useAppKitAccount();
    const { open } = useAppKit();
    const { walletProvider } = useAppKitProvider('eip155');
    const { httpDaoProxyContract } = useContext(DaoProxyContext);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!walletProvider || !httpDaoProxyContract) return;

        if (!isConnected || !address) {
            open();
            return;
        }

        try {
            const provider = new BrowserProvider(
                walletProvider as Eip1193Provider
            );

            const signer = await provider.getSigner();

            const contractWithSigner = httpDaoProxyContract.connect(
                signer
            ) as Contract;

            const content = proposalCandidate.latestVersion.content;

            console.log('content', content);

            // const proposerSignatures = Array.from(
            //     new Map(
            //         content.contentSignatures
            //             .filter(
            //                 (cs) =>
            //                     Number(cs.expirationTimestamp) >
            //                     Math.floor(Date.now() / 1000)
            //             )
            //             .map((cs) => [
            //                 cs.signer.id.toLowerCase(),
            //                 {
            //                     sig: cs.sig,
            //                     signer: cs.signer.id,
            //                     expirationTimestamp: Number(
            //                         cs.expirationTimestamp
            //                     ),
            //                 },
            //             ])
            //     ).values()
            // ).sort((a, b) =>
            //     a.signer.toLowerCase().localeCompare(b.signer.toLowerCase())
            // );

            // const proposerSignatures = content.contentSignatures.map((cs) => ({
            //     sig: cs.sig,
            //     signer: cs.signer.id,
            //     expirationTimestamp: cs.expirationTimestamp,
            // }));

            const proposeWithClientId = contractWithSigner.getFunction(
                'propose(address[],uint256[],string[],bytes[],string,uint32)'
            );

            console.log('proposerSignatures', proposerSignatures);
            console.log('targets', content.targets);
            console.log('values', content.values);
            console.log('signatures', content.signatures);
            console.log('calldatas', content.calldatas);
            console.log('description', content.description);
            console.log(
                'clientId',
                Number(process.env.NEXT_PUBLIC_PROBE_NOUNS_CLIENT_ID)
            );

            const tx = await proposeWithClientId(
                content.targets,
                content.values,
                content.signatures,
                content.calldatas,
                content.description,
                Number(process.env.NEXT_PUBLIC_PROBE_NOUNS_CLIENT_ID)
            );

            await tx.wait();
        } catch (error: any) {
            console.error('Error promoting candidate:', error);
            alert(error?.info?.error?.message || error.code);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={className}>
            <Button type="submit" color="purple">
                {dict.dream.details.promote}
            </Button>
        </form>
    );
}
