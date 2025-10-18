import React from 'react';
import { Button, Box } from '@mui/material';
import { Language } from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  const handleLanguageToggle = () => {
    const newLang = language === 'fa' ? 'en' : 'fa';
    changeLanguage(newLang);
  };

  return (
    <Button
      onClick={handleLanguageToggle}
      startIcon={<Language />}
      sx={{
        fontWeight: 600,
        color: 'text.primary',
        px: 2,
        py: 1,
        minWidth: 100,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          bgcolor: 'primary.light',
          color: 'white',
          borderColor: 'primary.main',
        },
        transition: 'all 0.3s ease',
      }}
    >
      {language === 'fa' ? 'EN' : 'FA'}
    </Button>
  );
}
