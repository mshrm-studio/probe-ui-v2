import { Dictionary } from '@/app/[lang]/dictionaries';
import LilFromDB from '@/utils/dto/Lil/FromDB';
import styles from '@/app/[lang]/lils/[id]/_styles/details/traits/traits.module.css';
import AuctionFromSubgraph from '@/utils/dto/Noun/Auction/FromSubgraph';
import TraitName from '@/app/[lang]/lils/[id]/_components/Details/Traits/Name';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    auction?: AuctionFromSubgraph;
    dict: Dictionary;
    lil?: LilFromDB;
}

export default function DetailsTraits({
    auction,
    className,
    dict,
    lil,
}: Props) {
    return (
        <div className={className}>
            <h3 className={styles.title}>{dict.lil.details.about}</h3>

            <dl>
                <div className={styles.dlItem}>
                    <dt className={styles.dt}>{dict.common.accessory}:</dt>

                    <dd className={styles.dd}>
                        <TraitName
                            auction={auction}
                            dict={dict}
                            lil={lil}
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
                            lil={lil}
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
                            lil={lil}
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
                            lil={lil}
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
                            lil={lil}
                            type="head"
                        />
                    </dd>
                </div>

                {lil?.area && (
                    <div className={styles.dlItem}>
                        <dt className={styles.dt}>
                            {dict.lil.details.traits.area}:
                        </dt>

                        <dd className={styles.dd}>
                            {lil.area}
                            <span className="lowercase">px</span>
                        </dd>
                    </div>
                )}

                {lil?.weight && (
                    <div className={styles.dlItem}>
                        <dt className={styles.dt}>
                            {dict.lil.details.traits.brightness}:
                        </dt>

                        <dd className={styles.dd}>
                            {lil.weight}
                            <span className="lowercase">lm</span>
                        </dd>
                    </div>
                )}
            </dl>
        </div>
    );
}
