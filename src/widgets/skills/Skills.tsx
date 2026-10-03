import { PROFILE } from '../../shared/data/profile';
import { SectionId } from '../../shared/lib/enums';
import { useI18n } from '../../shared/i18n/useI18n';
import { Section } from '../../shared/ui/section/Section';
import { TagList } from '../../shared/ui/tag/Tag';
import styles from './Skills.module.css';

/** Свойства секции навыков */
type SkillsProps = {
    /** Порядковый номер секции */
    index: number;
};

/** Навыки, сгруппированные по областям */
export function Skills({ index }: SkillsProps) {
    const { t, locale } = useI18n();

    return (
        <Section id={SectionId.Skills} index={index} title={t.nav.skills} subtitle={t.skills.subtitle}>
            <div className={styles.grid}>
                {PROFILE.skillGroups.map((group) => (
                    <div key={group.title.ru}>
                        <h3 className={styles.title}>{group.title[locale]}</h3>
                        <TagList items={group.items} ariaLabel={group.title[locale]} />
                    </div>
                ))}
            </div>
        </Section>
    );
}
