import NounFromSubgraph from '@/utils/dto/Noun/FromSubgraph';
import NounImageFromSeed from '@/app/[lang]/nouns/_components/Noun/Image/FromSeed';
import styles from '@/app/[lang]/nouns/_styles/noun/list/item.module.css';
import Link from 'next/link';
import NounFromDB, { isNounFromDB } from '@/utils/dto/Noun/FromDB';
import useNormalisedNoun from '@/hooks/useNormalisedNoun';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    noun: NounFromDB | NounFromSubgraph;
}

export default function NounListItem({ noun }: Props) {
    const normalisedNoun = useNormalisedNoun(noun);

    return (
        <Link href={`/nouns/${normalisedNoun.id}`}>
            <div className={styles.container}>
                <NounImageFromSeed seed={normalisedNoun.seed} />

                <label className={styles.label}>{normalisedNoun.id}</label>
            </div>
        </Link>
    );
}
