import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { LOCALE_STORAGE_KEY } from '../shared/config/i18n.const';
import { App } from './App';

describe('App', () => {
    beforeEach(() => {
        window.localStorage.setItem(LOCALE_STORAGE_KEY, 'ru');
        window.history.replaceState(null, '', '/');
    });

    it('с корня сайта переходит на адрес сохранённого языка', () => {
        render(<App />);
        expect(window.location.pathname).toBe('/ru/');
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Строю надёжные сервисы');
    });

    it('открывает английскую версию по адресу /en/', () => {
        window.history.replaceState(null, '', '/en/');
        render(<App />);
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('I build reliable services');
        expect(document.documentElement.lang).toBe('en');
        expect(document.title).toBe('Ruslan Islamov — Team Lead / Senior Fullstack Developer');
    });

    it('переключает язык ссылкой, меняет адрес с сохранением якоря и запоминает выбор', async () => {
        window.history.replaceState(null, '', '/ru/#experience');
        render(<App />);

        const [switcher] = screen.getAllByRole('navigation', { name: 'Язык сайта' });
        const enLink = within(switcher).getByRole('link', { name: 'EN' });
        expect(enLink).toHaveAttribute('href', '/en/');
        await userEvent.click(enLink);

        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('I build reliable services');
        expect(window.location.pathname).toBe('/en/');
        expect(window.location.hash).toBe('#experience');
        expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('en');

        window.history.back();
        await waitFor(() => expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Строю надёжные'));
    });

    it('открывает форму связи в модальном окне', async () => {
        render(<App />);
        await userEvent.click(screen.getAllByRole('button', { name: /Связаться со мной/ })[0]);

        const dialog = screen.getByRole('dialog', { name: 'Написать мне' });
        expect(within(dialog).getByLabelText('Ваше имя')).toBeInTheDocument();
    });

    it('раскрывает только два последних места работы и сворачивает их по кнопке', async () => {
        render(<App />);
        const toggles = screen.getAllByRole('button', { name: /^(Свернуть|Развернуть):/ });
        expect(toggles.map((button) => button.getAttribute('aria-expanded'))).toEqual([
            'true',
            'true',
            'false',
            'false',
            'false',
        ]);
        expect(screen.getByText('Сервер параметризации POS-терминалов (TMS)')).not.toBeVisible();

        await userEvent.click(screen.getByRole('button', { name: 'Развернуть: Сириус' }));
        expect(screen.getByText('Сервер параметризации POS-терминалов (TMS)')).toBeVisible();

        await userEvent.click(screen.getByRole('button', { name: 'Свернуть: Технология Доверия' }));
        expect(screen.getByRole('button', { name: 'Развернуть: Технология Доверия' })).toHaveAttribute(
            'aria-expanded',
            'false',
        );
    });

    it('не показывает личные контакты', () => {
        const { container } = render(<App />);
        const text = container.textContent ?? '';
        expect(text).not.toMatch(/\+7|\(\d{3}\)\s?\d{3}/);
        expect(text).not.toMatch(/[\w.-]+@[\w-]+\.[a-z]{2,}/i);
        expect(text).not.toMatch(/t\.me\/|@[a-z0-9_]{4,}|₽/i);
    });
});
