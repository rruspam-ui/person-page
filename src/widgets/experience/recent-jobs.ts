import type { Job } from '../../shared/data/profile.types';

/**
 * Возвращает ключ места работы, по которому запоминается, раскрыто ли оно.
 * @param job Место работы
 */
export function getJobKey(job: Job): string {
    return job.company.ru;
}

/**
 * Выбирает последние места работы по дате начала — они раскрыты по умолчанию.
 * Не зависит от порядка мест работы в данных.
 * @param jobs Места работы
 * @param count Сколько последних мест вернуть
 */
export function getRecentJobKeys(jobs: Job[], count: number): Set<string> {
    const recent = [...jobs]
        .sort((a, b) => b.start.year * 12 + b.start.month - (a.start.year * 12 + a.start.month))
        .slice(0, count);
    return new Set(recent.map(getJobKey));
}
