import { Dictionary } from '@/app/[lang]/dictionaries';
import DreamFromDB from '@/utils/dto/Dream/FromDB';

interface Props {
    dict: Dictionary;
    dream: DreamFromDB;
    type: 'accessory' | 'background' | 'body' | 'glasses' | 'head';
}

export default function DetailsTraitsName({ dict, dream, type }: Props) {
    if (dream.accessory && type === 'accessory') {
        return <>{dict.traits[dream.accessory.name]}</>;
    }

    if (type === 'background') {
        return (
            <>
                {
                    dict.traits[
                        `background-${
                            dream.background_seed_id == 0 ? 'cool' : 'warm'
                        }`
                    ]
                }
            </>
        );
    }

    if (dream.body && type === 'body') {
        return <>{dict.traits[dream.body.name]}</>;
    }

    if (dream.glasses && type === 'glasses') {
        return <>{dict.traits[dream.glasses.name]}</>;
    }

    if (dream.head && type === 'head') {
        return <>{dict.traits[dream.head.name]}</>;
    }

    return null;
}
