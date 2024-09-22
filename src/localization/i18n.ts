import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    fallbackLng: "en",
    resources: {
        en: {
            translation: {
                title: "Home Page",
                description: "This is an example of translation in en",
                nav: {
                    web: "Web",
                    settings: "Settings",
                    support: "Support"
                }
            },
        },
        "pt-BR": {
            translation: {
                title: "Página Inicial",
                description: "Este é um exemplo de tradução em pt_BR",
                nav: {
                    web: "Web",
                    settings: "Configurações",
                    support: "Suporte"
                }
            },
        },
    },
});
