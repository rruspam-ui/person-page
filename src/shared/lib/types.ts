import type { Locale } from './enums';

/** Текст, переведённый на все поддерживаемые языки */
export type LocalizedText = Record<Locale, string>;

/** Месяц календаря */
export type YearMonth = {
    /** Год, например 2024 */
    year: number;
    /** Месяц, 1–12 */
    month: number;
};
