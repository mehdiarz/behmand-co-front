import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import "./styles/fonts.css";
import theme, { cacheRtl } from "./mui/theme.js";
import { ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import "./i18n";
import { LanguageProvider } from "./contexts/LanguageContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </CacheProvider>
  </StrictMode>,
);
