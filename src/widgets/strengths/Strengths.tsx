import { PROFILE } from '../../shared/data/profile';
import { SectionId } from '../../shared/lib/enums';
import { useI18n } from '../../shared/i18n/useI18n';
import { Section } from '../../shared/ui/section/Section';
import styles from './Strengths.module.css';

/** Свойства секции сильных сторон */
type StrengthsProps = {
    /** Порядковый номер секции */
    index: number;
};

/** Сильные стороны кандидата карточками */
export function Strengths({ index }: StrengthsProps) {
    const { t, locale } = useI18n();

    return (
        <Section id={SectionId.Strengths} index={index} title={t.nav.strengths} subtitle={t.strengths.subtitle}>
            <ul className={styles.cards}>
                {PROFILE.strengths.map((item) => (
                    <li key={item.title.ru} className={styles.card}>
                        <h3 className={styles.title}>{item.title[locale]}</h3>
                        <p className={styles.text}>{item.description[locale]}</p>
                    </li>
                ))}
            </ul>
        </Section>
    );
}
