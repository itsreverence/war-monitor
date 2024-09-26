import React from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Maximize, RotateCw, ArrowLeft, ArrowRight, Home, MenuIcon, FlipHorizontal, FlipVertical } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface WebControlsDropdownProps {
    onFullscreen: () => void;
    onReload: () => void;
    onBack: () => void;
    onForward: () => void;
    onHome: () => void;
    isFullscreen: boolean;
    hasInitialUrl: boolean;
    isWebView: boolean;
    viewMode: 'single' | 'tab' | 'multi';
    onChangeViewMode: (mode: 'single' | 'tab' | 'multi') => void;
    isSupportPage: boolean;
    onToggleMultiPageLayout: () => void;
    multiPageLayout: 'horizontal' | 'vertical';
}

export function WebControlsDropdown({
    onFullscreen,
    onReload,
    onBack,
    onForward,
    onHome,
    isFullscreen,
    hasInitialUrl,
    isWebView,
    viewMode,
    onChangeViewMode,
    isSupportPage,
    onToggleMultiPageLayout,
    multiPageLayout,
}: WebControlsDropdownProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <MenuIcon className="h-[1.2rem] w-[1.2rem]" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onFullscreen}>
                    <Maximize className="mr-2 h-4 w-4" />
                    <span>{isFullscreen ? t("nav.web.exitFullscreen") : t("nav.web.fullscreen")}</span>
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
                <DropdownMenuItem onClick={onHome} disabled={!hasInitialUrl || !isWebView}>
                    <Home className="mr-2 h-4 w-4" />
                    <span>{t("nav.web.home")}</span>
                </DropdownMenuItem>
                {!isSupportPage && (
                    <>
                        <DropdownMenuItem onClick={() => onChangeViewMode('single')}>
                            Switch to Single Page
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onChangeViewMode('tab')}>
                            Switch to Tab View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onChangeViewMode('multi')}>
                            Switch to Multi Page
                        </DropdownMenuItem>
                        {viewMode === 'multi' && (
                            <DropdownMenuItem onClick={onToggleMultiPageLayout}>
                                {multiPageLayout === 'vertical' ? <FlipHorizontal className="mr-2 h-4 w-4" /> : <FlipVertical className="mr-2 h-4 w-4" />}
                                <span>{multiPageLayout === 'vertical' ? 'Split Horizontally' : 'Split Vertically'}</span>
                            </DropdownMenuItem>
                        )}
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}