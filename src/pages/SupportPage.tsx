import React from "react";
import { useOutletContext } from "react-router-dom";

export default function SupportPage() {
    const { webviewRef } = useOutletContext<{ webviewRef: React.RefObject<Electron.WebviewTag> }>();

    return (
        <div className="h-full w-full">
            <webview
                ref={webviewRef}
                src="https://github.com/itsreverence/war-monitor/issues"
                style={{ width: "100%", height: "100%" }}
            ></webview>
        </div>
    );
}
