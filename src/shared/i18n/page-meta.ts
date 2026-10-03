// Расширение .ts обязательно: файл подключается и конфигом Vite при сборке
import { Locale } from '../lib/enums.ts';

/** Метаданные страницы на одном языке: вкладка браузера, поисковики и превью ссылки в мессенджерах */
export type PageMeta = {
    /** Заголовок страницы */
    title: string;
    /** Краткое описание */
    description: string;
    /** Локаль в формате Open Graph */
    ogLocale: string;
};

/** Метаданные страниц по языкам. Используются приложением и при сборке страниц `/ru/` и `/en/` */
export const PAGE_META: Record<Locale, PageMeta> = {
    [Locale.Ru]: {
        title: 'Руслан Исламов — Team Lead / Senior Fullstack Developer',
        description:
            'Портфолио Руслана Исламова: Team Lead / Senior Fullstack Developer — Node.js, NestJS, React, Angular, ' +
            'микросервисы и руководство командой.',
        ogLocale: 'ru_RU',
    },
    [Locale.En]: {
        title: 'Ruslan Islamov — Team Lead / Senior Fullstack Developer',
        description:
            'Portfolio of Ruslan Islamov: Team Lead / Senior Fullstack Developer — Node.js, NestJS, React, Angular, ' +
            'microservices and team leadership.',
        ogLocale: 'en_US',
    },
};
