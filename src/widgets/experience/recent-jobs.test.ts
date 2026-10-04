import { describe, expect, it } from 'vitest';

import { PROFILE } from '../../shared/data/profile';
import { getRecentJobKeys } from './recent-jobs';

describe('getRecentJobKeys', () => {
    it('выбирает последние места работы по дате начала', () => {
        expect(getRecentJobKeys(PROFILE.jobs, 2)).toEqual(new Set(['Технология Доверия', 'ВСК, САО']));
    });

    it('не зависит от порядка мест работы в данных', () => {
        const reversed = [...PROFILE.jobs].reverse();
        expect(getRecentJobKeys(reversed, 2)).toEqual(new Set(['Технология Доверия', 'ВСК, САО']));
    });

    it('учитывает новое место работы', () => {
        const newJob = { ...PROFILE.jobs[0], company: { ru: 'Новая', en: 'New' }, start: { year: 2026, month: 5 } };
        expect(getRecentJobKeys([newJob, ...PROFILE.jobs], 2)).toEqual(new Set(['Новая', 'Технология Доверия']));
    });
});
