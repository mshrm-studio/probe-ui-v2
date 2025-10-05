'use client';

import styles from '@/app/[lang]/nouns/dreams/[id]/propose/_styles/section/request-compensation/request-compensation.module.css';
import Input from '@/app/_components/Input/Input';
import FormField from '@/app/_components/FormField';
import { Dictionary } from '@/app/[lang]/dictionaries';
import { useMemo, useState } from 'react';
import { DreamFromDBWithCustomTrait } from '@/utils/dto/Dream/FromDB';
import ArtworkContributionAgreement from '@/utils/dto/Dream/ArtworkContributionAgreement';
import SignArtworkAgreement from '@/app/[lang]/nouns/dreams/[id]/propose/_components/Section/RequestCompensation/SignArtworkAgreement';
import SubmitCandidate from '@/app/[lang]/nouns/dreams/[id]/propose/_components/Section/RequestCompensation//SubmitCandidate';
import useArtworkEncoding from '@/hooks/useArtworkEncoding';
import { Palette } from '@/utils/artwork/types';
import { ImageData } from '@noundry/nouns-assets';
import { TRANSPARENT_HEX } from '@/utils/artwork/constants';

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
    const [requestedNoun, setRequestedNoun] = useState<string>('');

    const [agreement, setAgreement] = useState<ArtworkContributionAgreement>();

    const {
        compressAndEncodeTrait,
        getColorIndexes,
        getPaletteIndex,
        getTraitColors,
    } = useArtworkEncoding();

    const traitColors = useMemo(
        () => getTraitColors(traitBitmap),
        [traitBitmap]
    );

    const paletteIndex = useMemo(
        () => getPaletteIndex(traitColors, [ImageData.palette as Palette]),
        [ImageData.palette, traitColors]
    );

    const traitColorIndexes = useMemo(
        () =>
            getColorIndexes(
                traitCanvas,
                ImageData.palette.map((color) =>
                    color === '' ? TRANSPARENT_HEX : `#${color}`
                ) as Palette
            ),
        [ImageData.palette, traitCanvas]
    );

    const compressedEncodedArtwork = useMemo(() => {
        if (typeof paletteIndex === 'number')
            return compressAndEncodeTrait(traitColorIndexes, paletteIndex);

        return null;
    }, [traitColorIndexes, paletteIndex]);

    return (
        <div className={styles.container}>
            {paletteIndex === null && (
                <div className={styles.errorContainer}>
                    <p>{dict.propose.error.colorPaletteNotFound}</p>
                </div>
            )}

            {compressedEncodedArtwork === null && (
                <div className={styles.errorContainer}>
                    <p>{dict.propose.error.artworkCompressionFailed}</p>
                </div>
            )}

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

            <FormField
                label={dict.propose.requestCompensation.field.noun.label}
            >
                <Input
                    motif="borderless"
                    placeholder={
                        dict.propose.requestCompensation.field.noun.placeholder
                    }
                    value={requestedNoun}
                    onChange={(e) => setRequestedNoun(e.target.value)}
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
                        compressedEncodedArtwork={compressedEncodedArtwork}
                        dict={dict}
                        dream={dream}
                        requestedEth={Number(requestedEth)}
                        requestedNoun={Number(requestedNoun)}
                        writeUp={writeUp}
                    />
                </div>
            </div>
        </div>
    );
}
