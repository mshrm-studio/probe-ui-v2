import Filters from '@/app/[lang]/nouns/_components/Controls/Filters';
import Sorters from '@/app/[lang]/nouns/_components/Controls/Sorters';

export default function NounsControls() {
    return (
        <div>
            <Sorters />

            <Filters />
        </div>
    );
}
