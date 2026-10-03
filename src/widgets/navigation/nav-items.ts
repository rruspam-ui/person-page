import { SectionId } from '../../shared/lib/enums';
import type { Dictionary } from '../../shared/i18n/ru';

/** Пункт меню */
export type NavItem = {
    /** Секция, на которую ведёт пункт */
    id: SectionId;
    /** Ключ подписи в словаре `nav` */
    labelKey: keyof Dictionary['nav'];
};

/** Пункты меню в порядке секций на странице */
export const NAV_ITEMS: NavItem[] = [
    { id: SectionId.About, labelKey: 'about' },
    { id: SectionId.Strengths, labelKey: 'strengths' },
    { id: SectionId.Experience, labelKey: 'experience' },
    { id: SectionId.Skills, labelKey: 'skills' },
    { id: SectionId.Education, labelKey: 'education' },
    { id: SectionId.Contacts, labelKey: 'contacts' },
];

/** Идентификаторы секций для отслеживания прокрутки */
export const NAV_SECTION_IDS: SectionId[] = NAV_ITEMS.map((item) => item.id);
