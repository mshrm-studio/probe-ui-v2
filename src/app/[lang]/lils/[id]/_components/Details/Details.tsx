import LilFromDB from '@/utils/dto/Lil/FromDB';
import Colors from '@/app/[lang]/lils/[id]/_components/Details/Colors';
import Traits from '@/app/[lang]/lils/[id]/_components/Details/Traits/Traits';
import { Dictionary } from '@/app/[lang]/dictionaries';
import styles from '@/app/[lang]/lils/[id]/_styles/details/details.module.css';
import AuctionFromSubgraph from '@/utils/dto/Lil/Auction/FromSubgraph';
import WinningBid from '@/app/[lang]/lils/[id]/_components/Details/WinningBid';
import CurrentOwner from '@/app/[lang]/lils/[id]/_components/Details/CurrentOwner';
import Auction from '@/app/[lang]/lils/[id]/_components/Details/Auction/Auction';

interface Props {
    auction?: AuctionFromSubgraph;
    dict: Dictionary;
    lil?: LilFromDB;
}

export default function Details({ auction, dict, lil }: Props) {
    return (
        <div className={styles.container}>
            {auction?.settled && (
                <>
                    <WinningBid
                        auction={auction}
                        dict={dict}
                        className={styles.winningBidContainer}
                    />

                    <CurrentOwner
                        auction={auction}
                        dict={dict}
                        className={styles.currentOwnerContainer}
                    />
                </>
            )}

            {auction && auction.settled === false && (
                <Auction auction={auction} dict={dict} />
            )}

            {lil && (
                <Colors
                    lil={lil}
                    dict={dict}
                    className={styles.colorsContainer}
                />
            )}

            <Traits
                auction={auction}
                lil={lil}
                dict={dict}
                className={styles.traitsContainer}
            />
        </div>
    );
}
