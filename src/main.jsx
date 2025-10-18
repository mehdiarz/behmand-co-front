import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import "./styles/fonts.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import { cacheRtl, cacheLtr } from "./mui/theme.js";
import { createAppTheme } from "./mui/theme.js";
import "./i18n";
import i18n from "i18next";
import { useEffect, useState } from "react";

function ThemeWrapper({ children }) {
    const [language, setLanguage] = useState(i18n.language);
    const [cache, setCache] = useState(i18n.language === 'fa' ? cacheRtl : cacheLtr);

    useEffect(() => {
        const handleLanguageChange = (lng) => {
            setLanguage(lng);
            setCache(lng === 'fa' ? cacheRtl : cacheLtr);

            // بروزرسانی جهت در HTML
            document.documentElement.setAttribute('dir', lng === 'fa' ? 'rtl' : 'ltr');
        };

        i18n.on('languageChanged', handleLanguageChange);
        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, []);

    const theme = createAppTheme(language);

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CacheProvider>
    );
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeWrapper>
            <App />
        </ThemeWrapper>
    </StrictMode>
);