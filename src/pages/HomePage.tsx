import React from "react";
import { useTranslation } from "react-i18next";
import { MainNavigationMenu } from "@/components/NavigationMenu";
import { Outlet } from "react-router-dom";

export default function HomePage() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col h-screen">
            <nav className="p-4 bg-background">
                <MainNavigationMenu />
            </nav>
            <main className="flex-grow overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
}
