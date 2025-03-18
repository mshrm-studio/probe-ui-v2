import Filters from '@/app/[lang]/lils/_components/Catalogue/Controls/Filters';
import Sorters from '@/app/[lang]/lils/_components/Catalogue/Controls/Sorters';
import styles from '@/app/[lang]/lils/_styles/catalogue/controls/controls.module.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function LilsControls({ className }: Props) {
    return (
        <div className={className}>
            <Sorters className={styles.sortersContainer} />

            <Filters />
        </div>
    );
}
