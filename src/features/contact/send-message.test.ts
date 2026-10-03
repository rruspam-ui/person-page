import { describe, expect, it, vi } from 'vitest';

import { CONTACT_ENDPOINT_URL } from '../../shared/config/contact.const';
import { sendMessage } from './send-message';

describe('sendMessage', () => {
    it('отправляет JSON с полями name, contact, message как text/plain', async () => {
        const fetchMock = vi.fn().mockResolvedValue(new Response(null));
        await sendMessage({ name: 'Анна', contact: '@anna', message: 'Привет' }, fetchMock);

        expect(fetchMock).toHaveBeenCalledTimes(1);
        const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
        expect(url).toBe(CONTACT_ENDPOINT_URL);
        expect(init.method).toBe('POST');
        expect(init.mode).toBe('no-cors');
        expect(init.headers).toEqual({ 'Content-Type': 'text/plain;charset=utf-8' });
        expect(JSON.parse(init.body as string)).toEqual({ name: 'Анна', contact: '@anna', message: 'Привет' });
    });

    it('пробрасывает сетевую ошибку', async () => {
        const fetchMock = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));
        await expect(sendMessage({ name: 'Анна', contact: '@a', message: 'Привет' }, fetchMock)).rejects.toThrow(
            'Failed to fetch',
        );
    });
});
