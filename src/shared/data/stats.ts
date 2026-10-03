import { monthsBetween, toYearMonth } from '../lib/duration';
import type { YearMonth } from '../lib/types';
import type { Profile } from './profile.types';

/** Ключевые цифры профиля, вычисленные из данных резюме */
export type ProfileStats = {
    /** Общий стаж в месяцах: от начала первой работы до окончания последней (или до текущего месяца) */
    totalMonths: number;
    /** Полных лет стажа */
    totalYears: number;
    /** Полных лет на текущем стеке: от `currentStackSince` до окончания последней работы (или текущего месяца) */
    currentStackYears: number;
    /** Число мест работы, где выполнял роль тимлида */
    teamLeadCount: number;
    /** Число уникальных технологий в навыках и стеке проектов */
    technologyCount: number;
};

/**
 * Переводит месяц в порядковый номер для сравнения.
 * @param value Месяц
 */
function toMonthIndex(value: YearMonth): number {
    return value.year * 12 + value.month;
}

/**
 * Считает ключевые цифры профиля.
 * @param profile Профиль
 * @param now Текущая дата
 */
export function getProfileStats(profile: Profile, now: Date): ProfileStats {
    const current = toYearMonth(now);
    const earliest = profile.jobs.reduce((min, job) =>
        toMonthIndex(job.start) < toMonthIndex(min.start) ? job : min,
    ).start;
    const latest = profile.jobs
        .map((job) => job.end ?? current)
        .reduce((max, end) => (toMonthIndex(end) > toMonthIndex(max) ? end : max));
    const totalMonths = monthsBetween(earliest, latest);
    const technologies = new Set([
        ...profile.skillGroups.flatMap((group) => group.items),
        ...profile.jobs.flatMap((job) => job.stack),
    ]);

    return {
        totalMonths,
        totalYears: Math.floor(totalMonths / 12),
        currentStackYears: Math.floor(monthsBetween(profile.currentStackSince, latest) / 12),
        teamLeadCount: profile.jobs.filter((job) => job.isTeamLead).length,
        technologyCount: technologies.size,
    };
}
