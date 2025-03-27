import DreamFromDB from '@/utils/dto/Dream/FromDB';

interface Props {
    children: React.ReactNode;
    dream: DreamFromDB;
}

export default function Background({ children, dream }: Props) {
    return (
        <div
            style={{
                backgroundColor:
                    dream.background_seed_id == 0 ? '#d5d7e1' : '#e1d7d5',
            }}
        >
            {children}
        </div>
    );
}
