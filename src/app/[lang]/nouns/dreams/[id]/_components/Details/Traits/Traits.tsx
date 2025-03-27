import { Dictionary } from '@/app/[lang]/dictionaries';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/details/traits/traits.module.css';
import TraitName from '@/app/[lang]/nouns/dreams/[id]/_components/Details/Traits/Name';
import DreamFromDB from '@/utils/dto/Dream/FromDB';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dict: Dictionary;
    dream: DreamFromDB;
}

export default function DetailsTraits({ className, dict, dream }: Props) {
    return (
        <div className={className}>
            <h3 className={styles.title}>{dict.dream.details.about}</h3>

            <dl>
                <div className={styles.dlItem}>
                    <dt className={styles.dt}>{dict.common.accessory}:</dt>

                    <dd className={styles.dd}>
                        <TraitName dict={dict} dream={dream} type="accessory" />
                    </dd>
                </div>

                <div className={styles.dlItem}>
                    <dt className={styles.dt}>{dict.common.background}:</dt>

                    <dd className={styles.dd}>
                        <TraitName
                            dict={dict}
                            dream={dream}
                            type="background"
                        />
                    </dd>
                </div>

                <div className={styles.dlItem}>
                    <dt className={styles.dt}>{dict.common.body}:</dt>

                    <dd className={styles.dd}>
                        <TraitName dict={dict} dream={dream} type="body" />
                    </dd>
                </div>

                <div className={styles.dlItem}>
                    <dt className={styles.dt}>{dict.common.glasses}:</dt>

                    <dd className={styles.dd}>
                        <TraitName dict={dict} dream={dream} type="glasses" />
                    </dd>
                </div>

                <div className={styles.dlItem}>
                    <dt className={styles.dt}>{dict.common.head}:</dt>

                    <dd className={styles.dd}>
                        <TraitName dict={dict} dream={dream} type="head" />
                    </dd>
                </div>
            </dl>
        </div>
    );
}
