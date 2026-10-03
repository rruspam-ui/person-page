import { ContactModalProvider } from '../features/contact';
import { I18nProvider } from '../shared/i18n/I18nContext';
import { ContactSection } from '../widgets/contact-section/ContactSection';
import { Education } from '../widgets/education/Education';
import { Experience } from '../widgets/experience/Experience';
import { FloatingCta } from '../widgets/floating-cta/FloatingCta';
import { Footer } from '../widgets/footer/Footer';
import { Hero } from '../widgets/hero/Hero';
import { MobileHeader } from '../widgets/navigation/MobileHeader';
import { Sidebar } from '../widgets/navigation/Sidebar';
import { Skills } from '../widgets/skills/Skills';
import { Strengths } from '../widgets/strengths/Strengths';
import styles from './App.module.css';

/** Корневой компонент: одностраничное портфолио */
export function App() {
    return (
        <I18nProvider>
            <ContactModalProvider>
                <MobileHeader />
                <div className={styles.layout}>
                    <Sidebar />
                    <main className={styles.main}>
                        <Hero />
                        <Strengths index={1} />
                        <Experience index={2} />
                        <Skills index={3} />
                        <Education index={4} />
                        <ContactSection />
                        <Footer />
                    </main>
                </div>
                <FloatingCta />
            </ContactModalProvider>
        </I18nProvider>
    );
}
