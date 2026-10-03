import { Locale } from './enums';
import type { YearMonth } from './types';

/** Названия месяцев в коротком виде для каждого языка */
const MONTHS_SHORT: Record<Locale, string[]> = {
    [Locale.Ru]: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    [Locale.En]: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

/**
 * Возвращает текущий месяц.
 * @param now Текущая дата
 */
export function toYearMonth(now: Date): YearMonth {
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
}

/**
 * Считает число месяцев между двумя датами включительно (как на hh.ru: апрель–апрель = 1 месяц).
 * @param start Месяц начала
 * @param end Месяц окончания
 */
export function monthsBetween(start: YearMonth, end: YearMonth): number {
    return (end.year - start.year) * 12 + (end.month - start.month) + 1;
}

/**
 * Выбирает форму русского слова по числу.
 * @param n Число
 * @param forms Формы: [1, 2–4, 5+], например ['год', 'года', 'лет']
 */
function pluralRu(n: number, forms: [string, string, string]): string {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) {
        return forms[0];
    }
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
        return forms[1];
    }
    return forms[2];
}

/**
 * Возвращает слово «год» в нужной форме: «лет» / «years».
 * @param years Число лет
 * @param locale Язык
 */
export function yearsWord(years: number, locale: Locale): string {
    if (locale === Locale.Ru) {
        return pluralRu(years, ['год', 'года', 'лет']);
    }
    return years === 1 ? 'year' : 'years';
}

/**
 * Форматирует количество лет в виде «8 лет» / «8 years».
 * @param years Число лет
 * @param locale Язык
 */
export function formatYears(years: number, locale: Locale): string {
    return `${years} ${yearsWord(years, locale)}`;
}

/**
 * Форматирует продолжительность в месяцах: «2 года 7 месяцев» / «2 years 7 months».
 * @param totalMonths Общее число месяцев
 * @param locale Язык
 */
export function formatDuration(totalMonths: number, locale: Locale): string {
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    const parts: string[] = [];
    if (years > 0) {
        parts.push(formatYears(years, locale));
    }
    if (months > 0) {
        if (locale === Locale.Ru) {
            parts.push(`${months} ${pluralRu(months, ['месяц', 'месяца', 'месяцев'])}`);
        } else {
            parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
        }
    }
    return parts.join(' ');
}

/**
 * Форматирует месяц как «Апр 2024».
 * @param value Месяц
 * @param locale Язык
 */
export function formatYearMonth(value: YearMonth, locale: Locale): string {
    return `${MONTHS_SHORT[locale][value.month - 1]} ${value.year}`;
}
