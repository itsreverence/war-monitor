import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";

export interface CustomSource {
    name: string;
    url: string;
    category: string;
}

interface AddEditCustomSourceDialogProps {
    onAddSource: (name: string, url: string, category: string) => void;
    onEditSource: (oldName: string, name: string, url: string, category: string) => void;
    categories: string[];
    editingSource?: CustomSource;
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
}

export function AddEditCustomSourceDialog({ 
    onAddSource, 
    onEditSource, 
    categories, 
    editingSource,
    isOpen,
    onOpenChange
}: AddEditCustomSourceDialogProps) {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState('other');
    const { t } = useTranslation();

    useEffect(() => {
        if (editingSource) {
            setName(editingSource.name);
            setUrl(editingSource.url);
            setCategory(editingSource.category);
        } else {
            setName('');
            setUrl('');
            setCategory('other');
        }
    }, [editingSource]);

    const handleSubmit = () => {
        if (name && url) {
            if (editingSource) {
                onEditSource(editingSource.name, name, url, category);
            } else {
                onAddSource(name, url, category);
            }
            if (onOpenChange) onOpenChange(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            {!editingSource && (
                <DialogTrigger asChild>
                    <Button variant="outline">
                        {t("nav.web.addCustomSource")}
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {editingSource ? t("nav.web.editCustomSource") : t("nav.web.addCustomSource")}
                    </DialogTitle>
                    <DialogDescription>
                        {editingSource ? t("nav.web.editCustomSourceDescription") : t("nav.web.addCustomSourceDescription")}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Input
                        placeholder={t("nav.web.sourceName")}
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    />
                    <Input
                        placeholder={t("nav.web.sourceUrl")}
                        value={url}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                    />
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                            <SelectValue placeholder={t("nav.web.selectCategory")} />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                    {t(`nav.web.${cat}`)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>
                        {editingSource ? t("nav.web.saveChanges") : t("nav.web.addSource")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}