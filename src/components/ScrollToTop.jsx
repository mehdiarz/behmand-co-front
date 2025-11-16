// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        // اگر می‌خوای اسکرول نرم باشه (خیلی قشنگ‌تر میشه):
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    return null;
};

export default ScrollToTop;