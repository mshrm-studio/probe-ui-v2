import SelectNounTraitLayer from '@/app/[lang]/nouns/_components/Select/Noun/TraitLayer';
import useDictionary from '@/hooks/useDictionary';
import useImageBitmap from '@/hooks/useImageBitmap';
import { NounTraitLayer } from '@/utils/enums/Noun/TraitLayer';
import { useEffect, useState } from 'react';
import styles from '@/app/[lang]/nouns/dreams/create/_styles/form/custom-trait-form.module.css';
import InputFile from '@/app/_components/Input/File';

interface Props {
    setCustomTrait: React.Dispatch<React.SetStateAction<ImageBitmap | null>>;
    customTraitLayer: NounTraitLayer | null;
    setCustomTraitLayer: React.Dispatch<
        React.SetStateAction<NounTraitLayer | null>
    >;
    setShowCustomTraitForm: React.Dispatch<React.SetStateAction<boolean>>;
    traitFile: File | null;
    setTraitFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function CustomTraitForm({
    setCustomTrait,
    customTraitLayer,
    setCustomTraitLayer,
    setShowCustomTraitForm,
    traitFile,
    setTraitFile,
}: Props) {
    const dict = useDictionary();
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
    const bitmap = useImageBitmap(canvas, traitFile);

    const handleTraitUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setTraitFile(file);
        }
    };

    useEffect(() => {
        if (bitmap) {
            setCustomTrait(bitmap);
            setShowCustomTraitForm(false);
        }
    }, [bitmap]);

    return (
        <div className={styles.container}>
            <SelectNounTraitLayer
                excludeBackground
                label={dict.create.customTraitForm.traitType}
                selected={customTraitLayer}
                setSelected={(value) => setCustomTraitLayer(value)}
            />

            {customTraitLayer && (
                <div>
                    <InputFile
                        label={dict.create.customTraitForm.addTrait}
                        sizeStyle="lg"
                        onChange={handleTraitUpload}
                    />
                </div>
            )}

            <div>
                <p className="text-sm text-center">
                    {dict.create.customTraitForm.fileNameIsTraitName}
                </p>
            </div>

            <canvas
                ref={setCanvas}
                width={32}
                height={32}
                className="opacity-0"
            />
        </div>
    );
}
