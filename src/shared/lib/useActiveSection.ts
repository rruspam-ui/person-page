import { useEffect, useState } from 'react';

import type { SectionId } from './enums';

/**
 * Отслеживает секцию, которая сейчас находится в центральной полосе экрана (для подсветки пункта меню).
 * @param ids Идентификаторы секций в порядке следования на странице
 * @returns Идентификатор активной секции
 */
export function useActiveSection(ids: SectionId[]): SectionId {
    const [active, setActive] = useState<SectionId>(ids[0]);

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') {
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((entry) => entry.isIntersecting);
                if (visible.length > 0) {
                    setActive(visible[visible.length - 1].target.id as SectionId);
                }
            },
            { rootMargin: '-35% 0px -60% 0px' },
        );
        ids.map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null)
            .forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [ids]);

    return active;
}
