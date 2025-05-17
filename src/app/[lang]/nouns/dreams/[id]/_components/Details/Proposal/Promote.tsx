'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import Button from '@/app/_components/Button';
import NounProposalCandidateFromSubgraph from '@/utils/dto/Noun/Proposal/Candidate/FromSubgraph';
import {
    useAppKit,
    useAppKitAccount,
    useAppKitProvider,
} from '@reown/appkit/react';
import { DaoProxyContext } from '@/context/DaoProxy';
import { useContext } from 'react';
import { BrowserProvider, Contract, Eip1193Provider } from 'ethers';
import { CurrentVotesContext } from '@/context/CurrentVotes';

interface Props {
    className?: string;
    dict: Dictionary;
    proposalCandidate: NounProposalCandidateFromSubgraph;
    validSignaturesNouns: number[];
}

export default function Promote({
    className,
    dict,
    proposalCandidate,
    validSignaturesNouns,
}: Props) {
    const { address, isConnected } = useAppKitAccount();
    const { open } = useAppKit();
    const { walletProvider } = useAppKitProvider('eip155');
    const { httpDaoProxyContract } = useContext(DaoProxyContext);
    const { currentVotes } = useContext(CurrentVotesContext);

    const proposeBySigs = async (e: React.FormEvent<HTMLFormElement>) => {
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
                            {
                                sig: s.sig,
                                signer: s.signer.id,
                                expirationTimestamp: Number(
                                    s.expirationTimestamp
                                ),
                            },
                        ])
                ).values()
            );

            const proposeBySigsWithClientId = contractWithSigner.getFunction(
                'proposeBySigs((bytes,address,uint256)[],address[],uint256[],string[],bytes[],string,uint32)'
            );

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

            window.location.reload();
        } catch (error: any) {
            console.error(error);

            alert(error?.info?.error?.message || error.code);
        }
    };

    const propose = async (e: React.FormEvent<HTMLFormElement>) => {
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

            const proposeWithClientId = contractWithSigner.getFunction(
                'propose(address[],uint256[],string[],bytes[],string,uint32)'
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

            window.location.reload();
        } catch (error: any) {
            console.error(error);
            alert(error?.info?.error?.message || error.code);
        }
    };

    if (typeof currentVotes !== 'number') return null;

    if (address !== proposalCandidate.proposer) return null;

    if (validSignaturesNouns.length < 4 && currentVotes < 4) return null;

    return (
        <div className={className} data-current-votes={currentVotes}>
            {currentVotes > 3 ? (
                <form onSubmit={propose} data-method="propose">
                    <Button type="submit" color="purple" size="lg">
                        {dict.dream.details.promote}
                    </Button>
                </form>
            ) : (
                <form onSubmit={proposeBySigs} data-method="proposeBySigs">
                    <Button type="submit" color="purple" size="lg">
                        {dict.dream.details.promote}
                    </Button>
                </form>
            )}
        </div>
    );
}
