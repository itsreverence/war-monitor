import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ToggleAdBlocker from "@/components/ToggleAdBlocker";
import { AddCustomSourceDialog } from "@/components/AddCustomSourceDialog";

export default function WebSettingsPage() {
    const { t } = useTranslation();
    const [webOptions, setWebOptions] = useState<Record<string, { name: string; url: string }[]>>({});

    const addCustomSource = (name: string, url: string, category: string) => {
        setWebOptions(prevOptions => ({
            ...prevOptions,
            [category]: [...(prevOptions[category] || []), { name, url }]
        }));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{t("nav.settings.web")}</h1>
            <div className="space-y-4">
                <div>
                    <h2 className="text-lg font-semibold mb-2">{t("nav.settings.adBlocker")}</h2>
                    <ToggleAdBlocker />
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-2">{t("nav.settings.customSources")}</h2>
                    <AddCustomSourceDialog 
                        onAddSource={addCustomSource} 
                        categories={['search', 'information', 'verification', 'translation', 'other']}
                    />
                </div>
            </div>
        </div>
    );
}