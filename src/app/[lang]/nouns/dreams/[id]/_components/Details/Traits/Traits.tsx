import { Dictionary } from '@/app/[lang]/dictionaries';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/details/traits/traits.module.css';
import TraitName from '@/app/[lang]/nouns/dreams/[id]/_components/Details/Traits/Name';
import DreamFromDB from '@/utils/dto/Dream/FromDB';
import { NounTraitLayer } from '@/utils/enums/Noun/TraitLayer';

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
                        <TraitName
                            dict={dict}
                            dream={dream}
                            type={NounTraitLayer.Accessory}
                        />
                    </dd>
                </div>

                <div className={styles.dlItem}>
                    <dt className={styles.dt}>{dict.common.background}:</dt>

                    <dd className={styles.dd}>
                        <TraitName
                            dict={dict}
                            dream={dream}
                            type={NounTraitLayer.Background}
                        />
                    </dd>
                </div>

                <div className={styles.dlItem}>
                    <dt className={styles.dt}>{dict.common.body}:</dt>

                    <dd className={styles.dd}>
                        <TraitName
                            dict={dict}
                            dream={dream}
                            type={NounTraitLayer.Body}
                        />
                    </dd>
                </div>

                <div className={styles.dlItem}>
                    <dt className={styles.dt}>{dict.common.glasses}:</dt>

                    <dd className={styles.dd}>
                        <TraitName
                            dict={dict}
                            dream={dream}
                            type={NounTraitLayer.Glasses}
                        />
                    </dd>
                </div>

                <div className={styles.dlItem}>
                    <dt className={styles.dt}>{dict.common.head}:</dt>

                    <dd className={styles.dd}>
                        <TraitName
                            dict={dict}
                            dream={dream}
                            type={NounTraitLayer.Head}
                        />
                    </dd>
                </div>
            </dl>
        </div>
    );
}
