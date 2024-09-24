import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { MainNavigationMenu } from "@/components/NavigationMenu";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { WebControlsDropdown } from "@/components/WebControlsDropdown";

export default function HomePage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [isFullscreen, setIsFullscreen] = useState(false);

    const hasWebView = location.pathname.startsWith('/web/') || location.pathname === '/support';

    const handleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
        const webview = document.querySelector('webview') as Electron.WebviewTag;
        if (webview) {
            if (!isFullscreen) {
                webview.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }
    };

    const handleReload = () => {
        const webview = document.querySelector('webview') as Electron.WebviewTag;
        if (webview) {
            webview.reload();
        }
    };

    const handleBack = () => {
        const webview = document.querySelector('webview') as Electron.WebviewTag;
        if (webview && webview.canGoBack()) {
            webview.goBack();
        }
    };

    const handleForward = () => {
        const webview = document.querySelector('webview') as Electron.WebviewTag;
        if (webview && webview.canGoForward()) {
            webview.goForward();
        }
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
                        isFullscreen={isFullscreen}
                    />
                )}
            </nav>
            <main className="flex-grow overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
}
