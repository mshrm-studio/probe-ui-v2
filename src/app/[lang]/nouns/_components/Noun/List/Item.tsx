import styles from '@/app/[lang]/nouns/_styles/noun/list/item.module.css';
import Link from 'next/link';
import NormalisedNoun from '@/utils/dto/NormalisedNoun';
import { Dictionary } from '@/app/[lang]/dictionaries';
import dynamic from 'next/dynamic';
import LocalisedNumber from '@/app/_components/LocalisedNumber';
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
                style={{ animationDelay: `${(Math.random() * 2).toFixed(2)}s` }}
            >
                <NounImageFromSeed seed={noun.seed} />

                <label className={styles.label}>
                    <LocalisedNumber number={noun.id} removeCommasAndPeriods />
                </label>

                {atAuction && (
                    <div className={styles.bidBadge}>
                        {dict.nouns.noun.list.item.bid}
                    </div>
                )}
            </div>
        </Link>
    );
}
