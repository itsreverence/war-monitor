import React, { useState } from 'react';
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

interface AddCustomSourceDialogProps {
    onAddSource: (name: string, url: string, category: string) => void;
    categories: string[];
}

export function AddCustomSourceDialog({ onAddSource, categories }: AddCustomSourceDialogProps) {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState('other');
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

    const handleSubmit = () => {
        if (name && url) {
            onAddSource(name, url, category);
            setName('');
            setUrl('');
            setCategory('other');
            setIsOpen(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">{t("nav.web.addCustomSource")}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t("nav.web.addCustomSource")}</DialogTitle>
                    <DialogDescription>
                        {t("nav.web.addCustomSourceDescription")}
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
                    <Button onClick={handleSubmit}>{t("nav.web.addSource")}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}