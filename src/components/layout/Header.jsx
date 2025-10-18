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
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import logo from "../../assets/default-logo.png";
import LanguageSwitcher from "../LanguageSwitcher";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const { t } = useTranslation();

    const navItems = [
        { label: t('nav.home'), path: "/" },
        { label: t('nav.about'), path: "/about" },
        { label: t('nav.services'), path: "/services" },
        { label: t('nav.gallery'), path: "/gallery" },
        { label: t('nav.blog'), path: "/blog" },
        { label: t('nav.careers'), path: "/resumeForm" },
        { label: t('nav.contact'), path: "/contact" },
    ];

    const handleDrawerToggle = () => {
        setMobileOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const drawer = (
        <Box sx={{ width: 280, p: 3, bgcolor: 'grey.100' }}>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.path} disablePadding>
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            selected={location.pathname === item.path}
                            onClick={handleDrawerToggle}
                            sx={{
                                borderRadius: 2,
                                mb: 1,
                                py: 1.5,
                                '&.Mui-selected': { bgcolor: 'primary.light', color: 'primary.contrastText' },
                                '&:hover': { bgcolor: 'primary.light' },
                            }}
                        >
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{
                                    fontWeight: 600,
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box sx={{ px: 2, mt: 2 }}>
                <LanguageSwitcher />
            </Box>
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
                        px: { xs: 2, md: 6 },
                    }}
                >
                    <Box sx={{ display: { xs: "block", md: "none" } }}>
                        <IconButton color="primary" onClick={handleDrawerToggle}>
                            <MenuIcon fontSize="large" />
                        </IconButton>
                    </Box>

                    <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center" }}>
                        <motion.img
                            src={logo}
                            alt="لوگوی موسسه حسابرسی بهمند"
                            animate={{ height: isScrolled ? 50 : 70 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            style={{ objectFit: "contain" }}
                        />
                    </Box>

                    <Box sx={{ display: { xs: "none", md: "flex" }, gap: { md: 2, lg: 3 }, alignItems: "center" }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.path}
                                component={Link}
                                to={item.path}
                                sx={{
                                    fontWeight: location.pathname === item.path ? 700 : 500,
                                    color: location.pathname === item.path ? "primary.main" : "text.primary",
                                    position: "relative",
                                    px: { md: 1.5, lg: 2 },
                                    py: 1,
                                    '&:after': {
                                        content: '""',
                                        position: "absolute",
                                        bottom: -6,
                                        left: 0,
                                        width: location.pathname === item.path ? "100%" : "0%",
                                        height: "3px",
                                        bgcolor: "primary.main",
                                        transition: "width 0.4s ease",
                                    },
                                    '&:hover:after': { width: "100%" },
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                        <LanguageSwitcher />
                    </Box>
                </Toolbar>
            </motion.div>

            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{ '& .MuiDrawer-paper': { width: { xs: '80%', sm: 280 } } }}
            >
                {drawer}
            </Drawer>
        </>
    );
}