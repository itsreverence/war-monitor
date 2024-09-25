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
    const webviewRef = useRef<Electron.WebviewTag | null>(null);

    const hasWebView = location.pathname.startsWith('/web/') || location.pathname === '/support';

    useEffect(() => {
        const webview = webviewRef.current;
        if (webview) {
            const handleExitFullscreen = () => {
                setIsFullscreen(false);
            };
            webview.addEventListener('leave-full-screen', handleExitFullscreen);
            document.addEventListener('fullscreenchange', () => {
                setIsFullscreen(!!document.fullscreenElement);
            });
            return () => {
                webview.removeEventListener('leave-full-screen', handleExitFullscreen);
                document.removeEventListener('fullscreenchange', () => {
                    setIsFullscreen(!!document.fullscreenElement);
                });
            };
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isFullscreen) {
                exitFullscreen();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isFullscreen]);

    const handleFullscreen = () => {
        const webview = webviewRef.current;
        if (webview) {
            if (!isFullscreen) {
                webview.requestFullscreen();
                setIsFullscreen(true);
            } else {
                exitFullscreen();
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
        const webview = webviewRef.current;
        if (webview) {
            webview.reload();
        }
    };

    const handleBack = () => {
        const webview = webviewRef.current;
        if (webview && webview.canGoBack()) {
            webview.goBack();
        }
    };

    const handleForward = () => {
        const webview = webviewRef.current;
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
                <Outlet context={{ webviewRef }} />
            </main>
        </div>
    );
}
