import LilFromSubgraph from '@/utils/dto/Lil/FromSubgraph';
import ListItem from '@/app/[lang]/lils/_components/Lil/List/Item';
import styles from '@/app/[lang]/lils/_styles/lil/list/list.module.css';
import LilFromDB from '@/utils/dto/Lil/FromDB';
import useNormalisedLilList from '@/hooks/useNormalisedLilList';
import AuctionFromSubgraph from '@/utils/dto/Noun/Auction/FromSubgraph';
import { Dictionary } from '@/app/[lang]/dictionaries';

interface Props extends React.HTMLAttributes<HTMLUListElement> {
    absentAuctions: AuctionFromSubgraph[];
    auctions: AuctionFromSubgraph[];
    dict: Dictionary;
    lils: LilFromDB[] | LilFromSubgraph[];
}

export default function LilList({
    absentAuctions,
    auctions,
    dict,
    lils,
}: Props) {
    const normalisedLilList = useNormalisedLilList(lils);

    return (
        <ul className={styles.list}>
            {absentAuctions.map((auction) => (
                <li key={auction.noun.id}>
                    <ListItem
                        atAuction
                        dict={dict}
                        lil={{
                            id: Number(auction.noun.id),
                            seed: auction.noun.seed,
                        }}
                    />
                </li>
            ))}

            {normalisedLilList.map((lil) => (
                <li key={lil.id}>
                    <ListItem
                        atAuction={auctions
                            .map((a) => a.noun.id)
                            .includes(String(lil.id))}
                        dict={dict}
                        lil={lil}
                    />
                </li>
            ))}
        </ul>
    );
}
