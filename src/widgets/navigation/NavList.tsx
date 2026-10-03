import { useActiveSection } from '../../shared/lib/useActiveSection';
import { useI18n } from '../../shared/i18n/useI18n';
import { NAV_ITEMS, NAV_SECTION_IDS } from './nav-items';
import styles from './NavList.module.css';

/** Свойства списка пунктов меню */
type NavListProps = {
    /** Вызывается после перехода по пункту (например, чтобы закрыть мобильное меню) */
    onNavigate?: () => void;
};

/** Список пунктов меню с подсветкой текущей секции */
export function NavList({ onNavigate }: NavListProps) {
    const { t } = useI18n();
    const active = useActiveSection(NAV_SECTION_IDS);

    return (
        <ul className={styles.list}>
            {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                    <a
                        href={`#${item.id}`}
                        className={item.id === active ? `${styles.link} ${styles.active}` : styles.link}
                        aria-current={item.id === active ? 'location' : undefined}
                        onClick={onNavigate}
                    >
                        {t.nav[item.labelKey]}
                    </a>
                </li>
            ))}
        </ul>
    );
}
