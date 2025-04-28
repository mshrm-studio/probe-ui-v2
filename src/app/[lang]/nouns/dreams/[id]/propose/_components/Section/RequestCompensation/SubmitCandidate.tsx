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
import { encodeFunctionData, getAbiItem } from 'viem';
import { formatAbiItem } from 'viem/utils';
import { Palette } from '@/utils/artwork/types';
import { ImageData } from '@noundry/nouns-assets';
import useArtworkEncoding from '@/hooks/useArtworkEncoding';
import { useRouter } from 'next/navigation';

interface Props {
    agreement?: ArtworkContributionAgreement;
    dict: Dictionary;
    dream: DreamFromDBWithCustomTrait;
    requestedEth: number;
    traitBitmap: ImageBitmap;
    traitCanvas: HTMLCanvasElement;
    writeUp: string;
}

export default function SubmitCandidate({
    agreement,
    dict,
    dream,
    requestedEth,
    traitBitmap,
    traitCanvas,
    writeUp,
}: Props) {
    const router = useRouter();
    const { address } = useAppKitAccount();
    const { httpDataProxyContract } = useContext(DataProxyContext);
    const { walletProvider } = useAppKitProvider('eip155');
    const {
        compressAndEncodeTrait,
        getColorIndexes,
        getPaletteIndex,
        getTraitColors,
    } = useArtworkEncoding();

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

    const signatures = useMemo(() => {
        if (!functionName || !nounsDescriptorContractABI) return null;

        // BELOW REQUIRED IF REQUESTING A NOUN
        // safeTransferFrom(address,address,uint256)
        // return ['addHeads(bytes,uint80,uint16)', '', '']

        const item = getAbiItem({
            abi: nounsDescriptorContractABI,
            name: functionName,
        });

        if (!item) return null;

        if (requestedEth > 0) {
            return [formatAbiItem(item), ''];
        }

        return [formatAbiItem(item)];
    }, [functionName, nounsDescriptorContractABI]);

    const traitColors = useMemo(() => {
        return getTraitColors(traitBitmap);
    }, [traitBitmap, getTraitColors]);

    const paletteIndex = useMemo(() => {
        return getPaletteIndex(traitColors, [ImageData.palette as Palette]);
    }, [ImageData.palette, traitColors]);

    const traitColorIndexes = useMemo(() => {
        return getColorIndexes(traitCanvas, ImageData.palette as Palette);
    }, [ImageData.palette, traitCanvas]);

    const compressedEncodedArtwork = useMemo(() => {
        if (typeof paletteIndex === 'number')
            return compressAndEncodeTrait(traitColorIndexes, paletteIndex);

        return null;
    }, [traitColorIndexes, paletteIndex]);

    const calldatas = useMemo(() => {
        if (!compressedEncodedArtwork || !functionName) return null;

        // ADD THIS WHEN REQUESTING A NOUN
        // encodeFunctionData({
        //     abi: nounsTokenContractABI,
        //     functionName: 'safeTransferFrom',
        //     args: [
        //         process.env.NEXT_PUBLIC_NOUNS_TOKEN_CONTRACT_ADDRESS,
        //         address,
        //         0, // TOKENID
        //     ],
        // })

        return [
            // 1) Encode the descriptor call (e.g. addHeads, addAccessories, etc.)
            encodeFunctionData({
                abi: nounsDescriptorContractABI,
                functionName,
                args: compressedEncodedArtwork,
            }).substring(10),
            // 2) when requesting ETH, leave empty,
            '',
            // 3) Empty for array harmony
            '',
        ].map((calldata) => `0x${calldata}` as `0x${string}`);
    }, [compressedEncodedArtwork, functionName]);

    const submitCandidate = async () => {
        if (!agreement) return;

        if (!httpDataProxyContract) return;

        if (!walletProvider) return;

        try {
            const createCandidateCost =
                await httpDataProxyContract.createCandidateCost();
            // returns 10000000000000000n

            console.log('createCandidateCost:', createCandidateCost);

            const targets = [
                process.env.NEXT_PUBLIC_NOUNS_DESCRIPTOR_CONTRACT_ADDRESS,
            ];

            const values: (BigInt | string)[] = ['0'];

            if (requestedEth > 0) {
                targets.push(address);
                values.push(parseEther(String(requestedEth)));
            }

            const artAtributionAgreement = `## Nouns Art Contribution Agreement\n\n**Signer**: ${agreement.signer}\n\n**Message**: ${agreement.message}\n\n**Signature**: ${agreement.signature}`;

            const description = `${writeUp}\n\n${artAtributionAgreement}`;

            const slug = `probe-dream-${dream.id}`;

            const proposalIdToUpdate = 0;

            const provider = new BrowserProvider(
                walletProvider as Eip1193Provider
            );

            const signer = await provider.getSigner();

            const contractWithSigner = httpDataProxyContract.connect(
                signer
            ) as Contract;

            const gasEstimate =
                await contractWithSigner.createProposalCandidate.estimateGas(
                    targets,
                    values,
                    signatures,
                    calldatas,
                    description,
                    slug,
                    proposalIdToUpdate,
                    {
                        value: createCandidateCost,
                    }
                );

            const gasLimit = gasEstimate + BigInt(10000); // Padding to avoid out-of-gas

            const tx = await contractWithSigner.createProposalCandidate(
                targets,
                values,
                signatures,
                calldatas,
                description,
                slug,
                proposalIdToUpdate,
                {
                    value: createCandidateCost,
                    gasLimit,
                }
            );

            await tx.wait();

            router.push(`/nouns/dreams/${dream.id}`);
        } catch (error: any) {
            console.error('error:', error);

            alert(error?.info?.error?.message || error?.message);
        }
    };

    return (
        <div>
            <Button
                color="purple"
                className={requestCompensationStyles.actionBtn}
                disabled={agreement === undefined}
                type="button"
                onClick={submitCandidate}
            >
                {dict.propose.requestCompensation.action.submitCandidate}
            </Button>
        </div>
    );
}
