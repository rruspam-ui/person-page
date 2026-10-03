/** Адрес Google Apps Script, который принимает заявки из формы связи */
export const CONTACT_ENDPOINT_URL =
    'https://script.google.com/macros/s/AKfycbxLUPo0bMmyMmh-A19_t_wpvwEfY5ODJjUJ9V-OsExxsv_SbLwz8OCi_GiDA512dfss1A/exec';

/** Сколько символов должно остаться в сообщении, чтобы счётчик подсветился как предупреждение */
export const MESSAGE_COUNTER_WARN_REMAINING = 100;

/** Таймаут отправки заявки, мс */
export const DEFAULT_SUBMIT_TIMEOUT_MS = 15_000;

/** Минимальная длина имени */
export const NAME_MIN_LENGTH = 2;

/** Максимальная длина имени */
export const NAME_MAX_LENGTH = 200;

/** Минимальная длина обратного контакта */
export const CONTACT_MIN_LENGTH = 3;

/** Максимальная длина обратного контакта */
export const CONTACT_MAX_LENGTH = 200;

/** Минимальная длина сообщения */
export const MESSAGE_MIN_LENGTH = 5;

/** Максимальная длина сообщения */
export const MESSAGE_MAX_LENGTH = 2000;
