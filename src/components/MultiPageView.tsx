import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Tab } from "@/types";

interface MultiPageViewProps {
    tabs: Tab[];
    onAddTab: () => void;
    onCloseTab: (tabId: string) => void;
    isAdBlockerEnabled: boolean;
}

export function MultiPageView({ tabs, onAddTab, onCloseTab, isAdBlockerEnabled }: MultiPageViewProps) {
    const [layout, setLayout] = useState([50, 50]);

    return (
        <ResizablePanelGroup direction="horizontal" onLayout={(sizes) => setLayout(sizes)}>
            {tabs.map((tab, index) => (
                <React.Fragment key={tab.id}>
                    <ResizablePanel defaultSize={layout[index]}>
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
            {tabs.length < 4 && (
                <ResizablePanel defaultSize={layout[tabs.length]}>
                    <div className="flex items-center justify-center h-full">
                        <Button onClick={onAddTab}>
                            <Plus className="mr-2 h-4 w-4" /> Add Page
                        </Button>
                    </div>
                </ResizablePanel>
            )}
        </ResizablePanelGroup>
    );
}