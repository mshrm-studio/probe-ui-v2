'use client';

interface Props {
    children: React.ReactNode;
    content: string;
}

export default function CopyToClipboard({ children, content }: Props) {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            alert(`${content} copied`);
        } catch (err) {
            console.error('Failed to copy:', err);
            alert('Failed to copy!');
        }
    };

    return (
        <button className="cursor-grab" type="button" onClick={handleCopy}>
            {children}
        </button>
    );
}
