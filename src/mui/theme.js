import { createTheme } from "@mui/material";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

export const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export const cacheLtr = createCache({
  key: "muiltr",
  stylisPlugins: [prefixer], // بدون پلاگین RTL
});

// تابع برای ایجاد تم پویا بر اساس زبان
export function createAppTheme(language = "fa") {
  const isPersian = language === "fa";
  const direction = isPersian ? "rtl" : "ltr";

  return createTheme({
    direction: direction, // حالا بر اساس زبان تغییر می‌کند
    typography: {
      fontFamily: isPersian
        ? `"YekanBakh", "Roboto", "Helvetica", "Arial", sans-serif`
        : `"Roboto", "Helvetica", "Arial", sans-serif`,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      fontWeightHeavy: 800,
      fontWeightFat: 900,
      h3: {
        fontSize: "2.5rem",
        fontWeight: 800,
      },
      h4: {
        fontSize: "2rem",
        fontWeight: 700,
      },
      h5: {
        fontSize: "1.5rem",
        fontWeight: 600,
      },
      body1: {
        fontSize: "1.1rem",
        lineHeight: 1.8,
      },
    },
    palette: {
      primary: {
        main: "#388e3c",
        dark: "#2e7d32",
        light: "#66bb6a",
        contrastText: "#fff",
      },
      secondary: {
        main: "#fbc02d",
      },
      background: {
        default: "#f1fff4",
        paper: "#ffffff",
      },
      text: {
        primary: "#212121",
        secondary: "#424242",
      },
      success: {
        main: "#4caf50",
        dark: "#388e3c",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "#f1fff4",
            fontFamily: isPersian
              ? '"YekanBakh", "Roboto", "Helvetica", "Arial", sans-serif'
              : '"Roboto", "Helvetica", "Arial", sans-serif',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            fontWeight: 600,
            textTransform: "none",
            padding: "10px 24px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            "&:hover": {
              boxShadow: "0 6px 10px rgba(0,0,0,0.15)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: "0 8px 16px rgba(0,0,0,0.05)",
            "&:hover": {
              boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
            },
          },
        },
      },
    },
  });
}

// تم پیش‌فرض
const theme = createAppTheme();
export default theme;
