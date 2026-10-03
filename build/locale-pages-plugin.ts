import type { Plugin } from 'vite';

import { DEFAULT_LOCALE } from '../src/shared/config/i18n.const.ts';
import { Locale } from '../src/shared/lib/enums.ts';
import { PAGE_META } from '../src/shared/i18n/page-meta.ts';

/**
 * Экранирует текст для вставки в HTML (в том числе в значения атрибутов).
 * @param value Текст
 */
function escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * Подставляет метаданные языка в шаблон `index.html` вместо меток `%PAGE_*%`.
 * @param html Шаблон страницы
 * @param locale Язык
 */
function fillPageMeta(html: string, locale: Locale): string {
    const meta = PAGE_META[locale];
    return html
        .replaceAll('%PAGE_LANG%', locale)
        .replaceAll('%PAGE_TITLE%', escapeHtml(meta.title))
        .replaceAll('%PAGE_DESCRIPTION%', escapeHtml(meta.description))
        .replaceAll('%PAGE_OG_LOCALE%', meta.ogLocale);
}

/**
 * Плагин языковых страниц. В режиме разработки подставляет в `index.html` метаданные языка по умолчанию.
 * При сборке создаёт `ru/index.html` и `en/index.html` с метаданными своего языка — так ссылки `/ru/` и `/en/`
 * открываются на любом статическом хостинге без настройки сервера, а превью ссылки показывает нужный язык.
 * Корневой `index.html` получает язык по умолчанию; приложение само переводит его адрес на `/ru/` или `/en/`.
 *
 * Страницы строятся из шаблона внутри сборки (без чтения файлов с диска), поэтому повторный вызов хука
 * не может испортить результат.
 */
export function localePagesPlugin(): Plugin {
    let isBuild = false;

    return {
        name: 'locale-pages',
        enforce: 'post',
        configResolved(config) {
            isBuild = config.command === 'build';
        },
        transformIndexHtml(html) {
            // при сборке метки остаются в шаблоне и заполняются для каждого языка в generateBundle
            return isBuild ? html : fillPageMeta(html, DEFAULT_LOCALE);
        },
        generateBundle: {
            order: 'post',
            handler(_options, bundle) {
                const index = bundle['index.html'];
                if (!index || index.type !== 'asset') {
                    this.error('locale-pages: в сборке нет index.html');
                }
                const template = String(index.source);
                if (!template.includes('%PAGE_TITLE%')) {
                    this.error('locale-pages: в index.html нет меток %PAGE_*%');
                }

                index.source = fillPageMeta(template, DEFAULT_LOCALE);
                for (const locale of Object.values(Locale)) {
                    // страница лежит на уровень глубже, поэтому относительные пути ./ → ../
                    this.emitFile({
                        type: 'asset',
                        fileName: `${locale}/index.html`,
                        source: fillPageMeta(template, locale).replace(/(src|href)="\.\//g, '$1="../'),
                    });
                }
            },
        },
    };
}
