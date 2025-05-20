import { Dictionary } from '@/app/[lang]/dictionaries';
import clsx from 'clsx';
import styles from '@/app/[lang]/nouns/dreams/[id]/_styles/details/proposal/vote-tally/vote-tally.module.css';
import NounProposalFromSubgraph from '@/utils/dto/Noun/Proposal/FromSubgraph';
import VoteTallyBar from '@/app/[lang]/nouns/dreams/[id]/_components/Details/Proposal/VoteTally/Bar';

interface Props {
    className?: string;
    dict: Dictionary;
    proposal: NounProposalFromSubgraph;
}

export default function VoteTally({ className, dict, proposal }: Props) {
    if (proposal.quorumVotes === undefined) return null;

    if (proposal.forVotes === undefined) return null;

    if (proposal.againstVotes === undefined) return null;

    if (proposal.abstainVotes === undefined) return null;

    return (
        <div className={clsx(className, styles.container)}>
            <VoteTallyBar
                quorum={proposal.quorumVotes}
                supportTranslation={dict.dream.details.voteFor}
                support="for"
                votes={proposal.forVotes}
            />

            <VoteTallyBar
                quorum={proposal.quorumVotes}
                supportTranslation={dict.dream.details.voteAgainst}
                support="against"
                votes={proposal.againstVotes}
            />

            <VoteTallyBar
                quorum={proposal.quorumVotes}
                supportTranslation={dict.dream.details.voteAbstain}
                support="abstain"
                votes={proposal.abstainVotes}
            />
        </div>
    );
}
