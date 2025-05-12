import { NounTraitLayer } from '@/utils/enums/Noun/TraitLayer';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import CustomTraitForm from '@/app/[lang]/nouns/dreams/create/_components/Form/CustomTraitForm';
import SeedForm from '@/app/[lang]/nouns/dreams/create/_components/Form/SeedForm';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import useApi from '@/hooks/useApi';
import { isDreamFromDBResponse } from '@/utils/dto/Dream/FromDB';
import DreamSeed from '@/utils/dto/Dream/Seed';
import Button from '@/app/_components/Button';
import useDictionary from '@/hooks/useDictionary';
import styles from '@/app/[lang]/nouns/dreams/create/_styles/form/form.module.css';
import { useRouter } from 'next/navigation';

interface Props {
    customTraitLayer: NounTraitLayer | null;
    setCustomTraitLayer: React.Dispatch<
        React.SetStateAction<NounTraitLayer | null>
    >;
    seed: DreamSeed;
    setSeed: React.Dispatch<React.SetStateAction<DreamSeed>>;
}

export default function Form({
    customTraitLayer,
    setCustomTraitLayer,
    seed,
    setSeed,
}: Props) {
    const dict = useDictionary();
    const { address, isConnected } = useAppKitAccount();
    const { open } = useAppKit();
    const api = useApi();
    const router = useRouter();
    const [customTrait, setCustomTrait] = useState<ImageBitmap | null>(null);
    const [traitFile, setTraitFile] = useState<File | null>(null);
    const [showCustomTraitForm, setShowCustomTraitForm] = useState(false);

    useEffect(() => {
        if (customTrait && customTraitLayer) {
            setSeed((prevSeed) => ({
                accessory:
                    customTraitLayer === NounTraitLayer.Accessory
                        ? customTrait
                        : prevSeed.accessory,
                background: prevSeed.background,
                body:
                    customTraitLayer === NounTraitLayer.Body
                        ? customTrait
                        : prevSeed.body,
                glasses:
                    customTraitLayer === NounTraitLayer.Glasses
                        ? customTrait
                        : prevSeed.glasses,
                head:
                    customTraitLayer === NounTraitLayer.Head
                        ? customTrait
                        : prevSeed.head,
            }));
        }
    }, [customTraitLayer, customTrait]);

    const dream = async (e: FormEvent) => {
        e.preventDefault();

        if (!isConnected) {
            open();
            return;
        }

        const formData = new FormData();

        formData.append('accessory_seed_id', String(seed.accessory));

        formData.append('background_seed_id', String(seed.background));

        formData.append('body_seed_id', String(seed.body));

        formData.append('dreamer', String(address));

        formData.append('glasses_seed_id', String(seed.glasses));

        formData.append('head_seed_id', String(seed.head));

        if (traitFile) {
            formData.append('custom_trait_image', traitFile);
        }

        if (customTraitLayer) {
            formData.append('custom_trait_layer', customTraitLayer);
        }

        try {
            const { data } = await api.post('/dream-nouns', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (!isDreamFromDBResponse(data)) {
                throw new Error('Dream created but unexpected response.');
            }

            router.push(`/nouns/dreams/${data.data.id}`);
        } catch (error: any) {
            console.error(error);
            alert(error?.response?.data?.message || error?.message || error);
        }
    };

    return (
        <form className={styles.container} onSubmit={dream}>
            {showCustomTraitForm ? (
                <CustomTraitForm
                    setCustomTrait={setCustomTrait}
                    customTraitLayer={customTraitLayer}
                    setCustomTraitLayer={setCustomTraitLayer}
                    setShowCustomTraitForm={setShowCustomTraitForm}
                    traitFile={traitFile}
                    setTraitFile={setTraitFile}
                />
            ) : (
                <>
                    <SeedForm
                        customTraitLayer={customTraitLayer}
                        customTrait={customTrait}
                        setShowCustomTraitForm={setShowCustomTraitForm}
                        seed={seed}
                        setSeed={setSeed}
                    />

                    <Button size="lg" type="submit">
                        {dict.create.seedForm.dream}
                    </Button>
                </>
            )}
        </form>
    );
}
