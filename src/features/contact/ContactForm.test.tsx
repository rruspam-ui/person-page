import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Locale } from '../../shared/lib/enums';
import { I18nProvider } from '../../shared/i18n/I18nContext';
import { ContactForm } from './ContactForm';
import type { ContactPayload } from './contact.types';

/**
 * Рендерит форму с подменённой отправкой.
 * @param send Реализация отправки
 */
function renderForm(send: (payload: ContactPayload) => Promise<void>) {
    return render(
        <I18nProvider initialLocale={Locale.Ru}>
            <ContactForm send={send} />
        </I18nProvider>,
    );
}

describe('ContactForm', () => {
    it('показывает ошибки и не отправляет пустую форму', async () => {
        const send = vi.fn().mockResolvedValue(undefined);
        renderForm(send);

        await userEvent.click(screen.getByRole('button', { name: 'Отправить' }));

        expect(screen.getAllByText('Заполните это поле')).toHaveLength(3);
        expect(screen.getByLabelText('Ваше имя')).toHaveFocus();
        expect(send).not.toHaveBeenCalled();
    });

    it('отправляет обрезанные значения и показывает благодарность', async () => {
        const send = vi.fn().mockResolvedValue(undefined);
        renderForm(send);

        await userEvent.type(screen.getByLabelText('Ваше имя'), '  Анна ');
        await userEvent.type(screen.getByLabelText('Как с вами связаться'), '@anna_hr');
        await userEvent.type(screen.getByLabelText('Сообщение'), 'Есть вакансия тимлида');
        await userEvent.click(screen.getByRole('button', { name: 'Отправить' }));

        expect(send).toHaveBeenCalledWith({ name: 'Анна', contact: '@anna_hr', message: 'Есть вакансия тимлида' });
        expect(await screen.findByRole('status')).toHaveTextContent('Спасибо!');
    });

    it('сообщает об ошибке сети и сохраняет введённое', async () => {
        const send = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));
        renderForm(send);

        await userEvent.type(screen.getByLabelText('Ваше имя'), 'Анна');
        await userEvent.type(screen.getByLabelText('Как с вами связаться'), '@anna_hr');
        await userEvent.type(screen.getByLabelText('Сообщение'), 'Есть вакансия');
        await userEvent.click(screen.getByRole('button', { name: 'Отправить' }));

        expect(await screen.findByRole('alert')).toHaveTextContent('Не удалось отправить сообщение');
        expect(screen.getByLabelText('Ваше имя')).toHaveValue('Анна');
    });

    it('ограничивает длину полей и показывает, сколько символов осталось в сообщении', async () => {
        renderForm(vi.fn().mockResolvedValue(undefined));

        expect(screen.getByLabelText('Ваше имя')).toHaveAttribute('maxLength', '200');
        expect(screen.getByLabelText('Как с вами связаться')).toHaveAttribute('maxLength', '200');
        const message = screen.getByLabelText('Сообщение');
        expect(message).toHaveAttribute('maxLength', '2000');
        expect(screen.getByText('Осталось символов: 2000')).toBeInTheDocument();
        expect(message).toHaveAccessibleDescription('Осталось символов: 2000');

        await userEvent.type(message, 'Привет');
        expect(screen.getByText('Осталось символов: 1994')).toBeInTheDocument();
    });
});
