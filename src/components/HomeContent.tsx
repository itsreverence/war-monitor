// src/components/HomeContent.tsx
import React from "react";
import { useTranslation } from "react-i18next";

export default function HomeContent() {
    const { t } = useTranslation();

    return (
        <>
            <h1 className="mb-4 text-2xl font-bold">{t("title")}</h1>
            <p>{t("description")}</p>
        </>
    );
}
