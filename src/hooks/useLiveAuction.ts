'use client';

import { useContext, useEffect, useState, useCallback } from 'react';
import { AuctionHouseContext } from '@/context/AuctionHouse';
import { formatEther } from 'ethers';
import AuctionFromContract from '@/utils/dto/Noun/Auction/FromContract';
import useDictionary from '@/hooks/useDictionary';

const useLiveAuction = () => {
    const dict = useDictionary();

    const {
        httpAuctionHouseContract: httpContract,
        wsAuctionHouseContract: wsContract,
    } = useContext(AuctionHouseContext);

    const [auction, setAuction] = useState<AuctionFromContract | null>(null);

    const fetchAuctionDetails = useCallback(async () => {
        if (!httpContract) return;

        try {
            const { nounId, amount, startTime, endTime, bidder, settled } =
                await httpContract.auction();

            console.log(
                'AuctionFromContract:',
                nounId,
                amount,
                startTime,
                endTime,
                bidder,
                settled
            );

            setAuction({
                nounId: Number(nounId),
                amount: formatEther(amount),
                startTime: Number(startTime),
                endTime: Number(endTime),
                bidder,
                settled,
            });
        } catch (error) {
            console.error('Failed to fetch auction details:', error);
        }
    }, [httpContract]);

    const handleAuctionBid = (
        _nounId: number,
        sender: string,
        value: string,
        extended: boolean
    ) => {
        console.log(
            '[useLiveAuction] handleAuctionBid',
            sender,
            value,
            extended
        );

        console.log(
            '[useLiveAuction] handleAuctionBid, setAuction with following:',
            {
                amount: formatEther(value),
                bidder: sender,
            }
        );

        alert(
            dict.noun.details.action.newBidPlaced
                .replace(':amount', formatEther(value))
                .replace(':bidder', sender)
        );

        // EG 0xf193C62Bf66A2da6f4fa5Cacad6F75DcF7D7fA96 1000000000000n false

        setAuction((prev) => {
            console.log(
                '[useLiveAuction] Inside setAuction callback, prev =',
                prev
            );

            if (!prev) return prev;

            console.log(
                '[useLiveAuction] Inside setAuction callback, setting state =',
                {
                    ...prev,
                    amount: formatEther(value),
                    bidder: sender,
                }
            );

            return {
                ...prev,
                amount: formatEther(value),
                bidder: sender,
            };
        });

        // If the auction was extended, refresh the details
        if (extended) {
            fetchAuctionDetails();
        }
    };

    // Fetch the auction details whenever the contract or auction ID changes
    useEffect(() => {
        if (httpContract) {
            fetchAuctionDetails();
        }
    }, [httpContract]);

    // Subscribe to auction bid events and clean up on unmount
    useEffect(() => {
        if (!wsContract) return;

        wsContract.on('AuctionBid', (nounId, sender, value, extended) => {
            handleAuctionBid(nounId, sender, value, extended);
        });

        return () => {
            wsContract.off('AuctionBid', (nounId, sender, value, extended) => {
                handleAuctionBid(nounId, sender, value, extended);
            });
        };
    }, [wsContract]);

    return auction;
};

export default useLiveAuction;
