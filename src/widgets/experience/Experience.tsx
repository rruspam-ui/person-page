import { useMemo, useState } from 'react';

import { DEFAULT_EXPANDED_JOBS_COUNT } from '../../shared/config/experience.const';
import { PROFILE } from '../../shared/data/profile';
import { getProfileStats } from '../../shared/data/stats';
import { formatDuration, formatYearMonth, monthsBetween, toYearMonth } from '../../shared/lib/duration';
import { SectionId } from '../../shared/lib/enums';
import { useI18n } from '../../shared/i18n/useI18n';
import { Section } from '../../shared/ui/section/Section';
import { TagList } from '../../shared/ui/tag/Tag';
import { getJobKey, getRecentJobKeys } from './recent-jobs';
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
    const [expanded, setExpanded] = useState(() => getRecentJobKeys(PROFILE.jobs, DEFAULT_EXPANDED_JOBS_COUNT));

    /**
     * Сворачивает или раскрывает место работы.
     * @param key Ключ места работы
     */
    const toggle = (key: string) => {
        setExpanded((prev) => {
            const next = new Set(prev);
            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    };

    return (
        <Section
            id={SectionId.Experience}
            index={index}
            title={t.nav.experience}
            subtitle={formatDuration(stats.totalMonths, locale)}
        >
            <ol className={styles.list}>
                {PROFILE.jobs.map((job, jobIndex) => {
                    const key = getJobKey(job);
                    const isExpanded = expanded.has(key);
                    const detailsId = `job-details-${jobIndex}`;
                    const end = job.end ?? toYearMonth(now);
                    const period = `${formatYearMonth(job.start, locale)} — ${
                        job.end ? formatYearMonth(job.end, locale) : t.experience.present
                    }`;

                    return (
                        <li key={key} className={styles.job}>
                            <button
                                type="button"
                                className={styles.toggle}
                                aria-expanded={isExpanded}
                                aria-controls={detailsId}
                                aria-label={`${isExpanded ? t.experience.collapse : t.experience.expand}: ${
                                    job.company[locale]
                                }`}
                                onClick={() => toggle(key)}
                            >
                                <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                                    <path d="M5 12h14" />
                                    {isExpanded ? null : <path d="M12 5v14" />}
                                </svg>
                            </button>
                            <div className={styles.when}>
                                <p className={styles.period}>{period}</p>
                                <p>{formatDuration(monthsBetween(job.start, end), locale)}</p>
                            </div>
                            <div className={styles.body}>
                                <h3 className={styles.company}>{job.company[locale]}</h3>
                                <p className={styles.position}>
                                    {job.position[locale]}
                                    {job.isTeamLead ? ` · ${t.experience.teamLead}` : ''}
                                    {job.city ? ` · ${job.city[locale]}` : ''}
                                </p>
                                <p className={styles.industry}>{job.industry[locale]}</p>
                                <div id={detailsId} hidden={!isExpanded}>
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
                            </div>
                        </li>
                    );
                })}
            </ol>
        </Section>
    );
}
