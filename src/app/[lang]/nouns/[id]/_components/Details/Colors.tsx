import { Dictionary } from '@/app/[lang]/dictionaries';
import NounFromDB from '@/utils/dto/Noun/FromDB';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dict: Dictionary;
    noun: NounFromDB;
}

export default function DetailsColors({ noun }: Props) {
    if (!noun.color_histogram) return null;

    return (
        <div>
            <h3>Colors</h3>

            {Object.entries(noun.color_histogram).map((entry, idx) => (
                <div key={idx}>{JSON.stringify(entry)}</div>
            ))}
        </div>
    );
}
