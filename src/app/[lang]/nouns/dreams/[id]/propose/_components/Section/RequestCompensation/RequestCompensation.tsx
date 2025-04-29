'use client';

import styles from '@/app/[lang]/nouns/dreams/[id]/propose/_styles/section/request-compensation/request-compensation.module.css';
import Input from '@/app/_components/Input/Input';
import FormField from '@/app/_components/FormField';
import { Dictionary } from '@/app/[lang]/dictionaries';
import { useState } from 'react';
import { DreamFromDBWithCustomTrait } from '@/utils/dto/Dream/FromDB';
import ArtworkContributionAgreement from '@/utils/dto/Dream/ArtworkContributionAgreement';
import SignArtworkAgreement from '@/app/[lang]/nouns/dreams/[id]/propose/_components/Section/RequestCompensation/SignArtworkAgreement';
import SubmitCandidate from '@/app/[lang]/nouns/dreams/[id]/propose/_components/Section/RequestCompensation//SubmitCandidate';

interface Props {
    dict: Dictionary;
    dream: DreamFromDBWithCustomTrait;
    traitBitmap: ImageBitmap;
    traitCanvas: HTMLCanvasElement;
    writeUp: string;
}

export default function RequestCompensation({
    dict,
    dream,
    traitBitmap,
    traitCanvas,
    writeUp,
}: Props) {
    const [requestedEth, setRequestedEth] = useState<string>('');

    const [agreement, setAgreement] = useState<ArtworkContributionAgreement>();

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
                <div className={styles.actionContainer}>
                    <SignArtworkAgreement
                        agreement={agreement}
                        dict={dict}
                        dream={dream}
                        traitCanvas={traitCanvas}
                        setAgreement={setAgreement}
                    />
                </div>

                <div className={styles.actionContainer}>
                    <SubmitCandidate
                        agreement={agreement}
                        dict={dict}
                        dream={dream}
                        requestedEth={Number(requestedEth)}
                        traitBitmap={traitBitmap}
                        traitCanvas={traitCanvas}
                        writeUp={writeUp}
                    />
                </div>
            </div>
        </div>
    );
}
