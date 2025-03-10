import {
    Dialog as HeadlessDialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react';
import styles from '@/app/_styles/dialog/dialog.module.css';

interface Props {
    children: React.ReactNode;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
}

export default function Dialog({ children, open, setOpen, title }: Props) {
    return (
        <HeadlessDialog
            open={open}
            onClose={() => setOpen(false)}
            className={styles.dialog}
        >
            <div className={styles.panelContainer}>
                <DialogPanel className={styles.panel}>
                    <DialogTitle className={styles.title}>{title}</DialogTitle>

                    {children}
                </DialogPanel>
            </div>
        </HeadlessDialog>
    );
}
