import { createTheme } from "@mui/material";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: `"YekanBakh", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    fontWeightHeavy: 800,
    fontWeightFat: 900,
  },
  palette: {
    primary: {
      main: "#388e3c", // سبز اصلی برای دکمه‌ها و لینک‌ها
      contrastText: "#fff",
    },
    secondary: {
      main: "#fbc02d", // زرد ملایم برای رنگ مکمل
    },
    background: {
      default: "#f1fff4", // پس‌زمینه سبز خیلی روشن
      paper: "#ffffff", // کارت‌ها و سطوح سفید
    },
    text: {
      primary: "#212121", // متن اصلی مشکی/خاکستری تیره
      secondary: "#424242", // متن فرعی خاکستری متوسط
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f1fff4", // پس‌زمینه کل صفحه سبز روشن
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
  },
});

export const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default theme;
