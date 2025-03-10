import styles from '@/app/_styles/button.module.css';
import clsx from 'clsx';

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    color?: 'purple' | 'yellow' | 'white';
    processing?: boolean;
}

export default function Button({
    children,
    className,
    color = 'yellow',
    disabled,
    processing,
    ...props
}: ButtonProps) {
    return (
        <button
            className={clsx(styles.button, styles[color], className)}
            disabled={disabled || processing}
            {...props}
        >
            {children}
        </button>
    );
}
