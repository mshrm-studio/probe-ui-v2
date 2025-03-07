import { Dictionary } from '@/app/[lang]/dictionaries';
import NounFromDB from '@/utils/dto/Noun/FromDB';
import styles from '@/app/[lang]/nouns/[id]/_styles/details/traits.module.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dict: Dictionary;
    noun: NounFromDB;
}

export default function DetailsTraits({ className, dict, noun }: Props) {
    return (
        <div className={className}>
            <dl>
                <div className={styles.dlItem}>
                    <dt className={styles.dt}>{dict.common.accessory}:</dt>

                    <dd className={styles.dd}>
                        {dict.traits[noun.accessory_name]}
                    </dd>
                </div>

                <div className={styles.dlItem}>
                    <dt className={styles.dt}>{dict.common.body}:</dt>

                    <dd className={styles.dd}>{dict.traits[noun.body_name]}</dd>
                </div>

                <div className={styles.dlItem}>
                    <dt className={styles.dt}>{dict.common.glasses}:</dt>

                    <dd className={styles.dd}>
                        {dict.traits[noun.glasses_name]}
                    </dd>
                </div>

                <div className={styles.dlItem}>
                    <dt className={styles.dt}>{dict.common.head}:</dt>

                    <dd className={styles.dd}>{dict.traits[noun.head_name]}</dd>
                </div>

                {noun.area && (
                    <div className={styles.dlItem}>
                        <dt className={styles.dt}>Area:</dt>

                        <dd className={styles.dd}>
                            {noun.area}
                            <span className="lowercase">px</span>
                        </dd>
                    </div>
                )}

                {noun.weight && (
                    <div className={styles.dlItem}>
                        <dt className={styles.dt}>Brightness:</dt>

                        <dd className={styles.dd}>
                            {noun.weight}
                            <span className="lowercase">lm</span>
                        </dd>
                    </div>
                )}
            </dl>
        </div>
    );
}
