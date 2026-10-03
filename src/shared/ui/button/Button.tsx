import type { ButtonHTMLAttributes } from 'react';

import { ButtonVariant } from '../../lib/enums';
import styles from './Button.module.css';

/** Свойства кнопки */
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    /** Вариант оформления */
    variant?: ButtonVariant;
    /** Растянуть на всю ширину контейнера */
    block?: boolean;
};

/** Кнопка в стиле сайта */
export function Button({ variant = ButtonVariant.Primary, block = false, className, type, ...rest }: ButtonProps) {
    const classes = [styles.button, styles[variant], block ? styles.block : '', className ?? '']
        .filter(Boolean)
        .join(' ');

    return <button type={type ?? 'button'} className={classes} {...rest} />;
}
