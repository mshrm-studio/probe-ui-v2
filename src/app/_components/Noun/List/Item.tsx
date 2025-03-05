import NounFromSubgraph from '@/utils/dto/Noun/FromSubgraph';
import NounImageFromSeed from '@/app/_components/Noun/Image/FromSeed';
import styles from '@/app/_styles/noun/list/item.module.css';
import Link from 'next/link';
import NounFromDB, { isNounFromDB } from '@/utils/dto/Noun/FromDB';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    noun: NounFromDB | NounFromSubgraph;
}

export default function NounListItem({ noun }: Props) {
    const normalisedNoun = isNounFromDB(noun)
        ? {
              id: noun.token_id,
              seed: {
                  accessory: noun.accessory_index,
                  background: noun.background_index,
                  body: noun.body_index,
                  glasses: noun.glasses_index,
                  head: noun.head_index,
              },
          }
        : noun;

    return (
        <Link href={`/nouns/${normalisedNoun.id}`}>
            <div className={styles.container}>
                <NounImageFromSeed seed={normalisedNoun.seed} />

                <label className={styles.label}>{normalisedNoun.id}</label>
            </div>
        </Link>
    );
}
