import { useContactModal } from '../../features/contact';
import { SectionId } from '../../shared/lib/enums';
import { useElementsVisible } from '../../shared/lib/useElementsVisible';
import { useI18n } from '../../shared/i18n/useI18n';
import { Button } from '../../shared/ui/button/Button';
import { HERO_CTA_ID } from '../hero/Hero';
import styles from './FloatingCta.module.css';

/** Элементы, при видимости которых плавающая кнопка не нужна */
const HIDE_WHEN_VISIBLE = [HERO_CTA_ID, SectionId.Contacts];

/**
 * Всегда доступная кнопка «Связаться со мной»: на телефоне — полоса внизу экрана, на широком экране —
 * плавающая кнопка в правом нижнем углу. Прячется, пока на экране кнопка первого экрана или форма контактов.
 */
export function FloatingCta() {
    const { t } = useI18n();
    const { open } = useContactModal();
    const isHidden = useElementsVisible(HIDE_WHEN_VISIBLE);

    return (
        <div className={isHidden ? `${styles.wrapper} ${styles.hidden}` : styles.wrapper} inert={isHidden}>
            <Button className={styles.button} onClick={open}>
                <span aria-hidden="true">✉</span> {t.cta.contactMe}
            </Button>
        </div>
    );
}
