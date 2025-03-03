import NounFromSubgraph from '@/utils/dto/Noun/FromSubgraph';
import NounImageFromSeed from '@/app/_components/Noun/Image/FromSeed';
import styles from '@/app/_styles/noun/list/item.module.css';
import Link from 'next/link';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    noun: NounFromSubgraph;
}

export default function NounListItem({ noun }: Props) {
    return (
        <Link href={`/nouns/${noun.id}`}>
            <div className={styles.container}>
                <NounImageFromSeed seed={noun.seed} />

                <label className={styles.label}>{noun.id}</label>
            </div>
        </Link>
    );
}
