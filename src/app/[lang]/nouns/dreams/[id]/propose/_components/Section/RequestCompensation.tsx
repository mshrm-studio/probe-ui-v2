'use client';

import styles from '@/app/[lang]/nouns/dreams/[id]/propose/_styles/section/write-up.module.css';
import Button from '@/app/_components/Button';
import Input from '@/app/_components/Input/Input';
import FormField from '@/app/_components/FormField';
import { Dictionary } from '@/app/[lang]/dictionaries';
import { useState } from 'react';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';

interface Props {
    dict: Dictionary;
}

export default function RequestCompensation({ dict }: Props) {
    const { address, isConnected } = useAppKitAccount();
    const { open } = useAppKit();
    const [requestedEth, setRequestedEth] = useState<string>('');

    const signArtworkAgreement = () => {
        if (!isConnected || !address) {
            open();
            return;
        }
    };

    return (
        <div className={styles.container}>
            <FormField label={dict.propose.requestCompensation.field.eth.label}>
                <Input
                    motif="borderless"
                    placeholder={
                        dict.propose.requestCompensation.field.eth.placeholder
                    }
                    value={requestedEth}
                    onChange={(e) => setRequestedEth(e.target.value)}
                />
            </FormField>

            <div className={styles.actions}>
                <Button
                    color="purple"
                    className={styles.actionBtn}
                    onClick={signArtworkAgreement}
                >
                    {
                        dict.propose.requestCompensation.action
                            .signArtworkAgreement
                    }
                </Button>
            </div>
        </div>
    );
}
