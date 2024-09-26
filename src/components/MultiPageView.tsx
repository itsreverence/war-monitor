import React, { useState, useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Tab } from "@/types";

interface MultiPageViewProps {
    tabs: Tab[];
    onCloseTab: (tabId: string) => void;
    isAdBlockerEnabled: boolean;
    layoutDirection: 'horizontal' | 'vertical';
}

export function MultiPageView({ tabs, onCloseTab, isAdBlockerEnabled, layoutDirection }: MultiPageViewProps) {
    const [sizes, setSizes] = useState<number[]>([]);

    useEffect(() => {
        const newLayout = tabs.map(() => 100 / tabs.length);
        setSizes(newLayout);
    }, [tabs.length]);

    return (
        <ResizablePanelGroup direction={layoutDirection} onLayout={(newSizes) => setSizes(newSizes)}>
            {tabs.map((tab, index) => (
                <React.Fragment key={tab.id}>
                    <ResizablePanel defaultSize={sizes[index]} minSize={20}>
                        <div className="flex flex-col h-full">
                            <div className="flex justify-between items-center p-2 bg-secondary">
                                <span>{tab.title}</span>
                                <Button variant="ghost" size="sm" onClick={() => onCloseTab(tab.id)}>
                                    &times;
                                </Button>
                            </div>
                            <webview
                                src={tab.url}
                                style={{ width: "100%", height: "100%" }}
                                webpreferences={`contextIsolation=yes, nodeIntegration=no${isAdBlockerEnabled ? ", contentBlocking=true" : ""}`}
                            ></webview>
                        </div>
                    </ResizablePanel>
                    {index < tabs.length - 1 && <ResizableHandle />}
                </React.Fragment>
            ))}
        </ResizablePanelGroup>
    );
}