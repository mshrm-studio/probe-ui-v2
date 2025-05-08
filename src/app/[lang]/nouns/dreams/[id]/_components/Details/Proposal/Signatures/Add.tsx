'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import NounProposalCandidateFromSubgraph from '@/utils/dto/Noun/Proposal/Candidate/FromSubgraph';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/details/proposal/signatures/add.module.css';
import Button from '@/app/_components/Button';
import clsx from 'clsx';
import {
    AbiCoder,
    BrowserProvider,
    Contract,
    Eip1193Provider,
    keccak256,
    solidityPacked,
    toUtf8Bytes,
} from 'ethers';
import {
    useAppKit,
    useAppKitAccount,
    useAppKitProvider,
} from '@reown/appkit/react';
import { DataProxyContext } from '@/context/DataProxy';
import { useContext } from 'react';
import { DreamFromDBWithCustomTrait } from '@/utils/dto/Dream/FromDB';
import { AccountContext } from '@/context/Account';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dict: Dictionary;
    dream: DreamFromDBWithCustomTrait;
    proposalCandidate: NounProposalCandidateFromSubgraph;
}

export default function SignatureList({
    className,
    dict,
    dream,
    proposalCandidate,
}: Props) {
    const { address, isConnected } = useAppKitAccount();
    const { open } = useAppKit();
    const { walletProvider } = useAppKitProvider('eip155');
    const { httpDataProxyContract } = useContext(DataProxyContext);
    const { account } = useContext(AccountContext);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isConnected || !address) {
            open();
            return;
        }

        if (!walletProvider || !httpDataProxyContract) return;

        try {
            const content = proposalCandidate.latestVersion.content;
            const expirationTimestamp =
                Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 days in seconds
            // const encodedProp = content.encodedProposalHash;
            const reason = '';

            const provider = new BrowserProvider(
                walletProvider as Eip1193Provider
            );

            const signer = await provider.getSigner();

            const domain = {
                name: 'Nouns DAO',
                chainId: await signer.provider
                    .getNetwork()
                    .then((n) => Number(n.chainId)),
                verifyingContract: String(
                    process.env.NEXT_PUBLIC_NOUNS_DAO_PROXY_CONTRACT_ADDRESS
                ),
            };

            //     bytes32 public constant PROPOSAL_TYPEHASH =
            // keccak256(
            //     'Proposal(address proposer,address[] targets,uint256[] values,string[] signatures,bytes[] calldatas,string description,uint256 expiry)'
            // );

            const createProposalTypes = {
                Proposal: [
                    { name: 'proposer', type: 'address' },
                    { name: 'targets', type: 'address[]' },
                    { name: 'values', type: 'uint256[]' },
                    { name: 'signatures', type: 'string[]' },
                    { name: 'calldatas', type: 'bytes[]' },
                    { name: 'description', type: 'string' },
                    { name: 'expiry', type: 'uint256' },
                ],
            };

            //     bytes32 public constant UPDATE_PROPOSAL_TYPEHASH =
            // keccak256(
            //     'UpdateProposal(uint256 proposalId,address proposer,address[] targets,uint256[] values,string[] signatures,bytes[] calldatas,string description,uint256 expiry)'
            // );

            const updateProposalTypes = {
                UpdateProposal: [
                    { name: 'proposalId', type: 'uint256' },
                    { name: 'proposer', type: 'address' },
                    { name: 'targets', type: 'address[]' },
                    { name: 'values', type: 'uint256[]' },
                    { name: 'signatures', type: 'string[]' },
                    { name: 'calldatas', type: 'bytes[]' },
                    { name: 'description', type: 'string' },
                    { name: 'expiry', type: 'uint256' },
                ],
            };

            const createProposalValue = {
                proposer: content.proposer,
                targets: content.targets,
                values: content.values,
                signatures: content.signatures,
                calldatas: content.calldatas,
                description: content.description,
                expiry: expirationTimestamp,
            };

            const updateProposalValue = {
                proposalId: Number(content.proposalIdToUpdate),
                proposer: content.proposer,
                targets: content.targets,
                values: content.values,
                signatures: content.signatures,
                calldatas: content.calldatas,
                description: content.description,
                expiry: expirationTimestamp,
            };

            const types =
                content.proposalIdToUpdate == '0'
                    ? createProposalTypes
                    : updateProposalTypes;

            const value =
                content.proposalIdToUpdate == '0'
                    ? createProposalValue
                    : updateProposalValue;

            const sig = await signer.signTypedData(domain, types, value);

            const contractWithSigner = httpDataProxyContract.connect(
                signer
            ) as Contract;

            const signatureHashes = content.signatures.map((signature) =>
                keccak256(toUtf8Bytes(signature))
            );

            const calldatasHashes = content.calldatas.map((calldata) =>
                keccak256(calldata)
            );

            const encodedProp = AbiCoder.defaultAbiCoder().encode(
                [
                    'address',
                    'bytes32',
                    'bytes32',
                    'bytes32',
                    'bytes32',
                    'bytes32',
                ],
                [
                    value.proposer,
                    keccak256(solidityPacked(['address[]'], [value.targets])),
                    keccak256(solidityPacked(['uint256[]'], [value.values])),
                    keccak256(solidityPacked(['bytes32[]'], [signatureHashes])),
                    keccak256(solidityPacked(['bytes32[]'], [calldatasHashes])),
                    keccak256(toUtf8Bytes(content.description)),
                ]
            );

            const encodedPropUpdate = solidityPacked(
                ['uint256', 'bytes'],
                [Number(content.proposalIdToUpdate), encodedProp]
            );

            const tx = await contractWithSigner.addSignature(
                sig,
                expirationTimestamp,
                value.proposer,
                proposalCandidate.slug,
                Number(content.proposalIdToUpdate),
                content.proposalIdToUpdate == '0'
                    ? encodedProp
                    : encodedPropUpdate,
                reason
            );

            await tx.wait();
        } catch (error: any) {
            console.error('Error adding signature:', error);
            alert(error?.info?.error?.message || error.code);
        }
    };

    if (dream.dreamer === address) return null;

    return (
        <form onSubmit={handleSubmit} className={clsx(className, styles.form)}>
            <Button
                disabled={account?.delegate?.delegatedVotes === '0'}
                type="submit"
                color="purple"
                size="lg"
            >
                {dict.dream.details.addSignature}
            </Button>
        </form>
    );
}
