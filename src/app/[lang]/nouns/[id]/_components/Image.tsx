import NounFromDB from '@/utils/dto/Noun/FromDB';
import NounImageFromSeed from '@/app/[lang]/nouns/_components/Noun/Image/FromSeed';
import AuctionFromSubgraph from '@/utils/dto/Noun/Auction/FromSubgraph';

interface Props {
    auction?: AuctionFromSubgraph;
    noun?: NounFromDB;
}

export default function Image({ auction, noun }: Props) {
    if (noun) {
        return (
            <NounImageFromSeed
                seed={{
                    accessory: noun.accessory_index,
                    background: noun.background_index,
                    body: noun.body_index,
                    glasses: noun.glasses_index,
                    head: noun.head_index,
                }}
            />
        );
    }

    if (auction) {
        return (
            <NounImageFromSeed
                seed={{
                    accessory: auction.noun.seed.accessory,
                    background: auction.noun.seed.background,
                    body: auction.noun.seed.body,
                    glasses: auction.noun.seed.glasses,
                    head: auction.noun.seed.head,
                }}
            />
        );
    }

    return null;
}
