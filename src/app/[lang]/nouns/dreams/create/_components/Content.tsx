'use client';

import styles from '@/app/[lang]/nouns/dreams/create/_styles/content.module.css';
import DreamSeed from '@/utils/dto/Dream/Seed';
import { useCallback, useState } from 'react';
import Form from '@/app/[lang]/nouns/dreams/create/_components/Form/Form';
import Preview from '@/app/[lang]/nouns/dreams/create/_components/Preview';
import Background from '@/app/[lang]/nouns/dreams/create/_components/Background';
import Button from '@/app/_components/Button';
import { Dictionary } from '@/app/[lang]/dictionaries';
import { NounTraitLayer } from '@/utils/enums/Noun/TraitLayer';
import { ImageData } from '@noundry/nouns-assets';

interface Props {
    children: React.ReactNode;
    dict: Dictionary;
}

export default function Content({ children, dict }: Props) {
    const [customTraitLayer, setCustomTraitLayer] =
        useState<NounTraitLayer | null>(null);

    const [seed, setSeed] = useState<DreamSeed>({
        accessory: 0,
        background: 0,
        body: 0,
        glasses: 0,
        head: 0,
    });

    // console.log('[Content] render. seed:', seed);

    const randomize = useCallback(() => {
        // console.log('[randomize] called. old seed:', seed);

        const { images } = ImageData;

        const { accessories, bodies, glasses, heads } = images;

        setSeed((prev) => {
            const newSeed = {
                accessory:
                    customTraitLayer === NounTraitLayer.Accessory
                        ? prev.accessory
                        : Math.floor(Math.random() * accessories.length),
                background: Math.floor(Math.random() * 2),
                body:
                    customTraitLayer === NounTraitLayer.Body
                        ? prev.body
                        : Math.floor(Math.random() * bodies.length),
                glasses:
                    customTraitLayer === NounTraitLayer.Glasses
                        ? prev.glasses
                        : Math.floor(Math.random() * glasses.length),
                head:
                    customTraitLayer === NounTraitLayer.Head
                        ? prev.head
                        : Math.floor(Math.random() * heads.length),
            };

            // console.log('[randomize] new seed:', newSeed);

            return newSeed;
        });
    }, [customTraitLayer]);

    return (
        <Background backgroundIndex={seed.background}>
            {children}

            <main>
                <div className={styles.container}>
                    <div className={styles.previewContainer}>
                        <Preview seed={seed} />

                        <div className={styles.randomiseBtnContainer}>
                            <Button color="white" size="lg" onClick={randomize}>
                                {dict.create.randomize}
                            </Button>
                        </div>
                    </div>

                    <div className={styles.formContainer}>
                        <Form
                            customTraitLayer={customTraitLayer}
                            setCustomTraitLayer={setCustomTraitLayer}
                            seed={seed}
                            setSeed={setSeed}
                        />
                    </div>
                </div>
            </main>
        </Background>
    );
}
