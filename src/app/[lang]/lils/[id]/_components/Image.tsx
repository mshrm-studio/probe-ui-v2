import LilFromDB from '@/utils/dto/Lil/FromDB';
import LilImageFromSeed from '@/app/[lang]/lils/_components/Lil/Image/FromSeed';

interface Props {
    lil: LilFromDB;
}

export default function Image({ lil }: Props) {
    return (
        <LilImageFromSeed
            seed={{
                accessory: lil.accessory_index,
                background: lil.background_index,
                body: lil.body_index,
                glasses: lil.glasses_index,
                head: lil.head_index,
            }}
        />
    );
}
