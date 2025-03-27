import styles from '@/app/[lang]/nouns/dreams/_styles/dream/list/item.module.css';
import Link from 'next/link';
import DreamFromDB from '@/utils/dto/Dream/FromDB';
import LocalisedNumber from '@/app/_components/LocalisedNumber';
import { DreamImageFromSeed } from '@/app/[lang]/nouns/dreams/_components/Dream/Image/FromSeed';
import { NounTraitLayer } from '@/utils/enums/Noun/TraitLayer';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dream: DreamFromDB;
}

export default function DreamListItem({ dream }: Props) {
    return (
        <Link href={`/nouns/dreams/${dream.id}`}>
            <div
                className={styles.container}
                style={{ animationDelay: `${(Math.random() * 2).toFixed(2)}s` }}
            >
                <DreamImageFromSeed
                    seed={{
                        accessory:
                            dream.custom_trait_layer ===
                            NounTraitLayer.Accessory
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
                    }}
                />

                <label className={styles.label}>
                    <LocalisedNumber number={dream.id} removeCommasAndPeriods />
                </label>
            </div>
        </Link>
    );
}
