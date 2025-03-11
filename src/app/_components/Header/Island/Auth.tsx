'use client';

import { Dictionary } from '@/app/[lang]/dictionaries';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import Image from '@/app/_components/Image';
import popoverStyles from '@/app/_styles/header/island/popover.module.css';
import styles from '@/app/_styles/header/island/auth.module.css';
import clsx from 'clsx';
import {
    useAppKit,
    useAppKitAccount,
    useDisconnect,
} from '@reown/appkit/react';

interface Props {
    dict: Dictionary;
}

export default function HeaderAuth({ dict }: Props) {
    const { address, isConnected } = useAppKitAccount();
    const { open } = useAppKit();
    const { disconnect } = useDisconnect();

    if (!isConnected) {
        return (
            <button
                type="button"
                className={popoverStyles.button}
                onClick={() => open()}
            >
                <span className="sr-only">{dict.header.auth.connect}</span>

                <Image
                    src="header/user.svg"
                    alt={dict.header.auth.imgAlt}
                    height={19}
                    width={15}
                />
            </button>
        );
    }

    return (
        <Popover className="relative">
            <PopoverButton className={popoverStyles.button}>
                <span className="sr-only">{dict.header.auth.showAuthMenu}</span>

                <Image
                    src="header/user.svg"
                    alt={dict.header.auth.imgAlt}
                    height={19}
                    width={15}
                />
            </PopoverButton>

            <PopoverPanel
                className={clsx(popoverStyles.panel, styles.popoverPanel)}
            >
                <>
                    {address && (
                        <p className="text-xs mb-4">
                            {dict.header.auth.connectedAs.replace(
                                ':ethAddress',
                                `${address.slice(0, 4)}...${address.slice(-4)}`
                            )}
                        </p>
                    )}

                    <button
                        onClick={disconnect}
                        className={styles.disconnectButton}
                    >
                        {dict.header.auth.disconnect}
                    </button>
                </>
            </PopoverPanel>
        </Popover>
    );
}
