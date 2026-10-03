import { CONTACT_ENDPOINT_URL, DEFAULT_SUBMIT_TIMEOUT_MS } from '../../shared/config/contact.const';
import type { ContactPayload } from './contact.types';

/**
 * Отправляет заявку в Google Apps Script.
 *
 * Тело — JSON с типом `text/plain`: такой запрос не требует CORS-preflight, а скрипт читает его через
 * `JSON.parse(e.postData.contents)`. Режим `no-cors`: ответ Apps Script прочитать нельзя, поэтому успехом
 * считается доставка запроса без сетевой ошибки. Повторной отправки при ошибке CORS не бывает.
 *
 * @param payload Данные заявки (уже проверенные и обрезанные)
 * @param fetchImpl Реализация fetch (подменяется в тестах)
 * @throws Error при сетевой ошибке или по таймауту
 */
export async function sendMessage(payload: ContactPayload, fetchImpl: typeof fetch = fetch): Promise<void> {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), DEFAULT_SUBMIT_TIMEOUT_MS);

    try {
        await fetchImpl(CONTACT_ENDPOINT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload),
            signal: controller.signal,
        });
    } finally {
        window.clearTimeout(timer);
    }
}
