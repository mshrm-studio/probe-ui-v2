import Filters from '@/app/[lang]/nouns/dreams/_components/Catalogue/Controls/Filters';
import Sorters from '@/app/[lang]/nouns/dreams/_components/Catalogue/Controls/Sorters';
import styles from '@/app/[lang]/nouns/dreams/_styles/catalogue/controls/controls.module.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function DreamsControls({ className }: Props) {
    return (
        <div className={className}>
            <Sorters className={styles.sortersContainer} />

            <Filters />
        </div>
    );
}
