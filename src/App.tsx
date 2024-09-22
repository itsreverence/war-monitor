import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HomeContent from "./components/HomeContent";
import SupportPage from "./pages/SupportPage";
import SettingsPage from "./pages/SettingsPage";
import BaseLayout from "./layouts/BaseLayout";
import { syncThemeWithLocal } from "./helpers/theme_helpers";
import { useTranslation } from "react-i18next";
import "./localization/i18n";
import { updateAppLanguage } from "./helpers/language_helpers";
import WebPage from "./pages/WebPage";

export default function App() {
    const { i18n } = useTranslation();

    useEffect(() => {
        syncThemeWithLocal();
        updateAppLanguage(i18n);
    }, []);

    return (
        <Router>
            <BaseLayout>
                <Routes>
                    <Route path="/" element={<HomePage />}>
                        <Route index element={<HomeContent />} />
                        <Route path="support" element={<SupportPage />} />
                        <Route path="settings" element={<SettingsPage />} />
                        <Route path="web/:category" element={<WebPage />} />
                    </Route>
                </Routes>
            </BaseLayout>
        </Router>
    );
}

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
