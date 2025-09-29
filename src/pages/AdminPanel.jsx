import React from "react";
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
} from "@mui/material";
import {
  People,
  Description,
  Message,
  Assessment,
  Dashboard,
  Logout,
  Article, // آیکون بلاگ
} from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";

const drawerWidth = 260;

export default function AdminPanel() {
  const navigate = useNavigate();

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

  return (
    <Box sx={{ display: "flex" }}>
      {/* نوار بالا */}
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            پنل مدیریت
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* منوی کناری */}
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
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* محتوای اصلی */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet /> {/* محتوای هر بخش */}
      </Box>
    </Box>
  );
}
