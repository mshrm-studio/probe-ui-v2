'use client';

import Button from '@/app/_components/Button';
import requestCompensationStyles from '@/app/[lang]/nouns/dreams/[id]/propose/_styles/section/request-compensation/request-compensation.module.css';
import { Dictionary } from '@/app/[lang]/dictionaries';
import { useContext, useMemo } from 'react';
import { DataProxyContext } from '@/context/DataProxy';
import { BrowserProvider, Contract, Eip1193Provider, parseEther } from 'ethers';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import ArtworkContributionAgreement from '@/utils/dto/Dream/ArtworkContributionAgreement';
import { DreamFromDBWithCustomTrait } from '@/utils/dto/Dream/FromDB';
import { NounTraitLayer } from '@/utils/enums/Noun/TraitLayer';
import { nounsDescriptorContractABI } from '@/utils/contracts/NounsDescriptorContractABI';
import { nounsTokenContractABI } from '@/utils/contracts/NounsTokenContractABI';
import { encodeFunctionData, getAbiItem } from 'viem';
import { formatAbiItem } from 'viem/utils';
import { useRouter } from 'next/navigation';
import { EncodedCompressedParts } from '@/hooks/useArtworkEncoding';
import { CurrentVotesContext } from '@/context/CurrentVotes';

interface Props {
    agreement?: ArtworkContributionAgreement;
    compressedEncodedArtwork: EncodedCompressedParts | null;
    dict: Dictionary;
    dream: DreamFromDBWithCustomTrait;
    requestedEth: number;
    requestedNoun: number;
    writeUp: string;
}

export default function SubmitCandidate({
    agreement,
    compressedEncodedArtwork,
    dict,
    dream,
    requestedEth,
    requestedNoun,
    writeUp,
}: Props) {
    const router = useRouter();
    const { address } = useAppKitAccount();
    const { httpDataProxyContract } = useContext(DataProxyContext);
    const { currentVotes } = useContext(CurrentVotesContext);
    const { walletProvider } = useAppKitProvider('eip155');

    const functionName = useMemo(() => {
        switch (dream.custom_trait_layer) {
            case NounTraitLayer.Accessory:
                return 'addAccessories';
            case NounTraitLayer.Body:
                return 'addBodies';
            case NounTraitLayer.Glasses:
                return 'addGlasses';
            case NounTraitLayer.Head:
                return 'addHeads';
            default:
                return null;
        }
    }, [dream.custom_trait_layer]);

    const encodedNounTransferCalldata = useMemo(() => {
        if (!address || requestedNoun < 0) return null;

        const nounsTokenContractAddress =
            process.env.NEXT_PUBLIC_NOUNS_TOKEN_CONTRACT_ADDRESS;
        // Is this the holder of the noun?

        if (!nounsTokenContractAddress) return null;

        const full = encodeFunctionData({
            abi: nounsTokenContractABI,
            functionName: 'safeTransferFrom',
            args: [nounsTokenContractAddress, address, BigInt(requestedNoun)],
        });

        return `0x${full.slice(10)}`;
    }, [address, requestedNoun]);

    const encodedNounTransferSignature = useMemo(() => {
        const item = getAbiItem({
            abi: nounsTokenContractABI,
            name: 'safeTransferFrom',
        });

        return item ? formatAbiItem(item) : null;
    }, []);

    const encodedTraitCalldata = useMemo(() => {
        if (!compressedEncodedArtwork || !functionName) return null;

        return encodeFunctionData({
            abi: nounsDescriptorContractABI,
            functionName,
            args: compressedEncodedArtwork,
        }).substring(10);
    }, [compressedEncodedArtwork, functionName]);

    const encodedTraitSignature = useMemo(() => {
        if (!functionName || !nounsDescriptorContractABI) return null;

        const item = getAbiItem({
            abi: nounsDescriptorContractABI,
            name: functionName,
        });

        return item ? formatAbiItem(item) : null;
    }, [functionName, nounsDescriptorContractABI]);

    const transactions = useMemo(() => {
        if (!encodedTraitCalldata) return null;

        let txs = [
            {
                address:
                    process.env.NEXT_PUBLIC_NOUNS_DESCRIPTOR_CONTRACT_ADDRESS,
                value: '0',
                calldata: `0x${encodedTraitCalldata}`,
                signature: encodedTraitSignature,
            },
        ];

        if (encodedNounTransferCalldata && encodedNounTransferSignature) {
            txs.push({
                address: process.env.NEXT_PUBLIC_NOUNS_TOKEN_CONTRACT_ADDRESS,
                value: '0',
                calldata: encodedNounTransferCalldata,
                signature: encodedNounTransferSignature,
            });
        }

        if (address && requestedEth > 0) {
            txs.push({
                address,
                value: parseEther(String(requestedEth)).toString(),
                calldata: '0x',
                signature: '',
            });
        }

        return txs;
    }, [
        address,
        encodedNounTransferCalldata,
        encodedNounTransferSignature,
        encodedTraitCalldata,
        encodedTraitSignature,
        requestedEth,
    ]);

    const submitCandidate = async () => {
        if (!agreement) {
            alert(dict.propose.error.agreementNotSigned);
            return;
        }

        if (!transactions) {
            alert(dict.propose.error.transactionsNotPrepared);
            return;
        }

        if (typeof currentVotes !== 'number') {
            alert(dict.common.error.currentVotesNotKnown);
            return;
        }

        if (!httpDataProxyContract) {
            alert(dict.common.error.dataProxyContractNotAvailable);
            return;
        }

        if (!walletProvider) {
            alert(dict.common.error.walletProviderNotAvailable);
            return;
        }

        try {
            const provider = new BrowserProvider(
                walletProvider as Eip1193Provider
            );

            const signer = await provider.getSigner();

            const dataProxyContractWithSigner = httpDataProxyContract.connect(
                signer
            ) as Contract;

            const createCandidateCost =
                await dataProxyContractWithSigner.createCandidateCost();
            // returns 10000000000000000n

            const artAtributionAgreement = `## Nouns Art Contribution Agreement\n\n**Signer**: ${agreement.signer}\n\n**Message**: ${agreement.message}\n\n**Signature**: ${agreement.signature}`;
            const description = `${writeUp}\n\n${artAtributionAgreement}`;
            const slug = `probe-dream-${dream.id}`;
            const proposalIdToUpdate = 0;
            const targets = transactions.map((tx) => tx.address);
            const values = transactions.map((tx) => tx.value);
            const signatures = transactions.map((tx) => tx.signature);
            const calldatas = transactions.map((tx) => tx.calldata);

            const costToPropose =
                currentVotes > 0 ? parseEther('0') : createCandidateCost;

            const gasEstimate =
                await dataProxyContractWithSigner.createProposalCandidate.estimateGas(
                    targets,
                    values,
                    signatures,
                    calldatas,
                    description,
                    slug,
                    proposalIdToUpdate,
                    {
                        value: costToPropose,
                    }
                );

            const gasLimit = gasEstimate + BigInt(10000); // Padding to avoid out-of-gas

            const tx =
                await dataProxyContractWithSigner.createProposalCandidate(
                    targets,
                    values,
                    signatures,
                    calldatas,
                    description,
                    slug,
                    proposalIdToUpdate,
                    {
                        value: costToPropose,
                        gasLimit,
                    }
                );

            await tx.wait();

            router.push(`/nouns/dreams/${dream.id}`);
        } catch (error: any) {
            console.error(error);

            alert(error?.info?.error?.message || error?.message);
        }
    };

    return (
        <div>
            <Button
                color="purple"
                className={requestCompensationStyles.actionBtn}
                disabled={agreement === undefined}
                size="lg"
                type="button"
                onClick={submitCandidate}
            >
                {dict.propose.requestCompensation.action.submitCandidate}
            </Button>
        </div>
    );
}
