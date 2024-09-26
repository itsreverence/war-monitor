import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, useParams, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HomeContent from "./components/HomeContent";
import SupportPage from "./pages/SupportPage";
import GeneralSettingsPage from "./pages/GeneralSettingsPage";
import WebSettingsPage from "./pages/WebSettingsPage";
import BaseLayout from "./layouts/BaseLayout";
import { syncThemeWithLocal } from "./helpers/theme_helpers";
import { useTranslation } from "react-i18next";
import "./localization/i18n";
import { updateAppLanguage } from "./helpers/language_helpers";
import WebPage from "./pages/WebPage";
import { WebProvider } from '@/contexts/WebContext';

export default function App() {
    const { i18n } = useTranslation();

    useEffect(() => {
        syncThemeWithLocal();
        updateAppLanguage(i18n);
    }, []);

    return (
        <Router>
            <BaseLayout>
                <WebProvider>
                    <Routes>
                        <Route path="/" element={<HomePage />}>
                            <Route index element={<HomeContent />} />
                            <Route path="support" element={<SupportPage />} />
                            <Route path="settings/general" element={<GeneralSettingsPage />} />
                            <Route path="settings/web" element={<WebSettingsPage />} />
                            <Route
                                path="web/:category"
                                element={
                                    <WebPageWrapper />
                                }
                            />
                        </Route>
                    </Routes>
                </WebProvider>
            </BaseLayout>
        </Router>
    );
}

function WebPageWrapper() {
    const location = useLocation();
    const state = location.state as { openSheetByDefault?: boolean } | null;
    const openSheetByDefault = state?.openSheetByDefault || false;
    return (
        <WebProvider>
            <WebPage openSheetByDefault={openSheetByDefault} />
        </WebProvider>
    );
}

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
