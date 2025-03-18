import { Dictionary } from '@/app/[lang]/dictionaries';
import LilFromDB from '@/utils/dto/Lil/FromDB';
import styles from '@/app/[lang]/lils/[id]/_styles/details/colors.module.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dict: Dictionary;
    lil: LilFromDB;
}

export default function DetailsColors({ className, dict, lil }: Props) {
    if (!lil.color_histogram) return null;

    return (
        <div className={className}>
            <h3 className={styles.title}>{dict.lil.details.colors}</h3>

            <div className={styles.colorSquares}>
                {Object.entries(lil.color_histogram).map(
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
