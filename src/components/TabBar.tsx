// src/components/TabBar.tsx
import React from 'react';
import { Tab } from '@/types';
import { Button } from '@/components/ui/button';
import { useWebContext } from '@/contexts/WebContext';

interface TabBarProps {
    tabs: Tab[];
    activeTabId: string | null;
    onTabClose: (tabId: string) => void;
    onTabSwitch: (tabId: string) => void;
    onNewTab: () => void;
}

export function TabBar({ tabs, activeTabId, onTabClose, onTabSwitch, onNewTab }: TabBarProps) {
    const { webOptions } = useWebContext();

    const getTabName = (tab: Tab) => {
        for (const [category, options] of Object.entries(webOptions)) {
            const option = options.find(opt => opt.url === tab.url);
            if (option) {
                return option.name;
            }
        }
        return tab.title;
    };

    return (
        <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
                <Button
                    key={tab.id}
                    variant={tab.id === activeTabId ? "default" : "ghost"}
                    className="px-3 py-1 text-sm"
                    onClick={() => onTabSwitch(tab.id)}
                >
                    {getTabName(tab)}
                    <span
                        className="ml-2 text-xs"
                        onClick={(e) => {
                            e.stopPropagation();
                            onTabClose(tab.id);
                        }}
                    >
                        &times;
                    </span>
                </Button>
            ))}
            <Button variant="ghost" className="px-3 py-1 text-sm" onClick={onNewTab}>
                +
            </Button>
        </div>
    );
}