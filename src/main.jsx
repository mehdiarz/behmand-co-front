import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import "./styles/fonts.css";
import defaultTheme, { cacheRtl, cacheLtr, createAppTheme } from "./mui/theme.js";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import "./i18n";
import i18n from "i18next";
import { useEffect, useMemo, useState } from "react";

function Providers({ children }) {
  const [lng, setLng] = useState(i18n.language || "fa");

  useEffect(() => {
    const handler = (l) => setLng(l);
    i18n.on("languageChanged", handler);
    return () => i18n.off("languageChanged", handler);
  }, []);

  const direction = i18n.dir(lng);
  const theme = useMemo(() => createAppTheme(direction), [direction]);
  const cache = direction === "rtl" ? cacheRtl : cacheLtr;

  return (
    <CacheProvider key={direction} value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);
