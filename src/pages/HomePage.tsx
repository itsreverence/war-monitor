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
    const [initialUrl, setInitialUrl] = useState("");
    const [isWebView, setIsWebView] = useState(false);
    const [activeTabId, setActiveTabId] = useState<string | null>(null);
    const [isTabView, setIsTabView] = useState(false);
    const [viewMode, setViewMode] = useState<'single' | 'tab' | 'multi'>('single');
    const [multiPageLayout, setMultiPageLayout] = useState<'horizontal' | 'vertical'>('vertical');

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
        const webview = webviewRef.current;
        if (webview) {
            const handleExitFullscreen = () => {
                setIsFullscreen(false);
            };
            webview.addEventListener('leave-full-screen', handleExitFullscreen);
            return () => {
                webview.removeEventListener('leave-full-screen', handleExitFullscreen);
            };
        }
    }, []);

    const handleFullscreen = () => {
        const webview = webviewRef.current;
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
        const webview = webviewRef.current;
        if (webview && initialUrl) {
            webview.loadURL(initialUrl);
        }
    };

    const handleToggleView = () => {
        setIsTabView(prev => !prev);
    };

    const handleChangeViewMode = (mode: 'single' | 'tab' | 'multi') => {
        setViewMode(mode);
    };

    const toggleMultiPageLayout = () => {
        setMultiPageLayout(prev => prev === 'vertical' ? 'horizontal' : 'vertical');
    };

    return (
        <div className="flex flex-col h-screen">
            <nav className="bg-background p-4 flex justify-between items-center">
                <MainNavigationMenu />
                {isWebView && (
                    <WebControlsDropdown
                        onFullscreen={handleFullscreen}
                        onReload={handleReload}
                        onBack={handleBack}
                        onForward={handleForward}
                        onHome={handleHome}
                        isFullscreen={isFullscreen}
                        hasInitialUrl={!!initialUrl}
                        isWebView={isWebView}
                        viewMode={viewMode}
                        onChangeViewMode={handleChangeViewMode}
                        isSupportPage={location.pathname === '/support'}
                        onToggleMultiPageLayout={toggleMultiPageLayout}
                        multiPageLayout={multiPageLayout}
                    />
                )}
            </nav>
            <main className="flex-1 overflow-hidden">
                <Outlet context={{ webviewRef, setInitialUrl, setIsWebView, viewMode, setViewMode, multiPageLayout }} />
            </main>
        </div>
    );
}
