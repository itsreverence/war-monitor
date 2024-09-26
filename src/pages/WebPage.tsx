import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { MenuIcon, ChevronDown, ChevronUp, Plus } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useParams, useLocation, useOutletContext } from "react-router-dom";
import { useAdBlocker } from "@/hooks/useAdBlocker";
import { Tab } from "@/types";
import { TabBar } from "@/components/TabBar";

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
    const [tabs, setTabs] = useState<Tab[]>([]);
    const [activeTabId, setActiveTabId] = useState<string | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const { isEnabled: isAdBlockerEnabled } = useAdBlocker();
    const { webviewRef, setIsWebView, isTabView } = useOutletContext<{ 
        webviewRef: React.RefObject<Electron.WebviewTag>,
        setIsWebView: React.Dispatch<React.SetStateAction<boolean>>,
        isTabView: boolean
    }>();
    const [initialUrl, setInitialUrl] = useState("");

    useEffect(() => {
        setIsSheetOpen(true);
        if (category) {
            setExpandedCategories([category]);
        }
    }, [category, location.state]);

    useEffect(() => {
        setIsSheetOpen(openSheetByDefault);
    }, [openSheetByDefault]);

    useEffect(() => {
        const webview = webviewRef.current;
        if (webview && activeTabId) {
            const handleFinishLoad = () => {
                updateTabTitle(activeTabId, webview.getTitle());
            };
            webview.addEventListener('did-finish-load', handleFinishLoad);
            return () => {
                webview.removeEventListener('did-finish-load', handleFinishLoad);
            };
        }
    }, [activeTabId, webviewRef]);

    const handleOptionClick = (url: string) => {
        addNewTab(url);
        setIsSheetOpen(false);
    };

    const toggleCategory = (cat: string) => {
        setExpandedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    const addNewTab = (url: string) => {
        const newTab: Tab = {
            id: Date.now().toString(),
            url: url,
            title: new URL(url).hostname,
        };
        setTabs(prevTabs => [...prevTabs, newTab]);
        setActiveTabId(newTab.id);
        setInitialUrl(url);
        setIsWebView(true);
    };

    const closeTab = (tabId: string) => {
        setTabs(prevTabs => prevTabs.filter(tab => tab.id !== tabId));
        if (activeTabId === tabId) {
            const remainingTabs = tabs.filter(tab => tab.id !== tabId);
            if (remainingTabs.length > 0) {
                setActiveTabId(remainingTabs[remainingTabs.length - 1].id);
            } else {
                setActiveTabId(null);
                setIsWebView(false);
            }
        }
    };

    const switchTab = (tabId: string) => {
        setActiveTabId(tabId);
        const tab = tabs.find(t => t.id === tabId);
        if (tab) {
            setInitialUrl(tab.url);
        }
    };

    const updateTabTitle = (tabId: string, newTitle: string) => {
        setTabs(prevTabs => prevTabs.map(tab => 
            tab.id === tabId ? { ...tab, title: newTitle } : tab
        ));
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
            {isTabView && (
                <TabBar
                    tabs={tabs}
                    activeTabId={activeTabId}
                    onTabClose={closeTab}
                    onTabSwitch={switchTab}
                    onNewTab={() => addNewTab("about:blank")}
                />
            )}
            <div className="flex-grow">
                {isTabView ? (
                    activeTabId ? (
                        <webview
                            ref={webviewRef}
                            src={tabs.find(t => t.id === activeTabId)?.url || ""}
                            style={{ width: "100%", height: "100%" }}
                            webpreferences={`contextIsolation=yes, nodeIntegration=no${isAdBlockerEnabled ? ", contentBlocking=true" : ""}`}
                        ></webview>
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            {t("nav.web.selectOption")}
                        </div>
                    )
                ) : (
                    <webview
                        ref={webviewRef}
                        src={initialUrl}
                        style={{ width: "100%", height: "100%" }}
                        webpreferences={`contextIsolation=yes, nodeIntegration=no${isAdBlockerEnabled ? ", contentBlocking=true" : ""}`}
                    ></webview>
                )}
            </div>
        </div>
    );
}
