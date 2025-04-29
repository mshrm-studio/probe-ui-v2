'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import styles from '@/app/[lang]/nouns/dreams/[id]/propose/_styles/content.module.css';
import { useState } from 'react';
import WriteUp from '@/app/[lang]/nouns/dreams/[id]/propose/_components/Section/WriteUp';
import RequestCompensation from '@/app/[lang]/nouns/dreams/[id]/propose/_components/Section/RequestCompensation/RequestCompensation';
import SectionHeader from '@/app/[lang]/nouns/dreams/[id]/propose/_components/Section/Header';
import DreamFromDB from '@/utils/dto/Dream/FromDB';
import useImageBitmap from '@/hooks/V2/useImageBitmap';

interface Props {
    dict: Dictionary;
    dream: DreamFromDB;
}

export type Section = 'WriteUp' | 'RequestCompensation';

export default function Content({ dict, dream }: Props) {
    const [section, setSection] = useState<Section>('WriteUp');
    const [writeUp, setWriteUp] = useState<string>('');
    const [traitCanvas, setTraitCanvas] = useState<HTMLCanvasElement | null>(
        null
    );
    const traitBitmap = useImageBitmap(
        traitCanvas,
        dream.custom_trait_image_url
    );

    if (!dream.custom_trait_image_url || !dream.custom_trait_image) {
        return (
            <div className={styles.container}>
                <p>{dict.propose.error.noCustomTrait}</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <canvas
                ref={setTraitCanvas}
                height={32}
                width={32}
                className="hidden"
            />

            <SectionHeader
                dict={dict}
                section={section}
                setSection={setSection}
            />

            {(!traitCanvas || !traitBitmap) && (
                <p>{dict.propose.error.invalidCustomTrait}</p>
            )}

            {traitCanvas && traitBitmap && section === 'WriteUp' && (
                <WriteUp
                    dict={dict}
                    dream={dream}
                    traitCanvas={traitCanvas}
                    writeUp={writeUp}
                    setWriteUp={setWriteUp}
                    goToNextSection={() => setSection('RequestCompensation')}
                />
            )}

            {traitCanvas &&
                traitBitmap &&
                section === 'RequestCompensation' && (
                    <RequestCompensation
                        dict={dict}
                        dream={dream}
                        traitBitmap={traitBitmap}
                        traitCanvas={traitCanvas}
                        writeUp={writeUp}
                    />
                )}
        </div>
    );
}
