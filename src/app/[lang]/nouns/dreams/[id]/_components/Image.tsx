'use client';

import DreamFromDB, {
    isDreamFromDBWithCustomTrait,
} from '@/utils/dto/Dream/FromDB';
import { DreamImageFromSeed } from '@/app/[lang]/nouns/dreams/_components/Dream/Image/FromSeed';
import { NounTraitLayer } from '@/utils/enums/Noun/TraitLayer';
import { useCallback, useEffect, useState } from 'react';
import DreamSeed from '@/utils/dto/Dream/Seed';
import { ImageData } from '@noundry/nouns-assets';
import Button from '@/app/_components/Button';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/image.module.css';
import { Dictionary } from '@/app/[lang]/dictionaries';

interface Props {
    dict: Dictionary;
    dream: DreamFromDB;
}

export default function Image({ dict, dream }: Props) {
    const [seed, setSeed] = useState<DreamSeed>({
        accessory:
            dream.custom_trait_layer === NounTraitLayer.Accessory
                ? dream.custom_trait_image_url
                : dream.accessory_seed_id,
        background: dream.background_seed_id,
        body:
            dream.custom_trait_layer === NounTraitLayer.Body
                ? dream.custom_trait_image_url
                : dream.body_seed_id,
        glasses:
            dream.custom_trait_layer === NounTraitLayer.Glasses
                ? dream.custom_trait_image_url
                : dream.glasses_seed_id,
        head:
            dream.custom_trait_layer === NounTraitLayer.Head
                ? dream.custom_trait_image_url
                : dream.head_seed_id,
    });

    useEffect(() => {
        setSeed({
            accessory:
                dream.custom_trait_layer === NounTraitLayer.Accessory
                    ? dream.custom_trait_image_url
                    : dream.accessory_seed_id,
            background: dream.background_seed_id,
            body:
                dream.custom_trait_layer === NounTraitLayer.Body
                    ? dream.custom_trait_image_url
                    : dream.body_seed_id,
            glasses:
                dream.custom_trait_layer === NounTraitLayer.Glasses
                    ? dream.custom_trait_image_url
                    : dream.glasses_seed_id,
            head:
                dream.custom_trait_layer === NounTraitLayer.Head
                    ? dream.custom_trait_image_url
                    : dream.head_seed_id,
        });
    }, [dream]);

    const randomize = useCallback(() => {
        // console.log('[randomize] called. old seed:', seed);

        const { images } = ImageData;

        const { accessories, bodies, glasses, heads } = images;

        setSeed((prev) => {
            const newSeed = {
                accessory:
                    dream.custom_trait_layer === NounTraitLayer.Accessory
                        ? prev.accessory
                        : Math.floor(Math.random() * accessories.length),
                background: dream.background_seed_id,
                body:
                    dream.custom_trait_layer === NounTraitLayer.Body
                        ? prev.body
                        : Math.floor(Math.random() * bodies.length),
                glasses:
                    dream.custom_trait_layer === NounTraitLayer.Glasses
                        ? prev.glasses
                        : Math.floor(Math.random() * glasses.length),
                head:
                    dream.custom_trait_layer === NounTraitLayer.Head
                        ? prev.head
                        : Math.floor(Math.random() * heads.length),
            };

            // console.log('[randomize] new seed:', newSeed);

            return newSeed;
        });
    }, [dream]);

    return (
        <div className={styles.container}>
            <DreamImageFromSeed seed={seed} />

            {isDreamFromDBWithCustomTrait(dream) && (
                <div className={styles.randomiseBtnContainer}>
                    <Button color="white" onClick={randomize}>
                        {dict.dream.randomize}
                    </Button>
                </div>
            )}
        </div>
    );
}
