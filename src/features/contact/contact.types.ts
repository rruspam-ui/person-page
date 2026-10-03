import type { FieldName, ValidationError } from '../../shared/lib/enums';

/** Данные заявки; ключи совпадают с полями, которые разбирает Google Apps Script */
export type ContactPayload = Record<FieldName, string>;

/** Ошибка валидации одного поля */
export type FieldError = {
    /** Код ошибки */
    code: ValidationError;
    /** Ограничение длины, нарушенное значением */
    limit?: number;
};

/** Ошибки валидации по полям */
export type FieldErrors = Partial<Record<FieldName, FieldError>>;
