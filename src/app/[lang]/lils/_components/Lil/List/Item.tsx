import styles from '@/app/[lang]/lils/_styles/lil/list/item.module.css';
import Link from 'next/link';
import NormalisedLil from '@/utils/dto/NormalisedLil';
import { Dictionary } from '@/app/[lang]/dictionaries';
import dynamic from 'next/dynamic';
const LilImageFromSeed = dynamic(
    () => import('@/app/[lang]/lils/_components/Lil/Image/FromSeed')
);

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    atAuction?: boolean;
    dict: Dictionary;
    lil: NormalisedLil;
}

export default function LilListItem({ atAuction, dict, lil }: Props) {
    return (
        <Link href={`/lils/${lil.id}`}>
            <div
                className={styles.container}
                aria-live={atAuction ? 'assertive' : 'off'}
            >
                <LilImageFromSeed seed={lil.seed} />

                <label className={styles.label}>{lil.id}</label>

                {atAuction && (
                    <div className={styles.bidBadge}>
                        {dict.lils.lil.list.item.bid}
                    </div>
                )}
            </div>
        </Link>
    );
}
