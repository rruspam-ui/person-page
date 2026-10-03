import { useContactModal } from '../../features/contact';
import { LanguageSwitcher } from '../../features/language-switcher/LanguageSwitcher';
import photo from '../../shared/assets/photo.jpg';
import { PROFILE } from '../../shared/data/profile';
import { useI18n } from '../../shared/i18n/useI18n';
import { Button } from '../../shared/ui/button/Button';
import { NavList } from './NavList';
import styles from './Sidebar.module.css';

/** Липкая боковая панель для экранов от 1024px: фото, имя, меню, язык и кнопка связи */
export function Sidebar() {
    const { t, locale } = useI18n();
    const { open } = useContactModal();

    return (
        <aside className={styles.sidebar}>
            <img className={styles.photo} src={photo} alt={PROFILE.fullName[locale]} width={132} height={132} />
            <p className={styles.name}>{PROFILE.fullName[locale]}</p>
            <p className={styles.role}>{PROFILE.role}</p>
            <nav className={styles.nav} aria-label={t.nav.label}>
                <NavList />
            </nav>
            <div className={styles.bottom}>
                <LanguageSwitcher />
                <Button block onClick={open}>
                    <span aria-hidden="true">✉</span> {t.cta.contactMe}
                </Button>
            </div>
        </aside>
    );
}
