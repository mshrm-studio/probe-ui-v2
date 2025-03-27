interface Props extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    backgroundIndex: number | string;
}

export default function Background({
    backgroundIndex,
    children,
    className,
}: Props) {
    return (
        <div
            className={className}
            style={{
                backgroundColor: backgroundIndex == 0 ? '#d5d7e1' : '#e1d7d5',
            }}
        >
            {children}
        </div>
    );
}
