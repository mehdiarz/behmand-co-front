import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useTranslation } from 'react-i18next';

const Layout = () => {
    const { i18n } = useTranslation();
    const direction = i18n.language === 'fa' ? 'rtl' : 'ltr';

    return (
        <Box
            dir={direction}
            lang={i18n.language}
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                bgcolor: "background.default",
            }}
        >
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;