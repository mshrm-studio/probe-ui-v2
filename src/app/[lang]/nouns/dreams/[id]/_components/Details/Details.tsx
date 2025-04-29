import Traits from '@/app/[lang]/nouns/dreams/[id]/_components/Details/Traits/Traits';
import { Dictionary } from '@/app/[lang]/dictionaries';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/details/details.module.css';
import DreamFromDB, {
    isDreamFromDBWithCustomTrait,
} from '@/utils/dto/Dream/FromDB';
import Dreamer from '@/app/[lang]/nouns/dreams/[id]/_components/Details/Dreamer';
import DreamDate from '@/app/[lang]/nouns/dreams/[id]/_components/Details/DreamDate';
import LocalisedNumber from '@/app/_components/LocalisedNumber';
import Proposal from '@/app/[lang]/nouns/dreams/[id]/_components/Details/Proposal';
import DataProxyProvider from '@/context/DataProxy';
import RpcProvider from '@/context/Rpc';
import ProposalProvider from '@/context/Proposal';

interface Props {
    dict: Dictionary;
    dream: DreamFromDB;
}

export default function Details({ dict, dream }: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.headingContainer}>
                <h1 className={styles.heading}>
                    {dict.dream.details.dream}{' '}
                    <LocalisedNumber number={dream.id} removeCommasAndPeriods />
                </h1>
            </div>

            <Dreamer
                dreamer={dream.dreamer}
                dict={dict}
                className={styles.dreamerContainer}
            />

            <DreamDate
                dream={dream}
                dict={dict}
                className={styles.dreamDateContainer}
            />

            <RpcProvider>
                <DataProxyProvider>
                    <ProposalProvider dream={dream}>
                        <Traits
                            dream={dream}
                            dict={dict}
                            className={styles.traitsContainer}
                        />

                        {isDreamFromDBWithCustomTrait(dream) && (
                            <Proposal dream={dream} />
                        )}
                    </ProposalProvider>
                </DataProxyProvider>
            </RpcProvider>
        </div>
    );
}
