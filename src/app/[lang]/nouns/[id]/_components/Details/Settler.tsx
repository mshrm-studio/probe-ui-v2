import { Dictionary } from '@/app/[lang]/dictionaries';
import styles from '@/app/[lang]/nouns/[id]/_styles/details/settler.module.css';
import EthAddress from '@/app/_components/Eth/Address';
import EtherscanLink from '@/app/_components/EtherscanLink';
import clsx from 'clsx';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dict: Dictionary;
    settler: string;
}

export default function DetailsSettler({ className, dict, settler }: Props) {
    return (
        <div className={clsx(className, styles.container)}>
            <span>{dict.noun.details.settledBy}:</span>

            <span title={settler}>
                <EtherscanLink type="Address" address={settler}>
                    <EthAddress address={settler} />
                </EtherscanLink>
            </span>
        </div>
    );
}
