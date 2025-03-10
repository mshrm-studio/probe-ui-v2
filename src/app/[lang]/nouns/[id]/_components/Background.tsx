import AuctionFromSubgraph from '@/utils/dto/Auction/FromSubgraph';
import NounFromDB from '@/utils/dto/Noun/FromDB';
import { useMemo } from 'react';

interface Props {
    auction?: AuctionFromSubgraph;
    children: any;
    noun?: NounFromDB;
}

export default function Background({ auction, children, noun }: Props) {
    const bgIndex = useMemo(() => {
        return noun ? noun?.background_index : auction?.noun.seed.background;
    }, [auction, noun]);

    return (
        <div
            style={{
                backgroundColor: bgIndex === 0 ? '#d5d7e1' : '#e1d7d5',
            }}
        >
            {children}
        </div>
    );
}
