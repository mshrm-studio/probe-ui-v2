import NounFromSubgraph from '@/utils/dto/Noun/FromSubgraph';
import ListItem from '@/app/[lang]/nouns/_components/Noun/List/Item';
import styles from '@/app/[lang]/nouns/_styles/noun/list/list.module.css';
import NounFromDB from '@/utils/dto/Noun/FromDB';
import useNormalisedNounList from '@/hooks/useNormalisedNounList';
import AuctionFromSubgraph from '@/utils/dto/Auction/FromSubgraph';
import { Dictionary } from '@/app/[lang]/dictionaries';

interface Props extends React.HTMLAttributes<HTMLUListElement> {
    absentAuctions: AuctionFromSubgraph[];
    auctions: AuctionFromSubgraph[];
    dict: Dictionary;
    nouns: NounFromDB[] | NounFromSubgraph[];
}

export default function NounList({
    absentAuctions,
    auctions,
    dict,
    nouns,
}: Props) {
    const normalisedNounList = useNormalisedNounList(nouns);

    return (
        <ul className={styles.list}>
            {absentAuctions.map((auction) => (
                <li key={auction.noun.id}>
                    <ListItem
                        atAuction
                        dict={dict}
                        noun={{
                            id: Number(auction.noun.id),
                            seed: auction.noun.seed,
                        }}
                    />
                </li>
            ))}

            {normalisedNounList.map((noun) => (
                <li key={noun.id}>
                    <ListItem
                        atAuction={auctions
                            .map((a) => a.noun.id)
                            .includes(String(noun.id))}
                        dict={dict}
                        noun={noun}
                    />
                </li>
            ))}
        </ul>
    );
}
