import React from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "@/components/ui/switch";
import { useAdBlocker } from "@/hooks/useAdBlocker";

export default function ToggleAdBlocker() {
    const { t } = useTranslation();
    const { isEnabled, toggleAdBlocker } = useAdBlocker();

    return (
        <div className="flex items-center space-x-2">
            <Switch
                id="ad-blocker"
                checked={isEnabled}
                onCheckedChange={toggleAdBlocker}
            />
            <label htmlFor="ad-blocker">
                {isEnabled ? t("nav.settings.adBlockerOn") : t("nav.settings.adBlockerOff")}
            </label>
        </div>
    );
}