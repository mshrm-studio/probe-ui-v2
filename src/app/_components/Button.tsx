export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    processing?: boolean;
}

export default function Button({
    children,
    className,
    disabled,
    processing,
    ...props
}: ButtonProps) {
    return (
        <button
            className={className}
            disabled={disabled || processing}
            {...props}
        >
            {children}
        </button>
    );
}
