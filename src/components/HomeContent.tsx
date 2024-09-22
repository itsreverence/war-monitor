// src/components/HomeContent.tsx
import React from "react";
import { useTranslation } from "react-i18next";

export default function HomeContent() {
    const { t } = useTranslation();

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
            <p>{t('description')}</p>
        </>
    );
}