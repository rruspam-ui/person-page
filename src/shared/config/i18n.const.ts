// Расширение .ts обязательно: файл подключается и конфигом Vite при сборке
import { Locale } from '../lib/enums.ts';

/** Ключ localStorage, где хранится выбранный язык */
export const LOCALE_STORAGE_KEY = 'portfolio.locale';

/** Язык по умолчанию */
export const DEFAULT_LOCALE = Locale.Ru;
