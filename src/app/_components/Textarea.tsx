export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
    invalid?: boolean;
}

export default function Textarea({
    className,
    invalid = false,
    ...props
}: TextareaProps) {
    return <textarea className={className} data-invalid={invalid} {...props} />;
}
