import React from "react";
import ToggleTheme from "@/components/ToggleTheme";
import { useTranslation } from "react-i18next";
import LangToggle from "@/components/LangToggle";
import { MainNavigationMenu } from "@/components/NavigationMenu";

export default function HomePage() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col h-screen">
            <nav className="p-4 bg-background">
                <MainNavigationMenu />
            </nav>
            <main className="flex-grow flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl font-bold">{t("title")}</h1>
                <LangToggle />
                <ToggleTheme />
            </main>
        </div>
    );
}
