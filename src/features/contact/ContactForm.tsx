import { useId, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import { MESSAGE_COUNTER_WARN_REMAINING } from '../../shared/config/contact.const';
import { FieldName, FormTone, SubmitStatus } from '../../shared/lib/enums';
import { useI18n } from '../../shared/i18n/useI18n';
import { Button } from '../../shared/ui/button/Button';
import type { ContactPayload, FieldError, FieldErrors } from './contact.types';
import { sendMessage } from './send-message';
import { FIELD_LIMITS, trimPayload, validateContact, validateField } from './validate';
import styles from './ContactForm.module.css';

/** Свойства формы связи */
type ContactFormProps = {
    /** Цветовая схема */
    tone?: FormTone;
    /** Реализация отправки (подменяется в тестах) */
    send?: (payload: ContactPayload) => Promise<void>;
};

/** Пустые значения формы */
const EMPTY_FORM: ContactPayload = {
    [FieldName.Name]: '',
    [FieldName.Contact]: '',
    [FieldName.Message]: '',
};

/** Имя скрытого поля-ловушки для ботов */
const HONEYPOT_NAME = 'website';

/** Форма связи: имя, обратный контакт и сообщение */
export function ContactForm({ tone = FormTone.Light, send = sendMessage }: ContactFormProps) {
    const { t } = useI18n();
    const formId = useId();
    const [values, setValues] = useState<ContactPayload>(EMPTY_FORM);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [status, setStatus] = useState<SubmitStatus>(SubmitStatus.Idle);

    /**
     * Текст ошибки поля на текущем языке.
     * @param error Ошибка валидации
     */
    const errorText = (error: FieldError): string =>
        t.contact.errors[error.code].replace('{n}', String(error.limit ?? ''));

    /**
     * Обновляет значение поля и снимает ошибку, если значение стало корректным.
     * @param event Событие изменения поля
     */
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const field = event.target.name as FieldName;
        const value = event.target.value;
        setValues((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: validateField(field, value) ?? undefined }));
        }
        if (status === SubmitStatus.Error) {
            setStatus(SubmitStatus.Idle);
        }
    };

    /**
     * Проверяет форму и отправляет заявку.
     * @param event Событие отправки формы
     */
    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        if (status === SubmitStatus.Sending) {
            return;
        }
        const nextErrors = validateContact(values);
        setErrors(nextErrors);
        const firstInvalid = Object.values(FieldName).find((field) => nextErrors[field]);
        if (firstInvalid) {
            event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
            return;
        }

        const honeypot = new FormData(event.currentTarget).get(HONEYPOT_NAME);
        setStatus(SubmitStatus.Sending);
        try {
            if (!honeypot) {
                await send(trimPayload(values));
            }
            setValues(EMPTY_FORM);
            setStatus(SubmitStatus.Success);
        } catch {
            setStatus(SubmitStatus.Error);
        }
    };

    const formClass = `${styles.form} ${tone === FormTone.Dark ? styles.dark : styles.light}`;

    if (status === SubmitStatus.Success) {
        return (
            <div className={`${formClass} ${styles.done}`} role="status">
                <p className={styles.successText}>{t.contact.success}</p>
                <Button onClick={() => setStatus(SubmitStatus.Idle)}>{t.contact.sendAnother}</Button>
            </div>
        );
    }

    /** Описание полей формы */
    const fields = [
        { name: FieldName.Name, label: t.contact.name, placeholder: t.contact.namePlaceholder, autoComplete: 'name' },
        {
            name: FieldName.Contact,
            label: t.contact.contact,
            placeholder: t.contact.contactPlaceholder,
            autoComplete: 'email',
        },
        { name: FieldName.Message, label: t.contact.message, placeholder: t.contact.messagePlaceholder },
    ];

    return (
        <form className={formClass} onSubmit={handleSubmit} noValidate>
            {fields.map((field) => {
                const inputId = `${formId}-${field.name}`;
                const errorId = `${inputId}-error`;
                const counterId = `${inputId}-counter`;
                const error = errors[field.name];
                const maxLength = FIELD_LIMITS[field.name].max;
                const remaining = maxLength - values[field.name].length;
                const isMessage = field.name === FieldName.Message;
                const describedBy = [error ? errorId : '', isMessage ? counterId : ''].filter(Boolean).join(' ');
                const common = {
                    id: inputId,
                    name: field.name,
                    value: values[field.name],
                    maxLength,
                    placeholder: field.placeholder,
                    onChange: handleChange,
                    'aria-invalid': error ? true : undefined,
                    'aria-describedby': describedBy || undefined,
                    className: styles.input,
                };

                return (
                    <div key={field.name} className={styles.field}>
                        <label htmlFor={inputId} className={styles.label}>
                            {field.label}
                        </label>
                        {isMessage ? (
                            <textarea {...common} rows={5} />
                        ) : (
                            <input {...common} type="text" autoComplete={field.autoComplete} />
                        )}
                        {error ? (
                            <p id={errorId} className={styles.error}>
                                {errorText(error)}
                            </p>
                        ) : null}
                        {isMessage ? (
                            <p
                                id={counterId}
                                className={
                                    remaining <= MESSAGE_COUNTER_WARN_REMAINING
                                        ? `${styles.counter} ${styles.counterWarn}`
                                        : styles.counter
                                }
                            >
                                {t.contact.charsLeft.replace('{n}', String(remaining))}
                            </p>
                        ) : null}
                    </div>
                );
            })}

            <div className={styles.honeypot} aria-hidden="true">
                <label>
                    Website
                    <input type="text" name={HONEYPOT_NAME} tabIndex={-1} autoComplete="off" />
                </label>
            </div>

            {status === SubmitStatus.Error ? (
                <p className={styles.submitError} role="alert">
                    {t.contact.error}
                </p>
            ) : null}

            <Button type="submit" block disabled={status === SubmitStatus.Sending}>
                {status === SubmitStatus.Sending ? t.contact.sending : t.contact.submit}
            </Button>
        </form>
    );
}
