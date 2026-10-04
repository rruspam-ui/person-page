import type { LocalizedText, YearMonth } from '../lib/types';

/** Сильная сторона кандидата */
export type Strength = {
    /** Короткий заголовок */
    title: LocalizedText;
    /** Пояснение с фактами из опыта */
    description: LocalizedText;
};

/** Место работы */
export type Job = {
    /** Название компании */
    company: LocalizedText;
    /** Город; не указывается, если неизвестен */
    city?: LocalizedText;
    /** Отрасль */
    industry: LocalizedText;
    /** Должность */
    position: LocalizedText;
    /** Выполнял ли обязанности тимлида */
    isTeamLead: boolean;
    /** Месяц начала */
    start: YearMonth;
    /** Месяц окончания; null — работаю по настоящее время */
    end: YearMonth | null;
    /** Краткое описание роли */
    summary: LocalizedText;
    /** Ключевые результаты и обязанности */
    achievements: LocalizedText[];
    /** Технологии */
    stack: string[];
};

/** Группа навыков */
export type SkillGroup = {
    /** Название группы */
    title: LocalizedText;
    /** Навыки */
    items: string[];
};

/** Образование */
export type Education = {
    /** Учебное заведение */
    institution: LocalizedText;
    /** Специальность и квалификация */
    speciality: LocalizedText;
    /** Год окончания */
    year: number;
};

/** Владение иностранным языком */
export type LanguageSkill = {
    /** Язык */
    name: LocalizedText;
    /** Уровень */
    level: LocalizedText;
};

/** Публичный профиль кандидата. Телефон, почта и прочие личные контакты сюда не попадают */
export type Profile = {
    /** Имя и фамилия */
    fullName: LocalizedText;
    /** Желаемая роль */
    role: string;
    /** Главный тезис первого экрана */
    headline: LocalizedText;
    /**
     * Короткое описание под тезисом. Плейсхолдеры: `{total}` — общий стаж («20+ лет»),
     * `{recent}` — стаж на текущем стеке («8 лет»)
     */
    lead: LocalizedText;
    /** Месяц, с которого работаю на текущем стеке (Node.js / React / Angular) */
    currentStackSince: YearMonth;
    /** Город, переезд и формат работы */
    workConditions: LocalizedText[];
    /** Сильные стороны */
    strengths: Strength[];
    /** Опыт работы, от нового к старому */
    jobs: Job[];
    /** Навыки по группам */
    skillGroups: SkillGroup[];
    /** Образование */
    education: Education[];
    /** Языки */
    languages: LanguageSkill[];
};
