import NounFromDB from '@/utils/dto/Noun/FromDB';
import NounImageFromSeed from '@/app/[lang]/nouns/_components/Noun/Image/FromSeed';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    noun: NounFromDB;
}

export default function Image({ className, noun }: Props) {
    return (
        <div className={className}>
            <NounImageFromSeed
                seed={{
                    accessory: noun.accessory_index,
                    background: noun.background_index,
                    body: noun.body_index,
                    glasses: noun.glasses_index,
                    head: noun.head_index,
                }}
            />
        </div>
    );
}
