import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';

export type Language = 'en' | 'bn';

type LanguageContextValue = {
    language: Language;
    setLanguage: (language: Language) => void;
    isBangla: boolean;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
    undefined,
);

const storageKey = 'site-language';

function initialLanguage(): Language {
    if (typeof window === 'undefined') {
        return 'en';
    }

    return window.localStorage.getItem(storageKey) === 'bn' ? 'bn' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>(initialLanguage);

    const setLanguage = (next: Language): void => {
        setLanguageState(next);
        window.localStorage.setItem(storageKey, next);
    };

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    return (
        <LanguageContext.Provider
            value={{ language, setLanguage, isBangla: language === 'bn' }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage(): LanguageContextValue {
    const value = useContext(LanguageContext);

    if (!value) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }

    return value;
}

export function Bilingual({ en, bn }: { en: ReactNode; bn: ReactNode }) {
    const { isBangla } = useLanguage();

    return <>{isBangla ? bn : en}</>;
}
