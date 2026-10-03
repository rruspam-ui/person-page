import type { MouseEvent } from 'react';

import { Locale } from '../../shared/lib/enums';
import { buildLocalePath } from '../../shared/lib/locale-path';
import { useI18n } from '../../shared/i18n/useI18n';
import styles from './LanguageSwitcher.module.css';

/** Подписи языков на переключателе */
const LOCALE_LABELS: Record<Locale, string> = {
    [Locale.Ru]: 'RU',
    [Locale.En]: 'EN',
};

/**
 * Переключатель языка RU / EN (для тёмно-зелёного фона). Каждый вариант — обычная ссылка на `/ru/` или `/en/`,
 * её можно открыть в новой вкладке или скопировать; обычный клик переключает язык без перезагрузки страницы.
 */
export function LanguageSwitcher() {
    const { locale, setLocale, t } = useI18n();

    /**
     * Переключает язык без перезагрузки, если клик обычный (без Ctrl/Cmd/Shift и не средней кнопкой).
     * @param event Событие клика
     * @param next Выбранный язык
     */
    const handleClick = (event: MouseEvent<HTMLAnchorElement>, next: Locale): void => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }
        event.preventDefault();
        setLocale(next);
    };

    return (
        <nav className={styles.switcher} aria-label={t.nav.language}>
            {Object.values(Locale).map((item) => (
                <a
                    key={item}
                    href={buildLocalePath(window.location.pathname, item)}
                    hrefLang={item}
                    lang={item}
                    className={item === locale ? `${styles.option} ${styles.active}` : styles.option}
                    aria-current={item === locale ? 'page' : undefined}
                    onClick={(event) => handleClick(event, item)}
                >
                    {LOCALE_LABELS[item]}
                </a>
            ))}
        </nav>
    );
}
