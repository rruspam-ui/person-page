import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { LOCALE_STORAGE_KEY } from '../config/i18n.const';
import type { Locale } from '../lib/enums';
import { buildLocalePath, getLocaleFromPath } from '../lib/locale-path';
import { DICTIONARIES, I18nContext, detectInitialLocale } from './i18n-context';
import { PAGE_META } from './page-meta';

/** Свойства провайдера локализации */
type I18nProviderProps = {
    /** Дочерние элементы */
    children: ReactNode;
    /** Явно заданный начальный язык (для тестов); иначе язык берётся из адреса страницы */
    initialLocale?: Locale;
};

/**
 * Записывает значение в `<meta>`, если такой тег есть на странице.
 * @param selector CSS-селектор тега
 * @param content Новое значение
 */
function setMetaContent(selector: string, content: string): void {
    document.querySelector(selector)?.setAttribute('content', content);
}

/**
 * Запоминает выбранный язык для следующего визита на корень сайта.
 * @param locale Язык
 */
function saveLocale(locale: Locale): void {
    try {
        window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
        // выбор языка просто не запомнится
    }
}

/**
 * Провайдер локализации. Язык задаётся адресом: `/ru/` или `/en/`. Если в адресе языка нет (корень сайта),
 * он определяется по сохранённому выбору или языку браузера, и адрес заменяется на языковой.
 * Смена языка меняет адрес без перезагрузки; кнопки «назад/вперёд» переключают язык обратно.
 */
export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
    const [locale, setLocaleState] = useState<Locale>(
        () => initialLocale ?? getLocaleFromPath(window.location.pathname) ?? detectInitialLocale(),
    );
    const t = DICTIONARIES[locale];

    useEffect(() => {
        // При открытии корня сайта (или пути без языка) подставляет язык в адрес, не создавая запись в истории
        const { pathname, search, hash } = window.location;
        if (getLocaleFromPath(pathname) !== locale) {
            window.history.replaceState(
                window.history.state,
                '',
                `${buildLocalePath(pathname, locale)}${search}${hash}`,
            );
        }
    }, [locale]);

    useEffect(() => {
        /** Синхронизирует язык с адресом при переходах «назад/вперёд» */
        const handlePopState = (): void => {
            const fromPath = getLocaleFromPath(window.location.pathname);
            if (fromPath) {
                setLocaleState(fromPath);
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    useEffect(() => {
        const meta = PAGE_META[locale];
        document.documentElement.lang = locale;
        document.title = meta.title;
        setMetaContent('meta[name="description"]', meta.description);
        setMetaContent('meta[property="og:title"]', meta.title);
        setMetaContent('meta[property="og:description"]', meta.description);
        setMetaContent('meta[property="og:locale"]', meta.ogLocale);
    }, [locale]);

    const setLocale = useCallback((next: Locale) => {
        const { pathname, search, hash } = window.location;
        if (getLocaleFromPath(pathname) !== next) {
            window.history.pushState(window.history.state, '', `${buildLocalePath(pathname, next)}${search}${hash}`);
        }
        setLocaleState(next);
        saveLocale(next);
    }, []);

    const value = useMemo(() => ({ locale, t, setLocale }), [locale, t, setLocale]);

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
