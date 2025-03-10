import { Dictionary } from '@/app/[lang]/dictionaries';
import NounFromDB from '@/utils/dto/Noun/FromDB';
import styles from '@/app/[lang]/nouns/[id]/_styles/details/traits/traits.module.css';
import AuctionFromSubgraph from '@/utils/dto/Auction/FromSubgraph';
import TraitName from '@/app/[lang]/nouns/[id]/_components/Details/Traits/Name';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    auction?: AuctionFromSubgraph;
    dict: Dictionary;
    noun?: NounFromDB;
}

export default function DetailsTraits({
    auction,
    className,
    dict,
    noun,
}: Props) {
    return (
        <div className={className}>
            <h3 className={styles.title}>{dict.noun.details.about}</h3>

            <dl>
                <div className={styles.dlItem}>
                    <dt className={styles.dt}>{dict.common.accessory}:</dt>

                    <dd className={styles.dd}>
                        <TraitName
                            auction={auction}
                            dict={dict}
                            noun={noun}
                            type="accessory"
                        />
                    </dd>
                </div>

                <div className={styles.dlItem}>
                    <dt className={styles.dt}>{dict.common.background}:</dt>

                    <dd className={styles.dd}>
                        <TraitName
                            auction={auction}
                            dict={dict}
                            noun={noun}
                            type="background"
                        />
                    </dd>
                </div>

                <div className={styles.dlItem}>
                    <dt className={styles.dt}>{dict.common.body}:</dt>

                    <dd className={styles.dd}>
                        <TraitName
                            auction={auction}
                            dict={dict}
                            noun={noun}
                            type="body"
                        />
                    </dd>
                </div>

                <div className={styles.dlItem}>
                    <dt className={styles.dt}>{dict.common.glasses}:</dt>

                    <dd className={styles.dd}>
                        <TraitName
                            auction={auction}
                            dict={dict}
                            noun={noun}
                            type="glasses"
                        />
                    </dd>
                </div>

                <div className={styles.dlItem}>
                    <dt className={styles.dt}>{dict.common.head}:</dt>

                    <dd className={styles.dd}>
                        <TraitName
                            auction={auction}
                            dict={dict}
                            noun={noun}
                            type="head"
                        />
                    </dd>
                </div>

                {noun?.area && (
                    <div className={styles.dlItem}>
                        <dt className={styles.dt}>Area:</dt>

                        <dd className={styles.dd}>
                            {noun.area}
                            <span className="lowercase">px</span>
                        </dd>
                    </div>
                )}

                {noun?.weight && (
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
