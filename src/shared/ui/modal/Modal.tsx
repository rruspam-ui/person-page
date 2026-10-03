import { useEffect, useId, useRef } from 'react';
import type { MouseEvent, ReactNode } from 'react';

import styles from './Modal.module.css';

/** Свойства модального окна */
type ModalProps = {
    /** Открыто ли окно */
    isOpen: boolean;
    /** Закрыть окно */
    onClose: () => void;
    /** Заголовок */
    title: string;
    /** Подпись кнопки закрытия для экранных дикторов */
    closeLabel: string;
    /** Содержимое */
    children: ReactNode;
};

/**
 * Модальное окно на нативном `<dialog>`: фон становится неактивным, фокус остаётся внутри окна,
 * Esc и клик по затемнению закрывают окно. Пока окно открыто, прокрутка страницы заблокирована.
 */
export function Modal({ isOpen, onClose, title, closeLabel, children }: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleId = useId();

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) {
            return;
        }
        if (isOpen && !dialog.open) {
            dialog.showModal();
            document.body.classList.add('scroll-locked');
        }
        if (!isOpen && dialog.open) {
            dialog.close();
        }
        if (!isOpen) {
            document.body.classList.remove('scroll-locked');
        }
    }, [isOpen]);

    useEffect(() => () => document.body.classList.remove('scroll-locked'), []);

    /**
     * Закрывает окно по клику на затемнение (сам `<dialog>`, а не его содержимое).
     * @param event Событие клика
     */
    const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>): void => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <dialog
            ref={dialogRef}
            className={styles.dialog}
            aria-labelledby={titleId}
            onClose={onClose}
            onClick={handleBackdropClick}
        >
            <div className={styles.panel}>
                <div className={styles.header}>
                    <h2 id={titleId} className={styles.title}>
                        {title}
                    </h2>
                    <button type="button" className={styles.close} onClick={onClose} aria-label={closeLabel}>
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                {isOpen ? children : null}
            </div>
        </dialog>
    );
}
