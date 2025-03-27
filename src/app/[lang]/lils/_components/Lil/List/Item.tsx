import styles from '@/app/[lang]/lils/_styles/lil/list/item.module.css';
import Link from 'next/link';
import NormalisedLil from '@/utils/dto/NormalisedLil';
import dynamic from 'next/dynamic';
import LocalisedNumber from '@/app/_components/LocalisedNumber';
const LilImageFromSeed = dynamic(
    () => import('@/app/[lang]/lils/_components/Lil/Image/FromSeed')
);

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    lil: NormalisedLil;
}

export default function LilListItem({ lil }: Props) {
    return (
        <Link href={`/lils/${lil.id}`}>
            <div
                className={styles.container}
                style={{ animationDelay: `${(Math.random() * 2).toFixed(2)}s` }}
            >
                <LilImageFromSeed seed={lil.seed} />

                <label className={styles.label}>
                    <LocalisedNumber number={lil.id} />
                </label>
            </div>
        </Link>
    );
}
