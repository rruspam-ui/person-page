import { Locale } from './enums';

/** Языковой сегмент в конце пути: `/en`, `/en/`, `/en/index.html` (в том числе в подпапке: `/site/en/`) */
const LOCALE_SEGMENT = new RegExp(`/(${Object.values(Locale).join('|')})(?:/(?:index\\.html)?)?$`);

/**
 * Определяет язык по пути страницы.
 * @param pathname Путь, например `location.pathname`
 * @returns Язык или null, если в пути нет языкового сегмента
 */
export function getLocaleFromPath(pathname: string): Locale | null {
    const match = LOCALE_SEGMENT.exec(pathname);
    return match ? (match[1] as Locale) : null;
}

/**
 * Строит путь страницы на нужном языке, сохраняя подпапку сайта.
 * `/` → `/en/`, `/en/` → `/ru/`, `/site/index.html` → `/site/en/`.
 * @param pathname Текущий путь
 * @param locale Нужный язык
 */
export function buildLocalePath(pathname: string, locale: Locale): string {
    if (LOCALE_SEGMENT.test(pathname)) {
        return pathname.replace(LOCALE_SEGMENT, `/${locale}/`);
    }
    const dir = pathname.slice(0, pathname.lastIndexOf('/') + 1);
    return `${dir}${locale}/`;
}
