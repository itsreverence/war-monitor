import React from "react";
import { useTranslation } from "react-i18next";
import { MainNavigationMenu } from "@/components/NavigationMenu";
import { Outlet } from "react-router-dom";

export default function HomePage() {
    const { t } = useTranslation();

    return (
        <div className="flex h-screen flex-col">
            <nav className="bg-background p-4">
                <MainNavigationMenu />
            </nav>
            <main className="flex-grow overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
}
