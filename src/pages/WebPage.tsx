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
        const state = location.state as { openSheetByDefault?: boolean, category?: string } | null;
        if (state?.openSheetByDefault && state.category === category) {
            setIsSheetOpen(true);
        }
    }, [location, category]);

    useEffect(() => {
        setIsSheetOpen(openSheetByDefault);
    }, [openSheetByDefault]);

    const handleOptionClick = (url: string) => {
        setCurrentUrl(url);
        setIsSheetOpen(false);
    };

    return (
        <div className="flex h-full w-full flex-col">
            <div className="flex items-center justify-between bg-background p-2">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <MenuIcon className="h-4 w-4" />
                        </Button>
                    </SheetTrigger>
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
                <h1 className="text-xl font-semibold">{t(`nav.web.${category}`)}</h1>
                <div className="w-8"></div> {/* This empty div balances the layout */}
            </div>
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
