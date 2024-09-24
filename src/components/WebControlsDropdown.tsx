import React from "react";
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
    isFullscreen: boolean;
}

export function WebControlsDropdown({
    onFullscreen,
    onReload,
    onBack,
    onForward,
    onHome,
    isFullscreen
}: WebControlsDropdownProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{t("nav.web.controls")}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
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
                <DropdownMenuItem onClick={onHome}>
                    <Home className="mr-2 h-4 w-4" />
                    <span>{t("nav.web.home")}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}