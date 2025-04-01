import SelectNounAccessory from '@/app/[lang]/nouns/_components/Select/Noun/Accessory';
import SelectNounBackground from '@/app/[lang]/nouns/_components/Select/Noun/Background';
import SelectNounBody from '@/app/[lang]/nouns/_components/Select/Noun/Body';
import SelectNounGlasses from '@/app/[lang]/nouns/_components/Select/Noun/Glasses';
import SelectNounHead from '@/app/[lang]/nouns/_components/Select/Noun/Head';
import Button from '@/app/_components/Button';
import useDictionary from '@/hooks/useDictionary';
import DreamSeed from '@/utils/dto/Dream/Seed';
import { NounTraitLayer } from '@/utils/enums/Noun/TraitLayer';
import React, { useEffect, useState } from 'react';
import { ImageData } from '@noundry/nouns-assets';
import styles from '@/app/[lang]/nouns/dreams/create/_styles/form/seed-form.module.css';

interface Props {
    customTraitLayer: NounTraitLayer | null;
    customTrait: ImageBitmap | null;
    setShowCustomTraitForm: React.Dispatch<React.SetStateAction<boolean>>;
    seed: DreamSeed;
    setSeed: React.Dispatch<React.SetStateAction<DreamSeed>>;
}

export default function SeedForm({
    customTraitLayer,
    customTrait,
    setShowCustomTraitForm,
    seed,
    setSeed,
}: Props) {
    const dict = useDictionary();
    const { images } = ImageData;

    const [accessory, setAccessory] = useState<string | null>(null);

    useEffect(() => {
        if (
            (typeof seed.accessory === 'number' ||
                typeof seed.accessory === 'string') &&
            customTraitLayer !== NounTraitLayer.Accessory
        ) {
            const nextAccessory =
                images.accessories[Number(seed.accessory)]?.filename;

            if (nextAccessory)
                setAccessory((prev) =>
                    nextAccessory !== prev ? nextAccessory : prev
                );
        }
    }, [seed.accessory, images.accessories, customTraitLayer]);

    useEffect(() => {
        if (
            customTraitLayer !== NounTraitLayer.Accessory &&
            accessory !== null
        ) {
            const nextAccessory = Math.max(
                images.accessories.findIndex((a) => a.filename === accessory),
                0
            );

            setSeed((prev) => {
                if (prev.accessory !== nextAccessory) {
                    return { ...prev, accessory: nextAccessory };
                }

                return prev;
            });
        }
    }, [accessory, images.accessories, customTraitLayer]);

    const [background, setBackground] = useState<string | null>(null);

    useEffect(() => {
        if (seed.background == 0 || seed.background == 1) {
            const nextBackground = seed.background == 0 ? 'd5d7e1' : 'e1d7d5';

            if (nextBackground)
                setBackground((prev) =>
                    nextBackground !== prev ? nextBackground : prev
                );
        }
    }, [seed.background]);

    useEffect(() => {
        if (background == 'd5d7e1' || background == 'e1d7d5') {
            const nextBackground = background == 'd5d7e1' ? 0 : 1;

            setSeed((prev) => {
                if (prev.background !== nextBackground) {
                    return { ...prev, background: nextBackground };
                }

                return prev;
            });
        }
    }, [background]);

    const [body, setBody] = useState<string | null>(null);

    useEffect(() => {
        if (
            (typeof seed.body === 'number' || typeof seed.body === 'string') &&
            customTraitLayer !== NounTraitLayer.Body
        ) {
            const nextBody = images.bodies[Number(seed.body)]?.filename;

            if (nextBody)
                setBody((prev) => (nextBody !== prev ? nextBody : prev));
        }
    }, [seed.body, images.bodies, customTraitLayer]);

    useEffect(() => {
        if (customTraitLayer !== NounTraitLayer.Body && body !== null) {
            const nextBody = Math.max(
                images.bodies.findIndex((b) => b.filename === body),
                0
            );

            setSeed((prev) => {
                if (prev.body !== nextBody) {
                    return { ...prev, body: nextBody };
                }

                return prev;
            });
        }
    }, [body, images.bodies, customTraitLayer]);

    const [glasses, setGlasses] = useState<string | null>(null);

    useEffect(() => {
        if (
            (typeof seed.glasses === 'number' ||
                typeof seed.glasses === 'string') &&
            customTraitLayer !== NounTraitLayer.Glasses
        ) {
            const nextGlasses = images.glasses[Number(seed.glasses)]?.filename;

            if (nextGlasses)
                setGlasses((prev) =>
                    nextGlasses !== prev ? nextGlasses : prev
                );
        }
    }, [seed.glasses, images.glasses, customTraitLayer]);

    useEffect(() => {
        if (customTraitLayer !== NounTraitLayer.Glasses && glasses !== null) {
            const nextGlasses = Math.max(
                images.glasses.findIndex((g) => g.filename === glasses),
                0
            );

            setSeed((prev) => {
                if (prev.glasses !== nextGlasses) {
                    return { ...prev, glasses: nextGlasses };
                }

                return prev;
            });
        }
    }, [glasses, images.glasses, customTraitLayer]);

    const [head, setHead] = useState<string | null>(null);

    useEffect(() => {
        if (
            (typeof seed.head === 'number' || typeof seed.head === 'string') &&
            customTraitLayer !== NounTraitLayer.Head
        ) {
            const nextHead = images.heads[Number(seed.head)]?.filename;

            if (nextHead)
                setHead((prev) => (nextHead !== prev ? nextHead : prev));
        }
    }, [seed.head, images.heads, customTraitLayer]);

    useEffect(() => {
        if (customTraitLayer !== NounTraitLayer.Head && head !== null) {
            const nextHead = Math.max(
                images.heads.findIndex((h) => h.filename === head),
                0
            );

            setSeed((prev) => {
                if (prev.head !== nextHead) {
                    return { ...prev, head: nextHead };
                }

                return prev;
            });
        }
    }, [head, images.heads, customTraitLayer]);

    const switchForm = () => {
        setShowCustomTraitForm(true);
    };

    return (
        <div className={styles.container}>
            {customTraitLayer !== NounTraitLayer.Head && (
                <SelectNounHead selected={head} setSelected={setHead} />
            )}

            {customTraitLayer !== NounTraitLayer.Glasses && (
                <SelectNounGlasses
                    selected={glasses}
                    setSelected={setGlasses}
                />
            )}

            {customTraitLayer !== NounTraitLayer.Accessory && (
                <SelectNounAccessory
                    selected={accessory}
                    setSelected={setAccessory}
                />
            )}

            {customTraitLayer !== NounTraitLayer.Body && (
                <SelectNounBody selected={body} setSelected={setBody} />
            )}

            <SelectNounBackground
                selected={background}
                setSelected={setBackground}
            />

            {!customTrait && (
                <Button color="purple" type="button" onClick={switchForm}>
                    {dict.create.seedForm.uploadTrait}
                </Button>
            )}
        </div>
    );
}
