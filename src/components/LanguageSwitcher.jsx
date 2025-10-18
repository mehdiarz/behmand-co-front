import React from 'react';
import {
    FormControl,
    Select,
    MenuItem,
    Box,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = ({ variant = 'desktop' }) => {
    const { i18n } = useTranslation();

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        i18n.changeLanguage(selectedLanguage);
    };

    const isDesktop = variant === 'desktop';

    return (
        <FormControl size="small" sx={{ minWidth: isDesktop ? 80 : '100%' }}>
            <Select
                value={i18n.language}
                onChange={handleLanguageChange}
                displayEmpty
                startAdornment={<LanguageIcon sx={{ mr: 1, fontSize: 20 }} />}
                sx={{
                    '& .MuiSelect-select': {
                        display: 'flex',
                        alignItems: 'center',
                        py: isDesktop ? 0.5 : 1,
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: isDesktop ? 'none' : '1px solid #e0e0e0',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: '1px solid',
                        borderColor: 'primary.main',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: '1px solid',
                        borderColor: 'primary.main',
                    },
                }}
            >
                <MenuItem value="fa">{isDesktop ? 'فا' : 'فارسی'}</MenuItem>
                <MenuItem value="en">{isDesktop ? 'En' : 'English'}</MenuItem>
            </Select>
        </FormControl>
    );
};

export default LanguageSwitcher;