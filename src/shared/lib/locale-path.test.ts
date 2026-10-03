import { describe, expect, it } from 'vitest';

import { Locale } from './enums';
import { buildLocalePath, getLocaleFromPath } from './locale-path';

describe('locale-path', () => {
    it('определяет язык по пути', () => {
        expect(getLocaleFromPath('/en/')).toBe(Locale.En);
        expect(getLocaleFromPath('/en')).toBe(Locale.En);
        expect(getLocaleFromPath('/ru/index.html')).toBe(Locale.Ru);
        expect(getLocaleFromPath('/portfolio/en/')).toBe(Locale.En);
        expect(getLocaleFromPath('/')).toBeNull();
        expect(getLocaleFromPath('/enterprise/')).toBeNull();
        expect(getLocaleFromPath('/de/')).toBeNull();
    });

    it('строит путь на другом языке, сохраняя подпапку', () => {
        expect(buildLocalePath('/', Locale.En)).toBe('/en/');
        expect(buildLocalePath('/ru/', Locale.En)).toBe('/en/');
        expect(buildLocalePath('/en', Locale.Ru)).toBe('/ru/');
        expect(buildLocalePath('/portfolio/', Locale.Ru)).toBe('/portfolio/ru/');
        expect(buildLocalePath('/portfolio/index.html', Locale.En)).toBe('/portfolio/en/');
        expect(buildLocalePath('/portfolio/en/index.html', Locale.Ru)).toBe('/portfolio/ru/');
    });
});
