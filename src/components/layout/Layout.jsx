import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default", // پس‌زمینه از theme
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
