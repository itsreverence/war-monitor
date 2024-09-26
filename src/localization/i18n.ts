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
                        translationDescription: "Convert text between languages",
                        selectOption: "Select an option",
                        controls: "Controls",
                        fullscreen: "Fullscreen",
                        reload: "Reload",
                        back: "Back",
                        forward: "Forward",
                        home: "Home",
                        exitFullscreen: "Exit Fullscreen",
                        custom: "Custom Sources",
                        addCustomSource: "Add Custom Source",
                        addCustomSourceDescription: "Add a new custom web source",
                        sourceName: "Source Name",
                        sourceUrl: "Source URL",
                        addSource: "Add Source",
                        other: "Other",
                        selectCategory: "Select Category",
                    },
                    settings: {
                        title: "Settings",
                        language: "Language",
                        theme: "Theme",
                        adBlocker: "Ad Blocker",
                        adBlockerOn: "Ad Blocker is On",
                        adBlockerOff: "Ad Blocker is Off",
                        general: "General",
                        generalDescription: "Manage general application settings",
                        web: "Web",
                        webDescription: "Configure web-related settings",
                    },
                    support: "Support",
                },
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
                        translationDescription: "Converta texto entre idiomas",
                        selectOption: "Selecione uma opção",
                        controls: "Controles",
                        fullscreen: "Tela Cheia",
                        reload: "Recarregar",
                        back: "Voltar",
                        forward: "Avançar",
                        home: "Início",
                        exitFullscreen: "Sair da Tela Cheia",
                        custom: "Fontes Personalizadas",
                        addCustomSource: "Adicionar Fonte Personalizada",
                        addCustomSourceDescription: "Adicione uma nova fonte web personalizada",
                        sourceName: "Nome da Fonte",
                        sourceUrl: "URL da Fonte",
                        addSource: "Adicionar Fonte",
                        other: "Outros",
                        selectCategory: "Selecione a Categoria",
                    },
                    settings: {
                        title: "Configurações",
                        language: "Idioma",
                        theme: "Tema",
                        adBlocker: "Bloqueador de Anúncios",
                        adBlockerOn: "Bloqueador de Anúncios está Ligado",
                        adBlockerOff: "Bloqueador de Anúncios está Desligado",
                        general: "General",
                        generalDescription: "Manage general application settings",
                        web: "Web",
                        webDescription: "Configure web-related settings",
                    },
                    support: "Suporte",
                },
            },
        },
    },
});
