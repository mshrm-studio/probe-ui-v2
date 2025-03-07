import NounFromDB from '@/utils/dto/Noun/FromDB';
import Colors from '@/app/[lang]/nouns/[id]/_components/Details/Colors';
import Traits from '@/app/[lang]/nouns/[id]/_components/Details/Traits';
import { Dictionary } from '@/app/[lang]/dictionaries';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dict: Dictionary;
    noun: NounFromDB;
}

export default function Details({ className, dict, noun }: Props) {
    return (
        <div className={className}>
            <Colors noun={noun} dict={dict} />

            <Traits noun={noun} dict={dict} />
        </div>
    );
}
