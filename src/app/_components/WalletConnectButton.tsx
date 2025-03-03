'use client';

import {
    useAppKit,
    useAppKitAccount,
    useDisconnect,
} from '@reown/appkit/react';

export default function ConnectButton() {
    const { isConnected } = useAppKitAccount();
    const { open } = useAppKit();
    const { disconnect } = useDisconnect();

    if (isConnected) {
        return <button onClick={() => disconnect()}>Disconnect</button>;
    }

    return <button onClick={() => open()}>Open Connect Modal</button>;
}
