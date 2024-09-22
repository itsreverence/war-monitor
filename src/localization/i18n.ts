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
                    web: {
                        title: "Web",
                        description: "Explore our web-based tools and services",
                        search: "Search",
                        searchDescription: "Find information quickly and easily",
                        information: "Information",
                        informationDescription: "Access detailed data and resources",
                        verification: "Verification",
                        verificationDescription: "Validate and authenticate information",
                        translation: "Translation",
                        translationDescription: "Convert text between languages"
                    },
                    settings: {
                        title: "Settings",
                        language: "Language",
                        theme: "Theme"
                    },
                    support: "Support"
                }
            },
        },
        "pt-BR": {
            translation: {
                title: "Página Inicial",
                description: "Este é um exemplo de tradução em pt_BR",
                nav: {
                    web: {
                        title: "Web",
                        description: "Explore nossas ferramentas e serviços baseados na web",
                        search: "Pesquisar",
                        searchDescription: "Encontre informações de forma rápida e fácil",
                        information: "Informação",
                        informationDescription: "Acesse dados e recursos detalhados",
                        verification: "Verificação",
                        verificationDescription: "Valide e autentique informações",
                        translation: "Tradução",
                        translationDescription: "Converta texto entre idiomas"
                    },
                    settings: {
                        title: "Configurações",
                        language: "Idioma",
                        theme: "Tema"
                    },
                    support: "Suporte"
                }
            },
        },
    },
});
