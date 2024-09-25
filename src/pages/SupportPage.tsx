import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const SUPPORT_URL = "https://github.com/itsreverence/war-monitor/issues";

export default function SupportPage() {
    const { webviewRef, setInitialUrl, setIsWebView } = useOutletContext<{ 
        webviewRef: React.RefObject<Electron.WebviewTag>,
        setInitialUrl: React.Dispatch<React.SetStateAction<string>>,
        setIsWebView: React.Dispatch<React.SetStateAction<boolean>>
    }>();

    useEffect(() => {
        setInitialUrl(SUPPORT_URL);
        setIsWebView(true);
    }, []);

    return (
        <div className="h-full w-full">
            <webview
                ref={webviewRef}
                src={SUPPORT_URL}
                style={{ width: "100%", height: "100%" }}
            ></webview>
        </div>
    );
}
