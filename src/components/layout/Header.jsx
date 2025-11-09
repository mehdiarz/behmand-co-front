import React, { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TranslateIcon from "@mui/icons-material/Translate";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/default-logo.png";
import { useTranslation } from "react-i18next";

// Base navigation items without blog
const baseNavItems = [
    { key: "nav.home", path: "/" },
    { key: "nav.about", path: "/about" },
    { key: "nav.services", path: "/services" },
    { key: "nav.gallery", path: "/gallery" },
    { key: "nav.careers", path: "/resumeForm" },
    { key: "nav.contact", path: "/contact" },
    {
        key: "nav.timesheet",
        path: "https://behmand.ssdayofficial.com:10551/Page_Main_Login",
        external: true,
    },
];

// Navigation items with blog only for Persian
const getNavItems = (language) => {
    if (language === "fa") {
        // Insert blog at the correct position for Persian
        return [
            { key: "nav.home", path: "/" },
            { key: "nav.about", path: "/about" },
            { key: "nav.services", path: "/services" },
            { key: "nav.portfolio", path: "/portfolio" },
            { key: "nav.gallery", path: "/gallery" },
            { key: "nav.blog", path: "/blog" }, // Blog only in Persian
            { key: "nav.careers", path: "/resumeForm" },
            { key: "nav.contact", path: "/contact" },
            {
                key: "nav.timesheet",
                path: "https://behmand.ssdayofficial.com:10551/Page_Main_Login",
                external: true,
            },
        ];
    }
    return baseNavItems; // No blog in English
};

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const { t, i18n } = useTranslation();

    // Get navigation items based on current language
    const navItems = getNavItems(i18n.language);

    const handleDrawerToggle = () => {
        setMobileOpen((prev) => !prev);
    };

    // Handle external link clicks
    const handleExternalLink = (url) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const drawer = (
        <Box
            sx={{ width: 280, p: 3, bgcolor: "grey.100" }}
            onClick={handleDrawerToggle}
        >
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.path} disablePadding>
                        <ListItemButton
                            component={item.external ? "a" : Link}
                            {...(item.external
                                ? {
                                    href: item.path,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                }
                                : { to: item.path })}
                            selected={!item.external && location.pathname === item.path}
                            sx={{
                                borderRadius: 2,
                                mb: 1,
                                py: 1.5,
                                "&.Mui-selected": {
                                    bgcolor: "primary.light",
                                    color: "primary.contrastText",
                                },
                                "&:hover": { bgcolor: "primary.light" },
                            }}
                        >
                            <ListItemText
                                primary={t(item.key)}
                                primaryTypographyProps={{
                                    fontWeight: 600,
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() =>
                            i18n.changeLanguage(i18n.language === "fa" ? "en" : "fa")
                        }
                    >
                        <TranslateIcon sx={{ mr: 1 }} />
                        <ListItemText
                            primary={i18n.language === "fa" ? "English" : "فارسی"}
                            primaryTypographyProps={{ fontWeight: 600 }}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <motion.div
                animate={{
                    height: isScrolled ? 64 : 80,
                    boxShadow: isScrolled ? "0 4px 20px rgba(0,0,0,0.15)" : "none",
                    backgroundColor: isScrolled ? "rgba(255,255,255,0.95)" : "#fff",
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1200,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Toolbar
                    sx={{
                        justifyContent: "space-between",
                        width: "100%",
                        px: { xs: 2, md: 3, lg: 6 }, // کاهش padding در md
                    }}
                >
                    <Box sx={{ display: { xs: "block", md: "none" } }}>
                        <IconButton color="primary" onClick={handleDrawerToggle}>
                            <MenuIcon fontSize="large" />
                        </IconButton>
                    </Box>

                    <Box
                        component={Link}
                        to="/"
                        sx={{ display: "flex", alignItems: "center" }}
                    >
                        <motion.img
                            src={logo}
                            alt={t("header.logoAlt")}
                            animate={{
                                height: isScrolled ? 50 : 70,
                                width: isScrolled ? 120 : 140
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            style={{ objectFit: "contain" }}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            gap: { md: 1.5, lg: 4 }, // کاهش gap در md
                            alignItems: "center",
                            flexWrap: 'wrap', // اجازه می‌دهد آیتم‌ها در دو خط قرار گیرند
                            maxWidth: { md: '500px', lg: 'none' }, // محدودیت عرض در md
                            justifyContent: 'flex-end',
                        }}
                    >
                        {navItems.map((item) =>
                            item.external ? (
                                <Button
                                    key={item.path}
                                    component="a"
                                    href={item.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        fontWeight: 500,
                                        color: "text.primary",
                                        position: "relative",
                                        px: { md: 1, lg: 2.5 }, // کاهش padding افقی در md
                                        py: { md: 0.5, lg: 1 }, // کاهش padding عمودی در md
                                        fontSize: { md: '0.75rem', lg: '0.875rem' }, // کاهش سایز فونت در md
                                        minWidth: 'auto', // حذف حداقل عرض
                                        whiteSpace: 'nowrap', // جلوگیری از شکستن خط
                                        "&:after": {
                                            content: '""',
                                            position: "absolute",
                                            bottom: -4,
                                            left: 0,
                                            width: "0%",
                                            height: "2px",
                                            bgcolor: "primary.main",
                                            transition: "width 0.4s ease",
                                        },
                                        "&:hover:after": { width: "100%" },
                                    }}
                                >
                                    {t(item.key)}
                                </Button>
                            ) : (
                                <Button
                                    key={item.path}
                                    component={Link}
                                    to={item.path}
                                    sx={{
                                        fontWeight: location.pathname === item.path ? 700 : 500,
                                        color:
                                            location.pathname === item.path
                                                ? "primary.main"
                                                : "text.primary",
                                        position: "relative",
                                        px: { md: 1, lg: 2.5 }, // کاهش padding افقی در md
                                        py: { md: 0.5, lg: 1 }, // کاهش padding عمودی در md
                                        fontSize: { md: '0.75rem', lg: '0.875rem' }, // کاهش سایز فونت در md
                                        minWidth: 'auto', // حذف حداقل عرض
                                        whiteSpace: 'nowrap', // جلوگیری از شکستن خط
                                        "&:after": {
                                            content: '""',
                                            position: "absolute",
                                            bottom: -4,
                                            left: 0,
                                            width: location.pathname === item.path ? "100%" : "0%",
                                            height: "2px",
                                            bgcolor: "primary.main",
                                            transition: "width 0.4s ease",
                                        },
                                        "&:hover:after": { width: "100%" },
                                    }}
                                >
                                    {t(item.key)}
                                </Button>
                            ),
                        )}
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() =>
                                i18n.changeLanguage(i18n.language === "fa" ? "en" : "fa")
                            }
                            startIcon={<TranslateIcon />}
                            sx={{
                                ml: { md: 1, lg: 2 },
                                borderRadius: 2,
                                px: { md: 1, lg: 2 },
                                py: { md: 0.5, lg: 1 },
                                fontSize: { md: '0.75rem', lg: '0.875rem' },
                                minWidth: 'auto',
                                '& .MuiButton-startIcon': {
                                    marginRight: { md: 0.5, lg: 1 },
                                    '& svg': {
                                        fontSize: { md: '1rem', lg: '1.25rem' }
                                    }
                                }
                            }}
                        >
                            {i18n.language === "fa" ? "English" : "فارسی"}
                        </Button>
                    </Box>
                </Toolbar>
            </motion.div>

            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{ "& .MuiDrawer-paper": { width: { xs: "80%", sm: 280 } } }}
            >
                {drawer}
            </Drawer>
        </>
    );
}