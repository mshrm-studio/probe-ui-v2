import { Dictionary } from '@/app/[lang]/dictionaries';
import AuctionFromSubgraph from '@/utils/dto/Auction/FromSubgraph';
import Button from '@/app/_components/Button';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';

interface Props {
    auction: AuctionFromSubgraph;
    dict: Dictionary;
}

export default function DetailsAuctionForm({ auction, dict }: Props) {
    const { isConnected } = useAppKitAccount();
    const { open } = useAppKit();

    if (!isConnected) {
        return (
            <div>
                <Button onClick={() => open()}>
                    {dict.noun.details.auction.loginToBid}
                </Button>
            </div>
        );
    }

    return (
        <div>
            <Button>{dict.noun.details.auction.bid}</Button>
        </div>
    );
}
