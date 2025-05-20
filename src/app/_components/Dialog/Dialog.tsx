import {
    Dialog as HeadlessDialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react';
import styles from '@/app/_styles/dialog/dialog.module.css';
import clsx from 'clsx';

interface Props {
    children: React.ReactNode;
    open: boolean;
    panelClassName?: string;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title?: string;
}

export default function Dialog({
    children,
    open,
    panelClassName,
    setOpen,
    title,
}: Props) {
    return (
        <HeadlessDialog
            open={open}
            onClose={() => setOpen(false)}
            className={styles.dialog}
        >
            <div className={styles.panelContainer}>
                <DialogPanel className={clsx(styles.panel, panelClassName)}>
                    {title && (
                        <DialogTitle className={styles.title}>
                            {title}
                        </DialogTitle>
                    )}

                    {children}
                </DialogPanel>
            </div>
        </HeadlessDialog>
    );
}
