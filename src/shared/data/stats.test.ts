import { describe, expect, it } from 'vitest';

import { PROFILE } from './profile';
import { getProfileStats } from './stats';

describe('getProfileStats', () => {
    it('считает стаж от начала первой работы до окончания последней (авг 2008 — апр 2026)', () => {
        const stats = getProfileStats(PROFILE, new Date(2026, 9, 3));
        expect(stats.totalMonths).toBe(213);
        expect(stats.totalYears).toBe(17);
        expect(stats.currentStackYears).toBe(8);
        expect(stats.teamLeadCount).toBe(2);
        expect(stats.technologyCount).toBeGreaterThanOrEqual(30);
    });

    it('считает стаж до текущего месяца, если есть текущее место работы', () => {
        const current = { ...PROFILE, jobs: [{ ...PROFILE.jobs[0], end: null }, ...PROFILE.jobs.slice(1)] };
        expect(getProfileStats(current, new Date(2026, 9, 3)).totalMonths).toBe(219);
    });
});
