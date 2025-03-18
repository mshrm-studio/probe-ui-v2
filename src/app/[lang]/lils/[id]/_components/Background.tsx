import AuctionFromSubgraph from '@/utils/dto/Noun/Auction/FromSubgraph';
import LilFromDB from '@/utils/dto/Lil/FromDB';
import { useMemo } from 'react';

interface Props {
    auction?: AuctionFromSubgraph;
    children: any;
    lil?: LilFromDB;
}

export default function Background({ auction, children, lil }: Props) {
    const bgIndex = useMemo(() => {
        return lil ? lil?.background_index : auction?.noun.seed.background;
    }, [auction, lil]);

    return (
        <div
            style={{
                backgroundColor: bgIndex == 0 ? '#d5d7e1' : '#e1d7d5',
            }}
        >
            {children}
        </div>
    );
}
