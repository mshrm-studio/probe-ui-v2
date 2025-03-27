import DreamFromDB from '@/utils/dto/Dream/FromDB';
import { DreamImageFromSeed } from '@/app/[lang]/nouns/dreams/_components/Dream/Image/FromSeed';
import { NounTraitLayer } from '@/utils/enums/Noun/TraitLayer';

interface Props {
    dream: DreamFromDB;
}

export default function Image({ dream }: Props) {
    return (
        <DreamImageFromSeed
            seed={{
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
            }}
        />
    );
}
