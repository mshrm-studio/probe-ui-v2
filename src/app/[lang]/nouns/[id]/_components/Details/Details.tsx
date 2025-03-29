import NounFromDB from '@/utils/dto/Noun/FromDB';
import Colors from '@/app/[lang]/nouns/[id]/_components/Details/Colors';
import Traits from '@/app/[lang]/nouns/[id]/_components/Details/Traits/Traits';
import { Dictionary } from '@/app/[lang]/dictionaries';
import styles from '@/app/[lang]/nouns/[id]/_styles/details/details.module.css';
import AuctionFromSubgraph from '@/utils/dto/Noun/Auction/FromSubgraph';
import WinningBid from '@/app/[lang]/nouns/[id]/_components/Details/WinningBid';
import Settler from '@/app/[lang]/nouns/[id]/_components/Details/Settler';
import CurrentOwner from '@/app/[lang]/nouns/[id]/_components/Details/CurrentOwner';
import Auction from '@/app/[lang]/nouns/[id]/_components/Details/Auction/Auction';
import RpcProvider from '@/context/Rpc';
import LocalisedNumber from '@/app/_components/LocalisedNumber';
import AuctionHouseProvider from '@/context/AuctionHouse';

interface Props {
    auction?: AuctionFromSubgraph;
    dict: Dictionary;
    noun?: NounFromDB;
}

export default function Details({ auction, dict, noun }: Props) {
    return (
        <RpcProvider>
            <div className={styles.container}>
                <div className={styles.headingContainer}>
                    <h1 className={styles.heading}>
                        {dict.noun.details.noun}{' '}
                        <LocalisedNumber
                            number={auction?.noun?.id || noun?.token_id || 0}
                            removeCommasAndPeriods
                        />
                    </h1>
                </div>

                {noun && noun.settled_by_address && (
                    <Settler
                        dict={dict}
                        settler={noun.settled_by_address}
                        className={styles.settlerContainer}
                    />
                )}

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
                    <AuctionHouseProvider>
                        <Auction auction={auction} dict={dict} />
                    </AuctionHouseProvider>
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
        </RpcProvider>
    );
}
