import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useParams, useLocation } from "react-router-dom";

const webOptions = {
    search: [
        { name: "Google", url: "https://www.google.com" },
        { name: "Bing", url: "https://www.bing.com" },
    ],
    information: [
        { name: "Wikipedia", url: "https://www.wikipedia.org" },
        { name: "Britannica", url: "https://www.britannica.com" },
    ],
    verification: [
        { name: "Snopes", url: "https://www.snopes.com" },
        { name: "FactCheck.org", url: "https://www.factcheck.org" },
    ],
    translation: [
        { name: "Google Translate", url: "https://translate.google.com" },
        { name: "DeepL", url: "https://www.deepl.com/translator" },
    ],
};

export default function WebPage({ openSheetByDefault = false }: { openSheetByDefault?: boolean }) {
    const { t } = useTranslation();
    const { category } = useParams<{ category: string }>();
    const location = useLocation();
    const [currentUrl, setCurrentUrl] = useState("");
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const options = webOptions[category as keyof typeof webOptions] || [];

    useEffect(() => {
        setIsSheetOpen(true);
    }, [category, location.state]);

    useEffect(() => {
        setIsSheetOpen(openSheetByDefault);
    }, [openSheetByDefault]);

    const handleOptionClick = (url: string) => {
        setCurrentUrl(url);
        setIsSheetOpen(false);
    };

    return (
        <div className="flex h-full w-full flex-col">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle>{t(`nav.web.${category}`)}</SheetTitle>
                        <SheetDescription>
                            {t(`nav.web.${category}Description`)}
                        </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-4 py-4">
                        {options.map((option) => (
                            <Button
                                key={option.name}
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => handleOptionClick(option.url)}
                            >
                                {option.name}
                            </Button>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
            <div className="flex-grow">
                {currentUrl ? (
                    <webview src={currentUrl} style={{ width: "100%", height: "100%" }}></webview>
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        {t("nav.web.selectOption")}
                    </div>
                )}
            </div>
        </div>
    );
}
