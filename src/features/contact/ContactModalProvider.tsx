import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { FormTone } from '../../shared/lib/enums';
import { useI18n } from '../../shared/i18n/useI18n';
import { Modal } from '../../shared/ui/modal/Modal';
import { ContactModalContext } from './contact-modal.context';
import { ContactForm } from './ContactForm';
import styles from './ContactModalProvider.module.css';

/** Свойства провайдера модального окна связи */
type ContactModalProviderProps = {
    /** Дочерние элементы */
    children: ReactNode;
};

/** Провайдер окна с формой связи: даёт `open()` всем кнопкам «Связаться со мной» и рисует само окно */
export function ContactModalProvider({ children }: ContactModalProviderProps) {
    const { t } = useI18n();
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const value = useMemo(() => ({ open }), [open]);

    return (
        <ContactModalContext.Provider value={value}>
            {children}
            <Modal isOpen={isOpen} onClose={close} title={t.contact.modalTitle} closeLabel={t.contact.close}>
                <p className={styles.text}>{t.contact.modalText}</p>
                <ContactForm tone={FormTone.Light} />
            </Modal>
        </ContactModalContext.Provider>
    );
}
