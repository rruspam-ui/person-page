import {
    CONTACT_MAX_LENGTH,
    CONTACT_MIN_LENGTH,
    MESSAGE_MAX_LENGTH,
    MESSAGE_MIN_LENGTH,
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
} from '../../shared/config/contact.const';
import { FieldName, ValidationError } from '../../shared/lib/enums';
import type { ContactPayload, FieldError, FieldErrors } from './contact.types';

/** Ограничения длины по полям */
export const FIELD_LIMITS: Record<FieldName, { min: number; max: number }> = {
    [FieldName.Name]: { min: NAME_MIN_LENGTH, max: NAME_MAX_LENGTH },
    [FieldName.Contact]: { min: CONTACT_MIN_LENGTH, max: CONTACT_MAX_LENGTH },
    [FieldName.Message]: { min: MESSAGE_MIN_LENGTH, max: MESSAGE_MAX_LENGTH },
};

/**
 * Удаляет пробелы по краям всех полей.
 * @param payload Данные формы
 */
export function trimPayload(payload: ContactPayload): ContactPayload {
    return {
        [FieldName.Name]: payload[FieldName.Name].trim(),
        [FieldName.Contact]: payload[FieldName.Contact].trim(),
        [FieldName.Message]: payload[FieldName.Message].trim(),
    };
}

/**
 * Проверяет одно поле.
 * @param field Поле
 * @param value Значение
 * @returns Ошибка или null, если значение корректно
 */
export function validateField(field: FieldName, value: string): FieldError | null {
    const trimmed = value.trim();
    const { min, max } = FIELD_LIMITS[field];
    if (!trimmed) {
        return { code: ValidationError.Required };
    }
    if (trimmed.length < min) {
        return { code: ValidationError.TooShort, limit: min };
    }
    if (trimmed.length > max) {
        return { code: ValidationError.TooLong, limit: max };
    }
    return null;
}

/**
 * Проверяет все поля формы.
 * @param payload Данные формы
 * @returns Ошибки по полям; пустой объект — форма корректна
 */
export function validateContact(payload: ContactPayload): FieldErrors {
    const errors: FieldErrors = {};
    for (const field of Object.values(FieldName)) {
        const error = validateField(field, payload[field]);
        if (error) {
            errors[field] = error;
        }
    }
    return errors;
}
