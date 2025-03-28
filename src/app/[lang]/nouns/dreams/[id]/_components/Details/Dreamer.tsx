import { Dictionary } from '@/app/[lang]/dictionaries';
import EthAddress from '@/app/_components/Eth/Address';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/details/dreamer.module.css';
import EtherscanLink from '@/app/_components/EtherscanLink';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    dict: Dictionary;
    dreamer: string;
}

export default function Dreamer({ className, dict, dreamer }: Props) {
    return (
        <div className={className}>
            <dt className={styles.dt}>{dict.dream.details.dreamer}:</dt>

            <dd className={styles.dd} title={dreamer}>
                <EtherscanLink type="Address" address={dreamer}>
                    <EthAddress address={dreamer} />
                </EtherscanLink>
            </dd>
        </div>
    );
}
