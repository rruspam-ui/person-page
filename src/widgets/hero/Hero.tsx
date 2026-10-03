import { useMemo } from 'react';

import { useContactModal } from '../../features/contact';
import photo from '../../shared/assets/photo.jpg';
import { PROFILE } from '../../shared/data/profile';
import { getProfileStats } from '../../shared/data/stats';
import { formatYears, yearsWord } from '../../shared/lib/duration';
import { SectionId } from '../../shared/lib/enums';
import { useI18n } from '../../shared/i18n/useI18n';
import { Button } from '../../shared/ui/button/Button';
import styles from './Hero.module.css';

/** Идентификатор кнопки связи на первом экране (по ней прячется плавающая кнопка) */
export const HERO_CTA_ID = 'hero-cta';

/** Первый экран: роль, главный тезис, условия работы и ключевые цифры */
export function Hero() {
    const { t, locale } = useI18n();
    const { open } = useContactModal();
    const stats = useMemo(() => getProfileStats(PROFILE, new Date()), []);

    /** Текст под заголовком с подставленным стажем */
    const totalYears = `${stats.totalYears}+\u00a0${yearsWord(stats.totalYears, locale)}`;
    const recentYears = formatYears(stats.currentStackYears, locale).replace(' ', '\u00a0');
    const lead = PROFILE.lead[locale].replace('{total}', totalYears).replace('{recent}', recentYears);

    /** Ключевые цифры */
    const items = [
        { value: `${stats.totalYears}+`, label: `${yearsWord(stats.totalYears, locale)} ${t.stats.years}` },
        { value: String(stats.teamLeadCount), label: t.stats.teams },
        { value: `${Math.floor(stats.technologyCount / 10) * 10}+`, label: t.stats.technologies },
    ];

    return (
        <section id={SectionId.About} className={styles.hero} aria-labelledby="hero-title">
            <img className={styles.photo} src={photo} alt={PROFILE.fullName[locale]} width={112} height={112} />
            <p className={styles.eyebrow}>{PROFILE.role.replace(' / ', ' · ')}</p>
            <h1 id="hero-title" className={styles.title}>
                {PROFILE.headline[locale]}
            </h1>
            <p className={styles.lead}>{lead}</p>
            <ul className={styles.conditions}>
                {PROFILE.workConditions.map((item) => (
                    <li key={item.ru}>{item[locale]}</li>
                ))}
            </ul>
            <Button id={HERO_CTA_ID} className={styles.cta} onClick={open}>
                {t.cta.contactMe}
            </Button>
            <dl className={styles.stats}>
                {items.map((item) => (
                    <div key={item.label} className={styles.stat}>
                        <dt className={styles.statLabel}>{item.label}</dt>
                        <dd className={styles.statValue}>{item.value}</dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
