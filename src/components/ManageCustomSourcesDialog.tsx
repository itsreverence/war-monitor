import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { AddEditCustomSourceDialog, CustomSource } from "@/components/AddCustomSourceDialog";

interface ManageCustomSourcesDialogProps {
    webOptions: Record<string, CustomSource[]>;
    onEditSource: (oldName: string, name: string, url: string, category: string) => void;
    onAddSource: (name: string, url: string, category: string) => void;
}

export function ManageCustomSourcesDialog({ webOptions, onEditSource, onAddSource }: ManageCustomSourcesDialogProps) {
    const { t } = useTranslation();
    const [editingSource, setEditingSource] = useState<CustomSource | undefined>(undefined);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">{t("nav.settings.manageCustomSources")}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t("nav.settings.manageCustomSources")}</DialogTitle>
                    <DialogDescription>{t("nav.settings.manageCustomSourcesDescription")}</DialogDescription>
                </DialogHeader>
                <AddEditCustomSourceDialog 
                    onAddSource={onAddSource}
                    onEditSource={onEditSource}
                    categories={Object.keys(webOptions)}
                />
                <Accordion type="single" collapsible className="mt-4">
                    {Object.entries(webOptions).map(([category, sources]) => (
                        <AccordionItem key={category} value={category}>
                            <AccordionTrigger>{t(`nav.web.${category}`)}</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-2">
                                    {sources.map((source) => (
                                        <div key={source.name} className="flex items-center justify-between bg-background rounded p-2">
                                            <span>{source.name}</span>
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => {
                                                    setEditingSource({ ...source, category });
                                                    setIsEditDialogOpen(true);
                                                }}
                                            >
                                                {t("nav.web.edit")}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </DialogContent>
            {editingSource && (
                <AddEditCustomSourceDialog 
                    onAddSource={onAddSource}
                    onEditSource={onEditSource}
                    categories={Object.keys(webOptions)}
                    editingSource={editingSource}
                    isOpen={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                />
            )}
        </Dialog>
    );
}