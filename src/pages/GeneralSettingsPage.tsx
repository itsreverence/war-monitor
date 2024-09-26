import React from "react";
import { useTranslation } from "react-i18next";
import ToggleTheme from "@/components/ToggleTheme";
import LangToggle from "@/components/LangToggle";

export default function GeneralSettingsPage() {
    const { t } = useTranslation();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{t("nav.settings.general")}</h1>
            <div className="space-y-4">
                <div>
                    <h2 className="text-lg font-semibold mb-2">{t("nav.settings.theme")}</h2>
                    <ToggleTheme />
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-2">{t("nav.settings.language")}</h2>
                    <LangToggle />
                </div>
            </div>
        </div>
    );
}