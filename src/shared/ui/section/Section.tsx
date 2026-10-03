import type { ReactNode } from 'react';

import type { SectionId } from '../../lib/enums';
import styles from './Section.module.css';

/** Свойства секции страницы */
type SectionProps = {
    /** Идентификатор-якорь секции */
    id: SectionId;
    /** Порядковый номер, показывается перед заголовком */
    index: number;
    /** Заголовок */
    title: string;
    /** Подзаголовок */
    subtitle?: string;
    /** Содержимое */
    children: ReactNode;
};

/** Секция страницы с нумерованным заголовком */
export function Section({ id, index, title, subtitle, children }: SectionProps) {
    const headingId = `${id}-title`;

    return (
        <section id={id} className={styles.section} aria-labelledby={headingId}>
            <h2 id={headingId} className={styles.title}>
                <span className={styles.index} aria-hidden="true">
                    {String(index).padStart(2, '0')}
                </span>
                {title}
            </h2>
            {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
            <div className={styles.body}>{children}</div>
        </section>
    );
}
