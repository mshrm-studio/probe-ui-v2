export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    invalid?: boolean;
}

export default function Input({
    className,
    invalid = false,
    ...props
}: InputProps) {
    return <input className={className} data-invalid={invalid} {...props} />;
}
