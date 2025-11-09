import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import DownloadIcon from "@mui/icons-material/Download";
import { useTranslation } from "react-i18next";

const ResumeDownloadSection = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const language = i18n.language;

  const handleDownload = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;

      // استفاده از API جدید backend
      const response = await fetch(`${API_URL}/api/company-resume/download`);

      if (!response.ok) {
        throw new Error("خطا در دانلود فایل");
      }

      // ایجاد Blob از پاسخ
      const blob = await response.blob();

      // ایجاد لینک دانلود
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // گرفتن نام فایل از هدرهای پاسخ
      const contentDisposition = response.headers.get("content-disposition");
      let fileName = `رزومه-موسسه-حسابرسی-بهمند-${new Date().getFullYear()}.pdf`;

      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch && fileNameMatch.length === 2) {
          fileName = fileNameMatch[1];
        }
      }

      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      // تمیزکاری
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("خطا در دانلود:", error);

      // فال‌بک: تلاش برای دانلود مستقیم
      const API_URL = import.meta.env.VITE_API_URL;
      const fallbackLink = document.createElement("a");
      fallbackLink.href = `${API_URL}/documents/behmand-auditing-resume.pdf`;
      fallbackLink.download = `رزومه-موسسه-حسابرسی-بهمند.pdf`;
      fallbackLink.target = "_blank";
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      document.body.removeChild(fallbackLink);
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },

        position: "relative",
        mt: 8,
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            sx={{
              p: { xs: 4, md: 6 },
              textAlign: "center",
              background: "rgba(255,255,255,0.9)",
              borderRadius: 4,
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              border: "1px solid rgba(46, 125, 50, 0.1)",
            }}
          >
            {/* Title */}
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 800,
                color: theme.palette.primary.dark,
                mb: 3,
              }}
            >
              {language === "fa"
                ? "رزومه مؤسسه حسابرسی بهمند"
                : "Behmand Auditing Institute Resume"}
            </Typography>

            {/* Description */}
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 4,
                lineHeight: 1.8,
                fontSize: "1.1rem",
                maxWidth: 500,
                mx: "auto",
              }}
            >
              {language === "fa"
                ? "با دریافت فایل رزومه می‌توانید با سوابق مدیران، ساختار سازمانی، مشتریان و خدمات قابل ارائه از سوی این مؤسسه آشنا شوید."
                : "By downloading the resume file, you can learn about the background, managers, organizational structure, clients, and services provided by this institute."}
            </Typography>

            {/* Download Button */}
            <Button
              variant="contained"
              size="large"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: "1rem",
                fontWeight: 600,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                borderRadius: 3,
                boxShadow: "0 6px 20px rgba(46, 125, 50, 0.3)",
                "&:hover": {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, #1b5e20 100%)`,
                  boxShadow: "0 8px 25px rgba(46, 125, 50, 0.4)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
                minWidth: 200,
              }}
            >
              {language === "fa" ? "دریافت نسخه چاپی رزومه" : "Download Resume"}
            </Button>

            {/* File Info */}
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                mt: 2,
                opacity: 0.7,
              }}
            >
              {language === "fa"
                ? "فرمت: PDF | حجم: ~2.5 MB"
                : "Format: PDF | Size: ~2.5 MB"}
            </Typography>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ResumeDownloadSection;
