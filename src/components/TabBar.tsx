// src/components/TabBar.tsx
import React from "react";
import { Tab } from "@/types";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

interface TabBarProps {
    tabs: Tab[];
    activeTabId: string | null;
    onTabClose: (tabId: string) => void;
    onTabSwitch: (tabId: string) => void;
    onNewTab: () => void;
}

export function TabBar({ tabs, activeTabId, onTabClose, onTabSwitch, onNewTab }: TabBarProps) {
    return (
        <div className="flex items-center bg-background border-b">
            {tabs.map((tab) => (
                <div
                    key={tab.id}
                    className={`flex items-center px-4 py-2 cursor-pointer ${
                        activeTabId === tab.id ? "bg-secondary" : ""
                    }`}
                    onClick={() => onTabSwitch(tab.id)}
                >
                    <span className="mr-2 truncate max-w-xs">{tab.title}</span>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            onTabClose(tab.id);
                        }}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ))}
            <Button variant="ghost" size="sm" onClick={onNewTab}>
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    );
}