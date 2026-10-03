import { useContext } from 'react';

import { ContactModalContext } from './contact-modal.context';
import type { ContactModalContextValue } from './contact-modal.context';

/** Возвращает функцию открытия окна с формой связи */
export function useContactModal(): ContactModalContextValue {
    const value = useContext(ContactModalContext);
    if (!value) {
        throw new Error('useContactModal должен использоваться внутри ContactModalProvider');
    }
    return value;
}
