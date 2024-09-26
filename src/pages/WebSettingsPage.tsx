import React from "react";
import { useTranslation } from "react-i18next";
import ToggleAdBlocker from "@/components/ToggleAdBlocker";

export default function WebSettingsPage() {
    const { t } = useTranslation();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{t("nav.settings.web")}</h1>
            <div className="space-y-4">
                <div>
                    <h2 className="text-lg font-semibold mb-2">{t("nav.settings.adBlocker")}</h2>
                    <ToggleAdBlocker />
                </div>
            </div>
        </div>
    );
}