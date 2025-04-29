'use client';

import useAuctionClient from '@/hooks/useAuctionClient';
import Link from 'next/link';
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

    const clientId =
        'bid' in props
            ? props.bid.clientId
            : props.auction.clientId ??
              props.auction.bids?.[0]?.clientId ??
              null;

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
