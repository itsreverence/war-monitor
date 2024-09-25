import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { MenuIcon, ChevronDown, ChevronUp } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useParams, useLocation, useOutletContext } from "react-router-dom";
import { useAdBlocker } from "@/hooks/useAdBlocker";

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
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const { isEnabled: isAdBlockerEnabled } = useAdBlocker();
    const { webviewRef } = useOutletContext<{ webviewRef: React.RefObject<Electron.WebviewTag> }>();

    useEffect(() => {
        setIsSheetOpen(true);
        if (category) {
            setExpandedCategories([category]);
        }
    }, [category, location.state]);

    useEffect(() => {
        setIsSheetOpen(openSheetByDefault);
    }, [openSheetByDefault]);

    const handleOptionClick = (url: string) => {
        setCurrentUrl(url);
        setIsSheetOpen(false);
    };

    const toggleCategory = (cat: string) => {
        setExpandedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    return (
        <div className="flex h-full w-full flex-col">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle>{t("nav.web.title")}</SheetTitle>
                        <SheetDescription>
                            {t("nav.web.description")}
                        </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-4 py-4">
                        {Object.entries(webOptions).map(([cat, options]) => (
                            <div key={cat} className="space-y-2">
                                <Button
                                    variant="outline"
                                    className="w-full justify-between"
                                    onClick={() => toggleCategory(cat)}
                                >
                                    {t(`nav.web.${cat}`)}
                                    {expandedCategories.includes(cat) ? (
                                        <ChevronUp className="h-4 w-4" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4" />
                                    )}
                                </Button>
                                {expandedCategories.includes(cat) && (
                                    <div className="pl-4 space-y-2">
                                        {options.map((option) => (
                                            <Button
                                                key={option.name}
                                                variant="ghost"
                                                className="w-full justify-start"
                                                onClick={() => handleOptionClick(option.url)}
                                            >
                                                {option.name}
                                            </Button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
            <div className="flex-grow">
                {currentUrl ? (
                    <webview
                        ref={webviewRef}
                        src={currentUrl}
                        style={{ width: "100%", height: "100%" }}
                        webpreferences={`contextIsolation=yes, nodeIntegration=no${isAdBlockerEnabled ? ", contentBlocking=true" : ""}`}
                    ></webview>
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        {t("nav.web.selectOption")}
                    </div>
                )}
            </div>
        </div>
    );
}
