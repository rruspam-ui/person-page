import { PROFILE } from '../../shared/data/profile';
import { SectionId } from '../../shared/lib/enums';
import { useI18n } from '../../shared/i18n/useI18n';
import { Section } from '../../shared/ui/section/Section';
import styles from './Education.module.css';

/** Свойства секции образования */
type EducationProps = {
    /** Порядковый номер секции */
    index: number;
};

/** Образование и владение языками */
export function Education({ index }: EducationProps) {
    const { t, locale } = useI18n();

    return (
        <Section id={SectionId.Education} index={index} title={t.nav.education}>
            <div className={styles.grid}>
                <ul className={styles.list}>
                    {PROFILE.education.map((item) => (
                        <li key={item.institution.ru} className={styles.item}>
                            <h3 className={styles.institution}>{item.institution[locale]}</h3>
                            <p>{item.speciality[locale]}</p>
                            <p className={styles.muted}>
                                {t.education.graduated} {item.year}
                            </p>
                        </li>
                    ))}
                </ul>
                <div className={styles.item}>
                    <h3 className={styles.institution}>{t.education.languages}</h3>
                    <ul className={styles.languages}>
                        {PROFILE.languages.map((item) => (
                            <li key={item.name.ru}>
                                {item.name[locale]} <span className={styles.muted}>— {item.level[locale]}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Section>
    );
}
