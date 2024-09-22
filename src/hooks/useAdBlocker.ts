import { useState, useEffect } from "react";

declare global {
    interface Window {
        adblocker: {
            getStatus: () => Promise<boolean>;
            toggle: (enable: boolean) => Promise<boolean>;
        };
    }
}

export function useAdBlocker() {
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        // Get initial status
        window.adblocker.getStatus().then(setIsEnabled);
    }, []);

    const toggleAdBlocker = async () => {
        const newStatus = await window.adblocker.toggle(!isEnabled);
        setIsEnabled(newStatus);
    };

    return { isEnabled, toggleAdBlocker };
}