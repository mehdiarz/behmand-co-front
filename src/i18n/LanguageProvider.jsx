import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './i18n';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import { cacheLtr, cacheRtl, createAppTheme } from '../mui/theme';

function InnerProviders({ children }) {
  const { i18n: i18next } = useTranslation();
  const currentLanguage = i18next.language || 'fa';
  const direction = currentLanguage === 'fa' ? 'rtl' : 'ltr';

  const theme = useMemo(() => createAppTheme(direction), [direction]);
  const emotionCache = direction === 'rtl' ? cacheRtl : cacheLtr;

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('lang', currentLanguage);
    html.setAttribute('dir', direction);
  }, [currentLanguage, direction]);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}

export default function LanguageProvider({ children }) {
  const [, setReady] = useState(false);

  // Ensure i18n is initialized once
  useEffect(() => {
    // Force re-render after init completes
    setReady(true);
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <InnerProviders>{children}</InnerProviders>
    </I18nextProvider>
  );
}

export function useLanguage() {
  const { i18n: i18next } = useTranslation();
  const currentLanguage = i18next.language || 'fa';
  const switchLanguage = useCallback(
    (lng) => {
      if (!lng) lng = currentLanguage === 'fa' ? 'en' : 'fa';
      i18next.changeLanguage(lng);
      localStorage.setItem('i18nextLng', lng);
    },
    [i18next, currentLanguage]
  );
  return { lang: currentLanguage, dir: currentLanguage === 'fa' ? 'rtl' : 'ltr', switchLanguage };
}
