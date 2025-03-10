'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import AuctionFromSubgraph from '@/utils/dto/Auction/FromSubgraph';
import Button from '@/app/_components/Button';
import {
    useAppKit,
    useAppKitAccount,
    useAppKitProvider,
} from '@reown/appkit/react';
import Input from '@/app/_components/Input/Input';
import styles from '@/app/[lang]/nouns/[id]/_styles/details/auction/form.module.css';
import { useContext, useState } from 'react';
import {
    BrowserProvider,
    Contract,
    ContractTransactionReceipt,
    Eip1193Provider,
    parseEther,
} from 'ethers';
import { AuctionHouseContext } from '@/context/AuctionHouse';

interface Props {
    auction: AuctionFromSubgraph;
    dict: Dictionary;
}

export default function DetailsAuctionForm({ auction, dict }: Props) {
    const { isConnected } = useAppKitAccount();
    const { open } = useAppKit();
    const [bid, setBid] = useState<number>(0);
    const { walletProvider } = useAppKitProvider('eip155');
    const { httpAuctionHouseContract } = useContext(AuctionHouseContext);

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

            const value = parseEther(String(bid));

            const bigIntGasEstimate =
                await contractWithSigner.createBid.estimateGas(
                    auction.noun.id,
                    clientId,
                    {
                        value,
                    }
                );

            const bigIntGasLimit = bigIntGasEstimate + BigInt(10000); // A 10,000 gas pad is used to avoid 'Out of gas' errors

            const gasLimit = Number(bigIntGasLimit);

            const tx = await contractWithSigner.createBid(
                auction.noun.id,
                clientId,
                {
                    value,
                    gasLimit,
                }
            );

            await tx.wait();

            window.location.reload();
        } catch (error: any) {
            alert(error?.info?.error?.message || error.code);
        }
    };

    return (
        <form className={styles.form} onSubmit={placeBid}>
            <Input
                name="bid"
                min={auction.amount}
                type="number"
                step="any"
                className={styles.input}
                value={bid}
                onChange={(e) => setBid(Number(e.target.value))}
            />

            <Button disabled={bid == 0}>{dict.noun.details.auction.bid}</Button>
        </form>
    );
}
