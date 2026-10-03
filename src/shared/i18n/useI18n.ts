import { useContext } from 'react';

import { I18nContext } from './i18n-context';
import type { I18nContextValue } from './i18n-context';

/** Возвращает текущий язык, словарь и функцию смены языка */
export function useI18n(): I18nContextValue {
    const value = useContext(I18nContext);
    if (!value) {
        throw new Error('useI18n должен использоваться внутри I18nProvider');
    }
    return value;
}
