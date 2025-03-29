'use client';

import { useContext, useEffect, useState, useCallback } from 'react';
import { AuctionHouseContext } from '@/context/AuctionHouse';
import { formatEther } from 'ethers';
import AuctionFromContract from '@/utils/dto/Noun/Auction/FromContract';

const useLiveAuction = () => {
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
        console.log('handleAuctionBid:', sender, value, extended);
        setAuction((prev) => {
            if (!prev) return prev;

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
        console.log('Using wsContract:', wsContract);

        if (!wsContract) return;

        console.log('Creating AuctionBid listener');

        wsContract.on('AuctionBid', (nounId, sender, value, extended) => {
            console.log('on.AuctionBid:', nounId, sender, value, extended);

            handleAuctionBid(nounId, sender, value, extended);
        });

        return () => {
            console.log('Destroying AuctionBid listener');

            wsContract.off('AuctionBid', (nounId, sender, value, extended) => {
                handleAuctionBid(nounId, sender, value, extended);
            });
        };
    }, [wsContract]);

    return auction;
};

export default useLiveAuction;
