import { useMemo } from 'react';

import { PROFILE } from '../../shared/data/profile';
import { getProfileStats } from '../../shared/data/stats';
import { formatDuration, formatYearMonth, monthsBetween, toYearMonth } from '../../shared/lib/duration';
import { SectionId } from '../../shared/lib/enums';
import { useI18n } from '../../shared/i18n/useI18n';
import { Section } from '../../shared/ui/section/Section';
import { TagList } from '../../shared/ui/tag/Tag';
import styles from './Experience.module.css';

/** Свойства секции опыта */
type ExperienceProps = {
    /** Порядковый номер секции */
    index: number;
};

/** Опыт работы: места работы от нового к старому с периодом, ролью, достижениями и стеком */
export function Experience({ index }: ExperienceProps) {
    const { t, locale } = useI18n();
    const now = useMemo(() => new Date(), []);
    const stats = useMemo(() => getProfileStats(PROFILE, now), [now]);

    return (
        <Section
            id={SectionId.Experience}
            index={index}
            title={t.nav.experience}
            subtitle={formatDuration(stats.totalMonths, locale)}
        >
            <ol className={styles.list}>
                {PROFILE.jobs.map((job) => {
                    const end = job.end ?? toYearMonth(now);
                    const period = `${formatYearMonth(job.start, locale)} — ${
                        job.end ? formatYearMonth(job.end, locale) : t.experience.present
                    }`;

                    return (
                        <li key={job.company.ru} className={styles.job}>
                            <div className={styles.when}>
                                <p className={styles.period}>{period}</p>
                                <p>{formatDuration(monthsBetween(job.start, end), locale)}</p>
                            </div>
                            <div>
                                <h3 className={styles.company}>{job.company[locale]}</h3>
                                <p className={styles.position}>
                                    {job.position[locale]}
                                    {job.isTeamLead ? ` · ${t.experience.teamLead}` : ''}
                                    {job.city ? ` · ${job.city[locale]}` : ''}
                                </p>
                                <p className={styles.industry}>{job.industry[locale]}</p>
                                <p className={styles.summary}>{job.summary[locale]}</p>
                                <ul className={styles.achievements}>
                                    {job.achievements.map((item) => (
                                        <li key={item.ru}>{item[locale]}</li>
                                    ))}
                                </ul>
                                <div className={styles.stack}>
                                    <TagList items={job.stack} />
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </Section>
    );
}
