import { ContactForm } from '../../features/contact';
import { FormTone, SectionId } from '../../shared/lib/enums';
import { useI18n } from '../../shared/i18n/useI18n';
import styles from './ContactSection.module.css';

/** Секция контактов со встроенной формой связи */
export function ContactSection() {
    const { t } = useI18n();

    return (
        <section id={SectionId.Contacts} className={styles.section} aria-labelledby="contacts-title">
            <div className={styles.card}>
                <div>
                    <h2 id="contacts-title" className={styles.title}>
                        {t.contact.title}
                    </h2>
                    <p className={styles.text}>{t.contact.text}</p>
                </div>
                <ContactForm tone={FormTone.Dark} />
            </div>
        </section>
    );
}
