import styles from '@/app/[lang]/nouns/[id]/_styles/details/auction/countdown.module.css';
import { Dictionary } from '@/app/[lang]/dictionaries';

interface Props {
    dict: Dictionary;
    timeRemaining: string;
}

export default function AuctionCountdown({ dict, timeRemaining }: Props) {
    return (
        <div className={styles.dlItem}>
            <dt className={styles.dt}>{dict.noun.details.auction.endsIn}:</dt>

            <dd className={styles.dd}>{timeRemaining}</dd>
        </div>
    );
}
