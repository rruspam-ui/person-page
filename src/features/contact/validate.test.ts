import { describe, expect, it } from 'vitest';

import { FieldName, ValidationError } from '../../shared/lib/enums';
import { trimPayload, validateContact } from './validate';

describe('validateContact', () => {
    it('требует заполнить все поля', () => {
        const errors = validateContact({ name: '', contact: '  ', message: '' });
        expect(errors[FieldName.Name]?.code).toBe(ValidationError.Required);
        expect(errors[FieldName.Contact]?.code).toBe(ValidationError.Required);
        expect(errors[FieldName.Message]?.code).toBe(ValidationError.Required);
    });

    it('проверяет минимальную и максимальную длину', () => {
        const errors = validateContact({ name: 'А', contact: '@tg', message: 'x'.repeat(2001) });
        expect(errors[FieldName.Name]).toEqual({ code: ValidationError.TooShort, limit: 2 });
        expect(errors[FieldName.Contact]).toBeUndefined();
        expect(errors[FieldName.Message]).toEqual({ code: ValidationError.TooLong, limit: 2000 });
    });

    it('ограничивает имя и контакт 200 символами', () => {
        const errors = validateContact({ name: 'x'.repeat(201), contact: 'x'.repeat(201), message: 'Привет' });
        expect(errors[FieldName.Name]).toEqual({ code: ValidationError.TooLong, limit: 200 });
        expect(errors[FieldName.Contact]).toEqual({ code: ValidationError.TooLong, limit: 200 });
        expect(validateContact({ name: 'x'.repeat(200), contact: 'x'.repeat(200), message: 'x'.repeat(2000) })).toEqual(
            {},
        );
    });

    it('пропускает корректные данные', () => {
        expect(validateContact({ name: 'Анна', contact: '@anna', message: 'Есть вакансия' })).toEqual({});
    });

    it('обрезает пробелы', () => {
        expect(trimPayload({ name: ' Анна ', contact: ' @a ', message: ' текст ' })).toEqual({
            name: 'Анна',
            contact: '@a',
            message: 'текст',
        });
    });
});
