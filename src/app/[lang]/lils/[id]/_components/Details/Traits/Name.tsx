import { Dictionary } from '@/app/[lang]/dictionaries';
import LilFromDB from '@/utils/dto/Lil/FromDB';
import { NounTraitLayer } from '@/utils/enums/Noun/TraitLayer';

interface Props {
    dict: Dictionary;
    lil: LilFromDB;
    type: NounTraitLayer;
}

export default function DetailsTraitsName({ dict, lil, type }: Props) {
    if (type === NounTraitLayer.Accessory) {
        return <span>{dict.traits[lil.accessory_name]}</span>;
    }

    if (type === 'background') {
        return (
            <span>
                {
                    dict.traits[
                        `background-${
                            lil.background_index == 0 ? 'cool' : 'warm'
                        }`
                    ]
                }
            </span>
        );
    }

    if (type === NounTraitLayer.Body) {
        return <span>{dict.traits[lil.body_name]}</span>;
    }

    if (type === NounTraitLayer.Glasses) {
        return <span>{dict.traits[lil.glasses_name]}</span>;
    }

    if (type === NounTraitLayer.Head) {
        return <span>{dict.traits[lil.head_name]}</span>;
    }

    return null;
}
