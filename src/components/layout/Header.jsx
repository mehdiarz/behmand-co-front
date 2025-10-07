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
import logo from "../../assets/default-logo.png";

const navItems = [
  { label: "خانه", path: "/" },
  { label: "درباره ما", path: "/about" },
  { label: "خدمات", path: "/services" },
  { label: "مقالات", path: "/blog" },
  { label: "فرصت‌های شغلی", path: "/resumeForm" },
  { label: "تماس با ما", path: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  // ✅ تشخیص اسکرول
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const drawer = (
    <Box sx={{ width: 250, p: 2 }} onClick={handleDrawerToggle}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 700 : 500,
                  color:
                    location.pathname === item.path
                      ? "primary"
                      : "text.primary",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <motion.div
        animate={{
          height: isScrolled ? 52 : 65, // 👈 ارتفاع متغیر با اسکرول
          boxShadow: isScrolled
            ? "0 2px 10px rgba(0,0,0,0.1)"
            : "0 1px 3px rgba(0,0,0,0.05)",
          backgroundColor: "#fff",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: "unset", // برای جلوگیری از ارتفاع پیش‌فرض MUI
            width: "100%",
            px: { xs: 2, md: 5 },
          }}
        >
          {/* موبایل */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* لوگو با انیمیشن */}
          <Box
            component={Link}
            to="/"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <motion.img
              key={location.pathname}
              src={logo}
              alt="لوگوی موسسه حسابرسی بهمند"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                height: isScrolled ? "40px" : "55px", // 👈 کوچکتر شدن لوگو
                objectFit: "contain",
                transition: "height 0.3s ease",
              }}
            />
          </Box>

          {/* دسکتاپ */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {navItems.map((item) => (
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
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: location.pathname === item.path ? "100%" : "0%",
                    height: "2px",
                    bgcolor: "primary.main",
                    transition: "width 0.3s",
                  },
                  "&:hover:after": { width: "100%" },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </motion.div>

      {/* Drawer موبایل */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
