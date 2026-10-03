import { useI18n } from '../../shared/i18n/useI18n';
import styles from './Footer.module.css';

/** Подвал страницы */
export function Footer() {
    const { t } = useI18n();

    return (
        <footer className={styles.footer}>
            © {new Date().getFullYear()} {t.footer.rights}
        </footer>
    );
}
