import React, { createContext, useState, useContext, useEffect } from 'react';

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
    updateWebOption: (category: string, oldName: string, newName: string, newUrl: string) => void;
    addWebOption: (category: string, name: string, url: string) => void;
}

const WebContext = createContext<WebContextType | undefined>(undefined);

export const WebProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [webOptions, setWebOptions] = useState<Record<string, { name: string; url: string }[]>>(() => {
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
                option.name === oldName ? { name: newName, url: newUrl } : option
            );
            return newOptions;
        });
    };

    const addWebOption = (category: string, name: string, url: string) => {
        setWebOptions(prevOptions => ({
            ...prevOptions,
            [category]: [...prevOptions[category], { name, url }]
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