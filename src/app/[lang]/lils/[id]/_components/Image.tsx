import LilFromDB from '@/utils/dto/Lil/FromDB';
import LilImageFromSeed from '@/app/[lang]/lils/_components/Lil/Image/FromSeed';
import AuctionFromSubgraph from '@/utils/dto/Lil/Auction/FromSubgraph';

interface Props {
    auction?: AuctionFromSubgraph;
    lil?: LilFromDB;
}

export default function Image({ auction, lil }: Props) {
    if (lil) {
        return (
            <LilImageFromSeed
                seed={{
                    accessory: lil.accessory_index,
                    background: lil.background_index,
                    body: lil.body_index,
                    glasses: lil.glasses_index,
                    head: lil.head_index,
                }}
            />
        );
    }

    if (auction) {
        return (
            <LilImageFromSeed
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
