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
import clsx from 'clsx';

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

    const handleSubmit2 = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isConnected || !address) {
            open();
            return;
        }

        if (address !== proposalCandidate.proposer) return;

        if (!walletProvider || !httpDaoProxyContract) return;

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

            const proposerSignatures = Array.from(
                new Map(
                    content.contentSignatures
                        .filter(
                            (s) =>
                                Number(s.expirationTimestamp) >
                                Math.floor(Date.now() / 1000)
                        )
                        .sort((a, b) =>
                            a.signer.id
                                .toLowerCase()
                                .localeCompare(b.signer.id.toLowerCase())
                        )
                        .map((s) => [
                            s.signer.id.toLowerCase(),
                            [s.sig, s.signer.id, Number(s.expirationTimestamp)],
                        ])
                ).values()
            );

            const proposeBySigsWithClientId = contractWithSigner.getFunction(
                'proposeBySigs((bytes,address,uint256)[],address[],uint256[],string[],bytes[],string,uint32)'
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

            // const gasEstimate = await proposeBySigsWithClientId.estimateGas(
            //     proposerSignatures,
            //     content.targets,
            //     content.values,
            //     content.signatures,
            //     content.calldatas,
            //     content.description,
            //     Number(process.env.NEXT_PUBLIC_PROBE_NOUNS_CLIENT_ID)
            // );

            // const gasLimit = gasEstimate + BigInt(10000); // Padding to avoid out-of-gas

            // console.log('gasEstimate', gasEstimate);
            // console.log('gasLimit', gasLimit);

            const tx = await proposeBySigsWithClientId(
                proposerSignatures,
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isConnected || !address) {
            open();
            return;
        }

        if (!walletProvider || !httpDaoProxyContract) return;

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

            const proposeWithClientId = contractWithSigner.getFunction(
                'propose(address[],uint256[],string[],bytes[],string,uint32)'
            );

            console.log('targets', content.targets);
            console.log('values', content.values);
            console.log('signatures', content.signatures);
            console.log('calldatas', content.calldatas);
            console.log('description', content.description);
            console.log(
                'clientId',
                Number(process.env.NEXT_PUBLIC_PROBE_NOUNS_CLIENT_ID)
            );

            // const gasEstimate = await proposeWithClientId.estimateGas(
            //     content.targets,
            //     content.values,
            //     content.signatures,
            //     content.calldatas,
            //     content.description,
            //     Number(process.env.NEXT_PUBLIC_PROBE_NOUNS_CLIENT_ID)
            // );

            // const gasLimit = gasEstimate + BigInt(10000); // Padding to avoid out-of-gas

            // console.log('gasEstimate', gasEstimate);
            // console.log('gasLimit', gasLimit);

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

    if (address !== proposalCandidate.proposer) return null;

    return (
        <div className={clsx(className, 'space-y-4')}>
            <form onSubmit={handleSubmit}>
                <Button type="submit" color="purple">
                    {dict.dream.details.promote}
                </Button>
            </form>

            <form onSubmit={handleSubmit2}>
                <Button type="submit" color="purple">
                    {dict.dream.details.promote} (bySigs)
                </Button>
            </form>
        </div>
    );
}
