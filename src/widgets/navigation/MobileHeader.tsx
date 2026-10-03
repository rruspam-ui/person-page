import { useEffect, useState } from 'react';

import { LanguageSwitcher } from '../../features/language-switcher/LanguageSwitcher';
import photo from '../../shared/assets/photo.jpg';
import { PROFILE } from '../../shared/data/profile';
import { useI18n } from '../../shared/i18n/useI18n';
import { NavList } from './NavList';
import styles from './MobileHeader.module.css';

/** Идентификатор выпадающего меню */
const MENU_ID = 'mobile-menu';

/** Липкая шапка для экранов до 1024px: фото, имя, язык и выпадающее меню */
export function MobileHeader() {
    const { t, locale } = useI18n();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (!isMenuOpen) {
            return;
        }
        /**
         * Закрывает меню по Esc.
         * @param event Событие клавиатуры
         */
        const handleKey = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [isMenuOpen]);

    return (
        <header className={styles.header}>
            <div className={styles.bar}>
                <img className={styles.photo} src={photo} alt="" width={40} height={40} />
                <div className={styles.identity}>
                    <p className={styles.name}>{PROFILE.fullName[locale]}</p>
                    <p className={styles.role}>{PROFILE.role}</p>
                </div>
                <LanguageSwitcher />
                <button
                    type="button"
                    className={styles.burger}
                    aria-expanded={isMenuOpen}
                    aria-controls={MENU_ID}
                    aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                >
                    <span className={isMenuOpen ? `${styles.icon} ${styles.iconOpen}` : styles.icon} />
                </button>
            </div>
            <nav id={MENU_ID} className={styles.menu} hidden={!isMenuOpen} aria-label={t.nav.label}>
                <NavList onNavigate={() => setIsMenuOpen(false)} />
            </nav>
        </header>
    );
}
