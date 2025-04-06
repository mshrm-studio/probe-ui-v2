'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import Button from '@/app/_components/Button';
import {
    useAppKit,
    useAppKitAccount,
    useAppKitProvider,
} from '@reown/appkit/react';
import Input from '@/app/_components/Input/Input';
import styles from '@/app/[lang]/nouns/[id]/_styles/details/auction/form.module.css';
import { useContext, useMemo, useState } from 'react';
import { BrowserProvider, Contract, Eip1193Provider, parseEther } from 'ethers';
import { AuctionHouseContext } from '@/context/AuctionHouse';
import AuctionFromContract from '@/utils/dto/Noun/Auction/FromContract';

interface Props {
    auction: AuctionFromContract;
    dict: Dictionary;
}

export default function DetailsAuctionForm({ auction, dict }: Props) {
    const { isConnected } = useAppKitAccount();
    const { open } = useAppKit();
    const [bid, setBid] = useState<string>('');
    const { walletProvider } = useAppKitProvider('eip155');
    const { httpAuctionHouseContract, minBidIncrementPercentage } =
        useContext(AuctionHouseContext);

    const minBid = useMemo(() => {
        if (!auction || !minBidIncrementPercentage) return;

        const currentBid = parseFloat(auction.amount);

        const minBidIncrease = currentBid * (minBidIncrementPercentage / 100);

        return currentBid + minBidIncrease;
    }, [auction, minBidIncrementPercentage]);

    const placeholder = useMemo(() => {
        if (!minBid || minBid <= 0)
            return `Ξ ${dict.noun.details.auction.maxBid}`;

        return `Ξ ${minBid} ${dict.noun.details.auction.orMore}`;
    }, [dict, minBid]);

    if (!isConnected) {
        return (
            <Button onClick={() => open()}>
                {dict.noun.details.auction.loginToBid}
            </Button>
        );
    }

    const placeBid = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isConnected) {
            alert('Not connected');
            return;
        }

        const clientId = process.env.NEXT_PUBLIC_PROBE_NOUNS_CLIENT_ID;

        if (!httpAuctionHouseContract) {
            alert('Auction House Contract not found');
            return;
        }

        if (typeof clientId !== 'string' || !clientId) {
            alert('Client ID not found');
            return;
        }

        try {
            const provider = new BrowserProvider(
                walletProvider as Eip1193Provider
            );

            const signer = await provider.getSigner();

            const contractWithSigner = httpAuctionHouseContract.connect(
                signer
            ) as Contract;

            const value = parseEther(bid);
            const nounId = Number(auction.nounId);

            const bigIntGasEstimate =
                await contractWithSigner.createBid.estimateGas(
                    nounId,
                    clientId,
                    {
                        value,
                    }
                );

            const bigIntGasLimit = bigIntGasEstimate + BigInt(10000); // A 10,000 gas pad is used to avoid 'Out of gas' errors

            const gasLimit = Number(bigIntGasLimit);

            const tx = await contractWithSigner.createBid(nounId, clientId, {
                value,
                gasLimit,
            });

            await tx.wait();

            // window.location.reload();
        } catch (error: any) {
            alert(error?.info?.error?.message || error.code);
        }
    };

    return (
        <form className={styles.form} onSubmit={placeBid}>
            <Input
                name="bid"
                min={0}
                type="number"
                step="any"
                className={styles.input}
                placeholder={placeholder}
                value={bid}
                onChange={(e) => setBid(e.target.value)}
            />

            <Button className={styles.button} disabled={bid == '0'}>
                {dict.noun.details.auction.bid}
            </Button>
        </form>
    );
}
