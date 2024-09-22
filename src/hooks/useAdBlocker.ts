import { useState, useEffect } from "react";

export function useAdBlocker() {
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        const storedValue = localStorage.getItem("adBlockerEnabled");
        setIsEnabled(storedValue === "true");
    }, []);

    const toggleAdBlocker = () => {
        const newValue = !isEnabled;
        setIsEnabled(newValue);
        localStorage.setItem("adBlockerEnabled", String(newValue));
    };

    return { isEnabled, toggleAdBlocker };
}