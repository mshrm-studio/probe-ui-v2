import DreamSeed from '@/utils/dto/Dream/Seed';
import { DreamImageFromSeed } from '@/app/[lang]/nouns/dreams/_components/Dream/Image/FromSeed';

interface Props {
    seed: DreamSeed;
}

export default function Preview({ seed }: Props) {
    // console.log('[Preview] render with seed:', seed);
    return <DreamImageFromSeed seed={seed} />;
}
