import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  People,
  Description,
  Message,
  Assessment,
  Dashboard,
  Logout,
  Article,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";

const drawerWidth = 260;

export default function AdminPanel() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { text: "داشبورد", path: "/admin/panel/dashboard", icon: <Dashboard /> },
    { text: "مشتریان", path: "/admin/panel/customers", icon: <People /> },
    { text: "رزومه‌ها", path: "/admin/panel/resumes", icon: <Description /> },
    { text: "پیام‌ها", path: "/admin/panel/messages", icon: <Message /> },
    {
      text: "صورت‌های مالی",
      path: "/admin/panel/financials",
      icon: <Assessment />,
    },
    { text: "مدیریت بلاگ‌ها", path: "/admin/panel/blogs", icon: <Article /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const drawerContent = (
    <Box>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false); // بستن منو روی موبایل بعد از کلیک
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* نوار بالا */}
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setMobileOpen(!mobileOpen)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" noWrap component="div">
              پنل مدیریت
            </Typography>
          </Box>
          <IconButton color="inherit" onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer برای دسکتاپ */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Drawer برای موبایل */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* محتوای اصلی */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
