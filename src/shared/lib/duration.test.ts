import { describe, expect, it } from 'vitest';

import { Locale } from './enums';
import { formatDuration, formatYearMonth, monthsBetween } from './duration';

describe('duration', () => {
    it('считает месяцы включительно, как hh.ru', () => {
        expect(monthsBetween({ year: 2024, month: 4 }, { year: 2026, month: 10 })).toBe(31);
        expect(monthsBetween({ year: 2022, month: 1 }, { year: 2024, month: 4 })).toBe(28);
        expect(monthsBetween({ year: 2018, month: 3 }, { year: 2021, month: 12 })).toBe(46);
    });

    it('склоняет годы и месяцы по-русски', () => {
        expect(formatDuration(31, Locale.Ru)).toBe('2 года 7 месяцев');
        expect(formatDuration(104, Locale.Ru)).toBe('8 лет 8 месяцев');
        expect(formatDuration(13, Locale.Ru)).toBe('1 год 1 месяц');
        expect(formatDuration(12 * 21 + 3, Locale.Ru)).toBe('21 год 3 месяца');
        expect(formatDuration(12 * 11, Locale.Ru)).toBe('11 лет');
    });

    it('форматирует по-английски', () => {
        expect(formatDuration(31, Locale.En)).toBe('2 years 7 months');
        expect(formatDuration(13, Locale.En)).toBe('1 year 1 month');
    });

    it('форматирует месяц', () => {
        expect(formatYearMonth({ year: 2024, month: 4 }, Locale.Ru)).toBe('Апр 2024');
        expect(formatYearMonth({ year: 2022, month: 1 }, Locale.En)).toBe('Jan 2022');
    });
});
