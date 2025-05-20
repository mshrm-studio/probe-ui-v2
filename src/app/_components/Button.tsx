import styles from '@/app/_styles/button.module.css';
import clsx from 'clsx';

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    color?: 'green' | 'grey' | 'purple' | 'red' | 'yellow' | 'white';
    processing?: boolean;
    size?: 'base' | 'lg';
}

export default function Button({
    children,
    className,
    color = 'yellow',
    disabled,
    processing,
    size = 'base',
    ...props
}: ButtonProps) {
    return (
        <button
            className={clsx(
                styles.button,
                styles[color],
                styles[size],
                className
            )}
            disabled={disabled || processing}
            {...props}
        >
            {children}
        </button>
    );
}
