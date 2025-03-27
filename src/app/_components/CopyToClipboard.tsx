'use client';

import useDictionary from '@/hooks/useDictionary';

interface Props {
    children: React.ReactNode;
    content: string;
}

export default function CopyToClipboard({ children, content }: Props) {
    const dict = useDictionary();

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            alert(`${content} ${dict.common.copied}`);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <button
            className="cursor-grab"
            type="button"
            title={dict.common.copy}
            onClick={handleCopy}
        >
            {children}
        </button>
    );
}
