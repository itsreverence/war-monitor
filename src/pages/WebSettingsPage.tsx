import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ToggleAdBlocker from "@/components/ToggleAdBlocker";
import { AddEditCustomSourceDialog, CustomSource } from "@/components/AddCustomSourceDialog";
import { useWebContext } from '@/contexts/WebContext';
import { Button } from "@/components/ui/button";

export default function WebSettingsPage() {
    const { t } = useTranslation();
    const { webOptions, updateWebOption, addWebOption } = useWebContext();
    const [editingSource, setEditingSource] = useState<CustomSource | undefined>(undefined);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const addCustomSource = (name: string, url: string, category: string) => {
        addWebOption(category, name, url);
    };

    const editCustomSource = (oldName: string, name: string, url: string, category: string) => {
        updateWebOption(category, oldName, name, url);
    };

    const handleEditSource = (source: CustomSource) => {
        setEditingSource(source);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{t("nav.settings.web")}</h1>
            <div className="space-y-4">
                <div>
                    <h2 className="text-lg font-semibold mb-2">{t("nav.settings.adBlocker")}</h2>
                    <ToggleAdBlocker />
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-2">{t("nav.settings.customSources")}</h2>
                    <AddEditCustomSourceDialog 
                        onAddSource={addCustomSource}
                        onEditSource={editCustomSource}
                        categories={['search', 'information', 'verification', 'translation', 'other']}
                    />
                    {Object.entries(webOptions).map(([category, sources]) => (
                        <div key={category} className="mt-4">
                            <h3 className="text-md font-semibold">{t(`nav.web.${category}`)}</h3>
                            {sources.map((source) => (
                                <div key={source.name} className="flex items-center justify-between mt-2">
                                    <span>{source.name}</span>
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => {
                                            setEditingSource({ ...source, category });
                                            setIsDialogOpen(true);
                                        }}
                                    >
                                        {t("nav.web.edit")}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            {editingSource && (
                <AddEditCustomSourceDialog 
                    onAddSource={addCustomSource}
                    onEditSource={editCustomSource}
                    categories={['search', 'information', 'verification', 'translation', 'other']}
                    editingSource={editingSource}
                    isOpen={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                />
            )}
        </div>
    );
}