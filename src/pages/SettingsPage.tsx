import React from 'react';
import { useTranslation } from "react-i18next";
import LangToggle from "@/components/LangToggle";
import ToggleTheme from "@/components/ToggleTheme";

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t('nav.settings.title')}</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">{t('nav.settings.language')}</h2>
          <LangToggle />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">{t('nav.settings.theme')}</h2>
          <ToggleTheme />
        </div>
      </div>
    </div>
  );
}