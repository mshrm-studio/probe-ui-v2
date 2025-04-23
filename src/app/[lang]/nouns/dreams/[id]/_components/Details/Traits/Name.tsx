import { Dictionary } from '@/app/[lang]/dictionaries';
import DreamFromDB from '@/utils/dto/Dream/FromDB';
import { NounTraitLayer } from '@/utils/enums/Noun/TraitLayer';
import startCase from 'lodash/startCase';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/details/traits/name.module.css';
import Link from 'next/link';

interface Props {
    dict: Dictionary;
    dream: DreamFromDB;
    type: NounTraitLayer;
}

export default function DetailsTraitsName({ dict, dream, type }: Props) {
    if (dream.accessory && type === NounTraitLayer.Accessory) {
        return <span>{dict.traits[dream.accessory.name]}</span>;
    }

    if (type === NounTraitLayer.Background) {
        return (
            <span>
                {
                    dict.traits[
                        `background-${
                            dream.background_seed_id == 0 ? 'cool' : 'warm'
                        }`
                    ]
                }
            </span>
        );
    }

    if (dream.body && type === NounTraitLayer.Body) {
        return <span>{dict.traits[dream.body.name]}</span>;
    }

    if (dream.glasses && type === NounTraitLayer.Glasses) {
        return <span>{dict.traits[dream.glasses.name]}</span>;
    }

    if (dream.head && type === NounTraitLayer.Head) {
        return <span>{dict.traits[dream.head.name]}</span>;
    }

    if (type === dream.custom_trait_layer) {
        return (
            <span>
                <span>
                    {startCase(
                        new URL(dream.custom_trait_image_url).pathname
                            .split('/')
                            .pop()
                            ?.replace(/\.[^/.]+$/, '')
                    )}
                </span>

                <span className={styles.newBadge}>
                    {dict.dream.details.new}
                </span>

                <Link
                    href={`/nouns/dreams/${dream.id}/propose`}
                    className={styles.proposeLink}
                >
                    {dict.dream.details.propose}
                </Link>
            </span>
        );
    }

    return null;
}
