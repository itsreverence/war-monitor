import React, { createContext, useState, useContext, useEffect } from 'react';
import { CustomSource } from '@/components/AddCustomSourceDialog';

const initialWebOptions: Record<string, CustomSource[]> = {
    search: [
        { name: "Google", url: "https://www.google.com", category: "search" },
        { name: "Bing", url: "https://www.bing.com", category: "search" },
    ],
    information: [
        { name: "Wikipedia", url: "https://www.wikipedia.org", category: "information" },
        { name: "Britannica", url: "https://www.britannica.com", category: "information" },
    ],
    verification: [
        { name: "Snopes", url: "https://www.snopes.com", category: "verification" },
        { name: "FactCheck.org", url: "https://www.factcheck.org", category: "verification" },
    ],
    translation: [
        { name: "Google Translate", url: "https://translate.google.com", category: "translation" },
        { name: "DeepL", url: "https://www.deepl.com/translator", category: "translation" },
    ],
    other: [],
};

interface WebContextType {
    webOptions: Record<string, CustomSource[]>;
    updateWebOption: (category: string, oldName: string, newName: string, newUrl: string) => void;
    addWebOption: (category: string, name: string, url: string) => void;
}

const WebContext = createContext<WebContextType | undefined>(undefined);

export const WebProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [webOptions, setWebOptions] = useState<Record<string, CustomSource[]>>(() => {
        const storedOptions = localStorage.getItem('webOptions');
        return storedOptions ? JSON.parse(storedOptions) : initialWebOptions;
    });

    useEffect(() => {
        localStorage.setItem('webOptions', JSON.stringify(webOptions));
    }, [webOptions]);

    const updateWebOption = (category: string, oldName: string, newName: string, newUrl: string) => {
        setWebOptions(prevOptions => {
            const newOptions = { ...prevOptions };
            newOptions[category] = prevOptions[category].map(option => 
                option.name === oldName ? { name: newName, url: newUrl, category } : option
            );
            return newOptions;
        });
    };

    const addWebOption = (category: string, name: string, url: string) => {
        setWebOptions(prevOptions => ({
            ...prevOptions,
            [category]: [...prevOptions[category], { name, url, category }]
        }));
    };

    return (
        <WebContext.Provider value={{ webOptions, updateWebOption, addWebOption }}>
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