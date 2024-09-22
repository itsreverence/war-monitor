import React from "react";
import { useTranslation } from "react-i18next";
import { MainNavigationMenu } from "@/components/NavigationMenu";

export default function HomePage() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col h-screen">
            <nav className="p-4 bg-background">
                <MainNavigationMenu />
            </nav>
            <main className="flex-grow p-4">
                <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
                <p>{t('description')}</p>
            </main>
        </div>
    );
}
