import { ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import { createAppTheme, cacheRtl, cacheLtr } from "../mui/theme";
import { useLanguage } from "../contexts/LanguageContext";
import { useMemo } from "react";

export default function AppThemeProvider({ children }) {
  const { direction } = useLanguage();
  
  const theme = useMemo(() => createAppTheme(direction), [direction]);
  const cache = direction === 'rtl' ? cacheRtl : cacheLtr;

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
