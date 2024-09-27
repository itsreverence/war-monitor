import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ToggleAdBlocker from "@/components/ToggleAdBlocker";
import { AddEditCustomSourceDialog, CustomSource } from "@/components/AddCustomSourceDialog";
import { useWebContext } from '@/contexts/WebContext';
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ManageCustomSourcesDialog } from "@/components/ManageCustomSourcesDialog";

export default function WebSettingsPage() {
    const { t } = useTranslation();
    const { webOptions, updateWebOption, addWebOption } = useWebContext() as { webOptions: Record<string, CustomSource[]>, updateWebOption: any, addWebOption: any };

    const addCustomSource = (name: string, url: string, category: string) => {
        addWebOption(category, name, url);
    };

    const editCustomSource = (oldName: string, name: string, url: string, category: string) => {
        updateWebOption(category, oldName, name, url);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4">
                <h1 className="text-2xl font-bold mb-4">{t("nav.settings.web")}</h1>
                <div className="space-y-8">
                    <div>
                        <h2 className="text-lg font-semibold mb-2">{t("nav.settings.adBlocker")}</h2>
                        <ToggleAdBlocker />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2">{t("nav.settings.customSources")}</h2>
                        <ManageCustomSourcesDialog 
                            webOptions={webOptions}
                            onAddSource={addCustomSource}
                            onEditSource={editCustomSource}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}