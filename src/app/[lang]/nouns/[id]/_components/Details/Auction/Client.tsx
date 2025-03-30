'use client';

import useAuctionClient from '@/hooks/useAuctionClient';
import Link from 'next/link';
import { useMemo } from 'react';
import AuctionFromSubgraph, {
    Bid,
} from '@/utils/dto/Noun/Auction/FromSubgraph';
import useDictionary from '@/hooks/useDictionary';

type Props =
    | {
          auction: AuctionFromSubgraph;
      }
    | { bid: Bid };

export default function AuctionClient(props: Props) {
    const dict = useDictionary();

    const clientId = useMemo(() => {
        if ('bid' in props) return props.bid.clientId;

        if (props.auction.clientId) return props.auction.clientId;

        if (props.auction.bids && props.auction.bids.length > 0)
            return props.auction.bids[0].clientId;

        return null;
    }, [props]);

    const client = useAuctionClient(clientId);

    if (!client) return null;

    return (
        <span>
            {dict.noun.details.auction.via}{' '}
            {client.url ? (
                <Link href={client.url} target="_blank" className="text-link">
                    {client.name}
                </Link>
            ) : (
                <>{client.name}</>
            )}
        </span>
    );
}
