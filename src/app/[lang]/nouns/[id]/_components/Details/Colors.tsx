import { Dictionary } from '@/app/[lang]/dictionaries';
import NounFromDB from '@/utils/dto/Noun/FromDB';
import styles from '@/app/[lang]/nouns/[id]/_styles/details/colors.module.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dict: Dictionary;
    noun: NounFromDB;
}

export default function DetailsColors({ className, dict, noun }: Props) {
    if (!noun.color_histogram) return null;

    return (
        <div className={className}>
            <h3 className={styles.title}>{dict.noun.details.colors}</h3>

            <div className={styles.colorSquares}>
                {Object.entries(noun.color_histogram).map(
                    ([color, _count], idx) => (
                        <div
                            key={idx}
                            style={{ backgroundColor: color }}
                            className={styles.colorSquare}
                            title={color}
                        ></div>
                    )
                )}
            </div>
        </div>
    );
}
