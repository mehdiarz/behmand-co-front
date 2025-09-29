import React, { useState } from "react";
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
import logo from "../../assets/default-logo.png";

const navItems = [
  { label: "خانه", path: "/" },
  { label: "درباره ما", path: "/about" },
  { label: "خدمات", path: "/services" },
  { label: "مقالات", path: "/blog" }, // 👈 اضافه شد
  { label: "فرصت‌های شغلی", path: "/resumeForm" },
  { label: "تماس با ما", path: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

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
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          bgcolor: "#fff",
          color: "text.primary",
          borderBottom: "1px solid #eee",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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

          {/* لوگو */}
          <Box
            component={Link}
            to="/"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <img
              src={logo}
              alt="لوگوی موسسه حسابرسی بهمند"
              style={{ height: "55px", objectFit: "contain" }}
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
                  "&:hover:after": {
                    width: "100%",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

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
