import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Maximize, RotateCw, ArrowLeft, ArrowRight, Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface WebControlsDropdownProps {
    onFullscreen: () => void;
    onReload: () => void;
    onBack: () => void;
    onForward: () => void;
    onHome: () => void;
}

export function WebControlsDropdown({
    onFullscreen,
    onReload,
    onBack,
    onForward,
    onHome
}: WebControlsDropdownProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const webviewRef = useRef<Electron.WebviewTag | null>(null);

    useEffect(() => {
        const webview = document.querySelector('webview') as Electron.WebviewTag;
        if (webview) {
            webviewRef.current = webview;
        }
    }, []);

    const handleFullscreen = () => {
        if (webviewRef.current) {
            webviewRef.current.executeJavaScript(`
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    document.documentElement.requestFullscreen();
                }
            `);
        }
    };

    const handleReload = () => {
        if (webviewRef.current) {
            webviewRef.current.reload();
        }
    };

    const handleBack = () => {
        if (webviewRef.current && webviewRef.current.canGoBack()) {
            webviewRef.current.goBack();
        }
    };

    const handleForward = () => {
        if (webviewRef.current && webviewRef.current.canGoForward()) {
            webviewRef.current.goForward();
        }
    };

    const handleHome = () => {
        navigate("/");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{t("nav.web.controls")}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={onFullscreen}>
                    <Maximize className="mr-2 h-4 w-4" />
                    <span>{t("nav.web.fullscreen")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onReload}>
                    <RotateCw className="mr-2 h-4 w-4" />
                    <span>{t("nav.web.reload")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    <span>{t("nav.web.back")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onForward}>
                    <ArrowRight className="mr-2 h-4 w-4" />
                    <span>{t("nav.web.forward")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onHome}>
                    <Home className="mr-2 h-4 w-4" />
                    <span>{t("nav.web.home")}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}