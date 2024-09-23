import React from "react";
import { useTranslation } from "react-i18next";
import { MainNavigationMenu } from "@/components/NavigationMenu";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { WebControlsDropdown } from "@/components/WebControlsDropdown";

export default function HomePage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const hasWebView = location.pathname.startsWith('/web/') || location.pathname === '/support';

    const handleFullscreen = () => {
        // Implement fullscreen logic
    };

    const handleReload = () => {
        // Implement reload logic
    };

    const handleBack = () => {
        // Implement back logic
    };

    const handleForward = () => {
        // Implement forward logic
    };

    const handleHome = () => {
        navigate("/");
    };

    return (
        <div className="flex h-screen flex-col">
            <nav className="bg-background p-4 flex justify-between items-center">
                <MainNavigationMenu />
                {hasWebView && (
                    <WebControlsDropdown
                        onFullscreen={handleFullscreen}
                        onReload={handleReload}
                        onBack={handleBack}
                        onForward={handleForward}
                        onHome={handleHome}
                    />
                )}
            </nav>
            <main className="flex-grow overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
}
