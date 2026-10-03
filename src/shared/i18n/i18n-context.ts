import { createContext } from 'react';

import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY } from '../config/i18n.const';
import { Locale } from '../lib/enums';
import { en } from './en';
import { ru } from './ru';
import type { Dictionary } from './ru';

/** Словари интерфейса по языкам */
export const DICTIONARIES: Record<Locale, Dictionary> = {
    [Locale.Ru]: ru,
    [Locale.En]: en,
};

/** Значение контекста локализации */
export type I18nContextValue = {
    /** Текущий язык */
    locale: Locale;
    /** Словарь текущего языка */
    t: Dictionary;
    /** Сменить язык */
    setLocale: (locale: Locale) => void;
};

/** Контекст локализации */
export const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * Проверяет, что строка — поддерживаемый язык.
 * @param value Проверяемое значение
 */
function isLocale(value: unknown): value is Locale {
    return Object.values(Locale).includes(value as Locale);
}

/** Определяет начальный язык: сохранённый выбор → язык браузера → язык по умолчанию */
export function detectInitialLocale(): Locale {
    try {
        const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
        if (isLocale(saved)) {
            return saved;
        }
    } catch {
        // localStorage может быть недоступен (приватный режим) — это не ошибка
    }
    const browser = window.navigator.language?.slice(0, 2).toLowerCase();
    if (browser === Locale.Ru) {
        return Locale.Ru;
    }
    if (browser) {
        return Locale.En;
    }
    return DEFAULT_LOCALE;
}
