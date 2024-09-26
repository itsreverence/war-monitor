import React, { createContext, useState, useContext } from 'react';

const initialWebOptions = {
    search: [
        { name: "Google", url: "https://www.google.com" },
        { name: "Bing", url: "https://www.bing.com" },
    ],
    information: [
        { name: "Wikipedia", url: "https://www.wikipedia.org" },
        { name: "Britannica", url: "https://www.britannica.com" },
    ],
    verification: [
        { name: "Snopes", url: "https://www.snopes.com" },
        { name: "FactCheck.org", url: "https://www.factcheck.org" },
    ],
    translation: [
        { name: "Google Translate", url: "https://translate.google.com" },
        { name: "DeepL", url: "https://www.deepl.com/translator" },
    ],
    other: [],
};

interface WebContextType {
    webOptions: Record<string, { name: string; url: string }[]>;
    setWebOptions: React.Dispatch<React.SetStateAction<Record<string, { name: string; url: string }[]>>>;
}

const WebContext = createContext<WebContextType | undefined>(undefined);

export const WebProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [webOptions, setWebOptions] = useState<Record<string, { name: string; url: string }[]>>(initialWebOptions);

    return (
        <WebContext.Provider value={{ webOptions, setWebOptions }}>
            {children}
        </WebContext.Provider>
    );
};

export const useWebContext = () => {
    const context = useContext(WebContext);
    if (context === undefined) {
        throw new Error('useWebContext must be used within a WebProvider');
    }
    return context;
};