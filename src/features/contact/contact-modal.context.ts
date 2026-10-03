import { createContext } from 'react';

/** Значение контекста модального окна связи */
export type ContactModalContextValue = {
    /** Открыть окно с формой связи */
    open: () => void;
};

/** Контекст модального окна связи */
export const ContactModalContext = createContext<ContactModalContextValue | null>(null);
