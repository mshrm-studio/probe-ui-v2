'use client';

import styles from '@/app/[lang]/nouns/dreams/[id]/propose/_styles/section/request-compensation.module.css';
import Button from '@/app/_components/Button';
import Input from '@/app/_components/Input/Input';
import FormField from '@/app/_components/FormField';
import { Dictionary } from '@/app/[lang]/dictionaries';
import { useMemo, useState } from 'react';
import {
    useAppKit,
    useAppKitAccount,
    useAppKitProvider,
} from '@reown/appkit/react';
import { DreamFromDBWithCustomTrait } from '@/utils/dto/Dream/FromDB';
import { BrowserProvider, Eip1193Provider } from 'ethers';
import ArtworkContributionAgreement from '@/utils/dto/Dream/ArtworkContributionAgreement';
import { CheckBadgeIcon } from '@heroicons/react/20/solid';

interface Props {
    dict: Dictionary;
    dream: DreamFromDBWithCustomTrait;
    traitCanvas: HTMLCanvasElement;
}

export default function RequestCompensation({
    dict,
    dream,
    traitCanvas,
}: Props) {
    const { address, isConnected } = useAppKitAccount();
    const { open } = useAppKit();
    const [requestedEth, setRequestedEth] = useState<string>('');
    const { walletProvider } = useAppKitProvider('eip155');
    const [agreement, setAgreement] = useState<ArtworkContributionAgreement>();

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
        console.log('isConnected', isConnected);
        console.log('address', address);

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
            console.log('signature', signature);

            console.log('agreement:', {
                message: agreementMessage,
                signature,
                signer: address,
            });

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
        <div className={styles.container}>
            <FormField label={dict.propose.requestCompensation.field.eth.label}>
                <Input
                    motif="borderless"
                    placeholder={
                        dict.propose.requestCompensation.field.eth.placeholder
                    }
                    value={requestedEth}
                    onChange={(e) => setRequestedEth(e.target.value)}
                />
            </FormField>

            <div className={styles.actions}>
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
                        className={styles.actionBtn}
                        type="button"
                        onClick={signArtworkAgreement}
                    >
                        {
                            dict.propose.requestCompensation.action
                                .signArtworkAgreement
                        }
                    </Button>
                )}
            </div>
        </div>
    );
}
