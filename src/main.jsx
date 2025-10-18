import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import "./styles/fonts.css";
import "./i18n/config";
import { LanguageProvider } from "./contexts/LanguageContext";
import AppThemeProvider from "./components/AppThemeProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </LanguageProvider>
  </StrictMode>,
);
