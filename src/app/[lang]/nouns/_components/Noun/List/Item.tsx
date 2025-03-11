import styles from '@/app/[lang]/nouns/_styles/noun/list/item.module.css';
import Link from 'next/link';
import NormalisedNoun from '@/utils/dto/NormalisedNoun';
import { Dictionary } from '@/app/[lang]/dictionaries';
import dynamic from 'next/dynamic';
const NounImageFromSeed = dynamic(
    () => import('@/app/[lang]/nouns/_components/Noun/Image/FromSeed')
);

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    atAuction?: boolean;
    dict: Dictionary;
    noun: NormalisedNoun;
}

export default function NounListItem({ atAuction, dict, noun }: Props) {
    return (
        <Link href={`/nouns/${noun.id}`}>
            <div
                className={styles.container}
                aria-live={atAuction ? 'assertive' : 'off'}
            >
                <NounImageFromSeed seed={noun.seed} />

                <label className={styles.label}>{noun.id}</label>

                {atAuction && (
                    <div className={styles.bidBadge}>
                        {dict.nouns.noun.list.item.bid}
                    </div>
                )}
            </div>
        </Link>
    );
}
