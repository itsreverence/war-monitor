import React from "react";
import DragWindowRegion from "@/components/DragWindowRegion";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col overflow-hidden">
            <DragWindowRegion title="electron-shadcn" />
            {children}
        </div>
    );
}
