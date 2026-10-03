import { useEffect, useState } from 'react';

/**
 * Сообщает, виден ли на экране хотя бы один из элементов.
 * @param ids Идентификаторы элементов
 * @returns true, если хотя бы один элемент пересекает область просмотра
 */
export function useElementsVisible(ids: string[]): boolean {
    const [visibleIds, setVisibleIds] = useState<Set<string>>(() => new Set());
    const key = ids.join('|');

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') {
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            setVisibleIds((prev) => {
                const next = new Set(prev);
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        next.add(entry.target.id);
                    } else {
                        next.delete(entry.target.id);
                    }
                });
                return next;
            });
        });
        key.split('|')
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null)
            .forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [key]);

    return visibleIds.size > 0;
}
