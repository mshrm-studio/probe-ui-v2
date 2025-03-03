interface Props {
    address: string;
    shorten?: boolean;
}

export default function EthAddress({ address, shorten = true }: Props) {
    return (
        <>
            {!shorten
                ? address
                : `${address.slice(0, 4)}...${address.slice(-4)}`}
        </>
    );
}
