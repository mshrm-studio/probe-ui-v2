import NounFromDB from '@/utils/dto/Noun/FromDB';
import Colors from '@/app/[lang]/nouns/[id]/_components/Details/Colors';
import Traits from '@/app/[lang]/nouns/[id]/_components/Details/Traits/Traits';
import { Dictionary } from '@/app/[lang]/dictionaries';
import styles from '@/app/[lang]/nouns/[id]/_styles/details/details.module.css';
import AuctionFromSubgraph from '@/utils/dto/Noun/Auction/FromSubgraph';
import WinningBid from '@/app/[lang]/nouns/[id]/_components/Details/WinningBid';
import CurrentOwner from '@/app/[lang]/nouns/[id]/_components/Details/CurrentOwner';
import Auction from '@/app/[lang]/nouns/[id]/_components/Details/Auction/Auction';

interface Props {
    auction?: AuctionFromSubgraph;
    dict: Dictionary;
    noun?: NounFromDB;
}

export default function Details({ auction, dict, noun }: Props) {
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

            {noun && (
                <Colors
                    noun={noun}
                    dict={dict}
                    className={styles.colorsContainer}
                />
            )}

            <Traits
                auction={auction}
                noun={noun}
                dict={dict}
                className={styles.traitsContainer}
            />
        </div>
    );
}
