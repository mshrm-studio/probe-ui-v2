import { Dictionary } from '@/app/[lang]/dictionaries';
import LilFromDB from '@/utils/dto/Lil/FromDB';
import { NounTraitLayer } from '@/utils/enums/Noun/TraitLayer';

interface Props {
    dict: Dictionary;
    lil: LilFromDB;
    type: NounTraitLayer;
}

export default function DetailsTraitsName({ dict, lil, type }: Props) {
    if (type === 'accessory') {
        return <>{dict.traits[lil.accessory_name]}</>;
    }

    if (type === 'background') {
        return (
            <>
                {
                    dict.traits[
                        `background-${
                            lil.background_index == 0 ? 'cool' : 'warm'
                        }`
                    ]
                }
            </>
        );
    }

    if (type === 'body') {
        return <>{dict.traits[lil.body_name]}</>;
    }

    if (type === 'glasses') {
        return <>{dict.traits[lil.glasses_name]}</>;
    }

    if (type === 'head') {
        return <>{dict.traits[lil.head_name]}</>;
    }

    return <></>;
}
