import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { MainNavigationMenu } from "@/components/NavigationMenu";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { WebControlsDropdown } from "@/components/WebControlsDropdown";

export default function HomePage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [isFullscreen, setIsFullscreen] = useState(false);
    const webviewRefs = useRef<{ [key: string]: Electron.WebviewTag | null }>({});
    const [initialUrl, setInitialUrl] = useState("");
    const [isWebView, setIsWebView] = useState(false);
    const [activeTabId, setActiveTabId] = useState<string | null>(null);

    const hasWebView = location.pathname.startsWith('/web/') || location.pathname === '/support';

    useEffect(() => {
        setIsWebView(hasWebView);
    }, [location.pathname]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    useEffect(() => {
        const webview = webviewRefs.current[activeTabId!];
        if (webview) {
            const handleExitFullscreen = () => {
                setIsFullscreen(false);
            };
            webview.addEventListener('leave-full-screen', handleExitFullscreen);
            return () => {
                webview.removeEventListener('leave-full-screen', handleExitFullscreen);
            };
        }
    }, [activeTabId]);

    const handleFullscreen = () => {
        const webview = webviewRefs.current[activeTabId!];
        if (webview) {
            if (!isFullscreen) {
                webview.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }
    };

    const exitFullscreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        setIsFullscreen(false);
    };

    const handleReload = () => {
        const webview = webviewRefs.current[activeTabId!];
        if (webview) {
            webview.reload();
        }
    };

    const handleBack = () => {
        const webview = webviewRefs.current[activeTabId!];
        if (webview && webview.canGoBack()) {
            webview.goBack();
        }
    };

    const handleForward = () => {
        const webview = webviewRefs.current[activeTabId!];
        if (webview && webview.canGoForward()) {
            webview.goForward();
        }
    };

    const handleHome = () => {
        const webview = webviewRefs.current[activeTabId!];
        if (webview && initialUrl) {
            webview.loadURL(initialUrl);
        }
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
                        hasInitialUrl={!!initialUrl}
                        isWebView={isWebView}
                    />
                )}
            </nav>
            <main className="flex-grow overflow-hidden">
                <Outlet context={{ webviewRefs, setInitialUrl, setIsWebView, setActiveTabId }} />
            </main>
        </div>
    );
}
