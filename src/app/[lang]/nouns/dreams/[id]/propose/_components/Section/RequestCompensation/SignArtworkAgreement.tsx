'use client';

import ArtworkContributionAgreement from '@/utils/dto/Dream/ArtworkContributionAgreement';
import Button from '@/app/_components/Button';
import { CheckBadgeIcon } from '@heroicons/react/20/solid';
import requestCompensationStyles from '@/app/[lang]/nouns/dreams/[id]/propose/_styles/section/request-compensation/request-compensation.module.css';
import styles from '@/app/[lang]/nouns/dreams/[id]/propose/_styles/section/request-compensation/sign-artwork-agreement.module.css';
import { Dictionary } from '@/app/[lang]/dictionaries';
import React, { useMemo } from 'react';
import { BrowserProvider, Eip1193Provider } from 'ethers';
import {
    useAppKit,
    useAppKitAccount,
    useAppKitProvider,
} from '@reown/appkit/react';
import { DreamFromDBWithCustomTrait } from '@/utils/dto/Dream/FromDB';

interface Props {
    agreement?: ArtworkContributionAgreement;
    dict: Dictionary;
    dream: DreamFromDBWithCustomTrait;
    traitCanvas: HTMLCanvasElement;
    setAgreement: React.Dispatch<
        React.SetStateAction<ArtworkContributionAgreement | undefined>
    >;
}

export default function SignArtworkAgreement({
    agreement,
    dict,
    dream,
    traitCanvas,
    setAgreement,
}: Props) {
    const { address, isConnected } = useAppKitAccount();
    const { open } = useAppKit();
    const { walletProvider } = useAppKitProvider('eip155');

    const agreementMessage = useMemo(() => {
        const agreementUrl =
            'https://z5pvlzj323gcssdd3bua3hjqckxbcsydr4ksukoidh3l46fhet4q.arweave.net/z19V5TvWzClIY9hoDZ0wEq4RSwOPFSopyBn2vninJPk';

        const contributionName = dream.custom_trait_image
            .split('/')
            .pop()!
            .replace(/\.[^.]+$/, '');

        const contributionSpec = traitCanvas.toDataURL('image/png');

        return dict.propose.requestCompensation.artworkContributionAgreementMessage
            .replace(':ethAddress', address)
            .replace(':agreementUrl', agreementUrl)
            .replace(':contributionName', contributionName)
            .replace(':contributionSpec', contributionSpec);
    }, [address, dict, dream, traitCanvas]);

    const signArtworkAgreement = async () => {
        if (!isConnected || !address) {
            open();
            return;
        }

        if (!walletProvider) return;

        try {
            const provider = new BrowserProvider(
                walletProvider as Eip1193Provider
            );

            const signer = await provider.getSigner();

            const signature = await signer.signMessage(agreementMessage);

            setAgreement({
                message: agreementMessage,
                signature,
                signer: address,
            });
        } catch (error: any) {
            console.error('Error signing message:', error);
            alert(error?.info?.error?.message || error.code);
        }
    };

    return (
        <div>
            {agreement ? (
                <div className={styles.artworkAgreementSigned}>
                    <CheckBadgeIcon
                        className={styles.artworkAgreementSignedIcon}
                    />

                    <span>
                        {
                            dict.propose.requestCompensation
                                .artworkAgreementSigned
                        }
                    </span>
                </div>
            ) : (
                <Button
                    color="purple"
                    className={requestCompensationStyles.actionBtn}
                    type="button"
                    size="lg"
                    onClick={signArtworkAgreement}
                >
                    {
                        dict.propose.requestCompensation.action
                            .signArtworkAgreement
                    }
                </Button>
            )}
        </div>
    );
}
