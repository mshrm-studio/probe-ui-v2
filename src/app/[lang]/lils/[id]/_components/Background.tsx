import LilFromDB from '@/utils/dto/Lil/FromDB';

interface Props {
    children: React.ReactNode;
    lil: LilFromDB;
}

export default function Background({ children, lil }: Props) {
    return (
        <div
            style={{
                backgroundColor:
                    lil.background_index == 0 ? '#d5d7e1' : '#e1d7d5',
            }}
        >
            {children}
        </div>
    );
}
