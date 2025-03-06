import Filters from '@/app/[lang]/nouns/_components/Catalogue/Controls/Filters';
import Sorters from '@/app/[lang]/nouns/_components/Catalogue/Controls/Sorters';
import styles from '@/app/[lang]/nouns/_styles/catalogue/controls/controls.module.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function NounsControls({ className }: Props) {
    return (
        <div className={className}>
            <Sorters className={styles.sortersContainer} />

            <Filters />
        </div>
    );
}
