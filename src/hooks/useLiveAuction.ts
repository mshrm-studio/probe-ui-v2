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
                '[hooks/useLiveAuction] httpContract.auction():',
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
            console.error(error);
        }
    }, [httpContract]);

    const handleAuctionBid = (
        _nounId: number,
        sender: string,
        value: string,
        extended: boolean
    ) => {
        setAuction((prev) => {
            console.log(
                '[hooks/useLiveAuction] handleAuctionBid setAuction() prev:',
                prev
            );

            if (!prev) return prev;

            console.log(
                '[hooks/useLiveAuction] handleAuctionBid setAuction() return:',
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

        alert(
            dict.noun.details.auction.newBidPlaced
                .replace(':amount', formatEther(value))
                .replace(':bidder', sender)
        );
    };

    // Fetch the auction details whenever the contract or auction ID changes
    useEffect(() => {
        if (httpContract) {
            fetchAuctionDetails();
        }
    }, [httpContract]);

    // Subscribe to auction bid events and clean up on unmount
    useEffect(() => {
        console.log('[hooks/useLiveAuction] useEffect auction/wsContract');

        if (!wsContract || !auction || auction?.settled) return;

        console.log('[hooks/useLiveAuction] wsContract.on(AuctionBid)');

        wsContract.on('AuctionBid', (nounId, sender, value, extended) => {
            handleAuctionBid(nounId, sender, value, extended);
        });

        return () => {
            console.log('[hooks/useLiveAuction] wsContract.off(AuctionBid)');

            wsContract.off('AuctionBid', (nounId, sender, value, extended) => {
                handleAuctionBid(nounId, sender, value, extended);
            });
        };
    }, [auction, wsContract]);

    return auction;
};

export default useLiveAuction;
