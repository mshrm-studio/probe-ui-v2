import { RpcContext } from '@/context/Rpc';
import { TokenContext } from '@/context/Token';
import { ZeroAddress } from 'ethers/constants';
import { useContext, useEffect, useState } from 'react';

const useNounMintBlock = (nounId: number) => {
    const [blockHash, setBlockHash] = useState<string>();
    const [blockNumber, setBlockNumber] = useState<number>();
    const [blockTimestamp, setBlockTimestamp] = useState<number>();

    const { httpProvider: provider } = useContext(RpcContext);
    const { httpTokenContract: contract } = useContext(TokenContext);

    useEffect(() => {
        if (!contract || !provider || !contract) return;

        const fetchTokenTransfers = async () => {
            try {
                const filter = contract.filters.Transfer(
                    ZeroAddress,
                    null,
                    nounId
                );

                // first block to latest block
                const logs = await contract.queryFilter(filter, 0, 'latest');

                if (Array.isArray(logs) && logs.length === 0) {
                    console.warn(`No mint event found for noun ID ${nounId}`);
                }

                const log = logs[0];

                setBlockHash(log.blockHash);

                const block = await provider.getBlock(log.blockHash);

                if (!block) {
                    console.error(`Block not found for hash: ${log.blockHash}`);
                } else {
                    setBlockNumber(block.number);
                    setBlockTimestamp(block.timestamp);
                }
            } catch (error) {
                console.error('Failed to fetch mint data:', error);
            }
        };

        fetchTokenTransfers();
    }, [contract, provider, nounId]);

    return { blockHash, blockNumber, blockTimestamp };
};

export default useNounMintBlock;
