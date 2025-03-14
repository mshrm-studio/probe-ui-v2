import ApiPaginationMeta from '@/utils/dto/Api/PaginationMeta';
import { useState, useEffect } from 'react';

interface Props {
    fetching: boolean;
    meta: ApiPaginationMeta | undefined;
}

export default function useCatalogueScroll({ fetching, meta }: Props) {
    const [page, setPage] = useState(1);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (fetching || !meta) return;

            const tolerance = 300;
            const scrollTop = document.documentElement.scrollTop;
            const scrolled = window.innerHeight + scrollTop;
            const totalHeight = document.documentElement.offsetHeight;

            const isNearBottom = totalHeight - scrolled <= tolerance;
            const isScrollingDown = scrollTop > lastScrollTop;

            setLastScrollTop(scrollTop);

            if (!isNearBottom || !isScrollingDown) return;

            const lastPage = meta.last_page;
            // Only increment if you haven't reached the last page
            if (page < lastPage) {
                setPage((prev) => Math.min(prev + 1, lastPage));
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [fetching, lastScrollTop, meta, page]);

    return {
        page,
        setPage,
    };
}
