import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Chip,
  Button,
  alpha,
  useTheme,
  Dialog,
  DialogContent,
  IconButton,
  AppBar,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import {
  Close,
  NavigateBefore,
  NavigateNext,
  ZoomIn,
  ZoomOut,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

import about1 from "../../assets/about1.jpg";
import about2 from "../../assets/about2.jpeg";
import about3 from "../../assets/about3.jpeg";
import about4 from "../../assets/about4.jpeg";
import about5 from "../../assets/about5.jpeg";

const PROFESSIONAL_IMAGES = [about1, about2, about3, about4, about5];

const tabs = [
  {
    key: "vision",
    label: "چشم‌انداز",
    text: "ما با تکیه بر سال‌ها تجربه و تخصص، به ارائه خدمات حسابرسی و مالی با بالاترین استانداردهای بین‌المللی متعهد هستیم. هدف ما ایجاد اعتماد و شفافیت در فضای کسب‌وکار ایران است.",
  },
  {
    key: "mission",
    label: "ماموریت",
    text: "ارائه راهکارهای مالی و حسابرسی مبتنی بر نوآوری و تکنولوژی روز، همراه با پشتیبانی مستمر و مشاوره تخصصی برای رشد پایدار کسب‌وکارهای ایرانی.",
  },
  {
    key: "values",
    label: "ارزش‌ها",
    text: "تعهد به اخلاق حرفه‌ای، دقت و صحت، نوآوری مستمر، و روابط بلندمدت با مشتریان از ارزش‌های بنیادین موسسه بهمند می‌باشد.",
  },
];

const stats = [
  { num: 15, suffix: "+", text: "سال تجربه" },
  { num: 250, suffix: "+", text: "پروژه موفق" },
  { num: 120, suffix: "+", text: "مشتری فعال" },
];

export default function AboutSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const [activeTab, setActiveTab] = useState("vision");
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  // آمار و ارقام
  useEffect(() => {
    stats.forEach((s, idx) => {
      let start = 0;
      const step = Math.ceil(s.num / 50);
      const interval = setInterval(() => {
        start += step;
        if (start >= s.num) {
          start = s.num;
          clearInterval(interval);
        }
        setCounters((prev) => {
          const copy = [...prev];
          copy[idx] = start;
          return copy;
        });
      }, 40);
      return () => clearInterval(interval);
    });
  }, []);

  const activeContent = tabs.find((t) => t.key === activeTab);

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedImage(null);
    setZoomLevel(1);
  };

  const goToNext = () => {
    const nextIndex = (currentImageIndex + 1) % PROFESSIONAL_IMAGES.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(PROFESSIONAL_IMAGES[nextIndex]);
    setZoomLevel(1);
  };

  const goToPrev = () => {
    const prevIndex =
      (currentImageIndex - 1 + PROFESSIONAL_IMAGES.length) %
      PROFESSIONAL_IMAGES.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(PROFESSIONAL_IMAGES[prevIndex]);
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 1));
  };

  // مدیریت رویدادهای کیبورد
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!selectedImage) return;

      switch (event.key) {
        case "Escape":
          handleCloseLightbox();
          break;
        case "ArrowRight":
          goToNext();
          break;
        case "ArrowLeft":
          goToPrev();
          break;
        case "+":
        case "=":
          handleZoomIn();
          break;
        case "-":
          handleZoomOut();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentImageIndex]);

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10, lg: 12 },
        background: `
                    linear-gradient(135deg, 
                        ${theme.palette.primary.dark} 0%, 
                        ${theme.palette.primary.main} 50%, 
                        ${theme.palette.primary.light} 100%
                    )
                `,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
                        radial-gradient(circle at 20% 80%, ${alpha(theme.palette.primary.light, 0.1)} 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, ${alpha(theme.palette.primary.dark, 0.1)} 0%, transparent 50%),
                        radial-gradient(circle at 40% 40%, ${alpha("#ffffff", 0.05)} 0%, transparent 50%)
                    `,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid
          container
          spacing={{ xs: 4, md: 6, lg: 8 }}
          alignItems="center"
          justifyContent="center"
          sx={{ textAlign: { xs: "center", md: "left" } }}
        >
          {/* محتوا */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* هدر */}
              <Box sx={{ mb: { xs: 3, md: 4 } }}>
                <Chip
                  label="درباره ما"
                  sx={{
                    mb: { xs: 2, md: 2 },
                    px: { xs: 2, md: 3 },
                    py: { xs: 0.8, md: 1 },
                    fontSize: { xs: "0.8rem", md: "0.9rem" },
                    fontWeight: 700,
                    background: alpha("#ffffff", 0.2),
                    color: "white",
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${alpha("#ffffff", 0.3)}`,
                  }}
                />
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    color: "white",
                    fontSize: {
                      xs: "1.8rem",
                      sm: "2.2rem",
                      md: "2.5rem",
                      lg: "2.8rem",
                    },
                    lineHeight: 1.2,
                    mb: { xs: 1.5, md: 2 },
                    textShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  موسسه حسابرسی
                  <Box
                    component="span"
                    sx={{
                      color: theme.palette.secondary.main,
                      textShadow: "0 2px 8px rgba(251, 192, 45, 0.3)",
                      display: "block",
                      fontSize: {
                        xs: "1.4rem",
                        sm: "1.8rem",
                        md: "2.2rem",
                        lg: "2.5rem",
                      },
                      mt: { xs: 0.5, md: 1 },
                    }}
                  >
                    بهمند
                  </Box>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: alpha("#ffffff", 0.95),
                    lineHeight: 1.6,
                    fontWeight: 400,
                    fontSize: {
                      xs: "0.85rem",
                      sm: "0.95rem",
                      md: "1.05rem",
                      lg: "1.1rem",
                    },
                  }}
                >
                  پیشرو در ارائه خدمات تخصصی حسابرسی، مالی و مشاوره‌ای با
                  استانداردهای جهانی
                </Typography>
              </Box>

              {/* تب‌های مدرن */}
              <Box sx={{ mb: { xs: 3, md: 4 } }}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    mb: { xs: 2, md: 3 },
                    flexWrap: "wrap",
                    gap: { xs: 0.8, md: 1 },
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  {tabs.map((t) => (
                    <Chip
                      key={t.key}
                      label={t.label}
                      clickable
                      onClick={() => setActiveTab(t.key)}
                      sx={{
                        background:
                          activeTab === t.key
                            ? `linear-gradient(135deg, ${alpha("#ffffff", 0.25)}, ${alpha("#ffffff", 0.15)})`
                            : alpha("#ffffff", 0.1),
                        color: "white",
                        fontWeight: 600,
                        borderRadius: { xs: 1.5, md: 2 },
                        px: { xs: 2, md: 3 },
                        py: { xs: 1, md: 1.5 },
                        fontSize: { xs: "0.8rem", md: "0.9rem" },
                        border:
                          activeTab === t.key
                            ? `1px solid ${alpha("#ffffff", 0.4)}`
                            : `1px solid ${alpha("#ffffff", 0.2)}`,
                        transition: "all 0.3s ease",
                        backdropFilter: "blur(10px)",
                        "&:hover": {
                          background: alpha("#ffffff", 0.2),
                          transform: "translateY(-2px)",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        },
                        minWidth: { xs: 80, md: "auto" },
                      }}
                    />
                  ))}
                </Stack>

                <Typography
                  sx={{
                    color: alpha("#ffffff", 0.95),
                    lineHeight: 1.7,
                    fontSize: {
                      xs: "0.85rem",
                      md: "0.95rem",
                      lg: "1rem",
                    },
                    minHeight: { xs: "auto", md: 120 },
                    background: alpha("#ffffff", 0.05),
                    p: { xs: 2, md: 3 },
                    borderRadius: { xs: 1.5, md: 2 },
                    border: `1px solid ${alpha("#ffffff", 0.1)}`,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {activeContent.text}
                </Typography>
              </Box>

              {/* آمار و ارقام */}
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                sx={{ mb: { xs: 3, md: 4 } }}
              >
                {stats.map((s, i) => (
                  <Grid item xs={4} key={i}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 900,
                          color: theme.palette.secondary.main,
                          fontSize: {
                            xs: "1.3rem",
                            sm: "1.6rem",
                            md: "1.9rem",
                            lg: "2.2rem",
                          },
                          textShadow: "0 2px 8px rgba(0,0,0,0.2)",
                          lineHeight: 1.2,
                        }}
                      >
                        {counters[i]}
                        {s.suffix}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: alpha("#ffffff", 0.9),
                          fontWeight: 600,
                          mt: { xs: 0.5, md: 1 },
                          fontSize: {
                            xs: "0.7rem",
                            sm: "0.75rem",
                            md: "0.8rem",
                            lg: "0.9rem",
                          },
                        }}
                      >
                        {s.text}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {/* دکمه CTA */}
              <Button
                variant="contained"
                size="large"
                href="/about"
                sx={{
                  background: `linear-gradient(135deg, ${alpha("#ffffff", 0.2)}, ${alpha("#ffffff", 0.1)})`,
                  color: "white",
                  borderRadius: { xs: 2, md: 3 },
                  px: { xs: 3, md: 4, lg: 5 },
                  py: { xs: 1.2, md: 1.5 },
                  fontSize: {
                    xs: "0.9rem",
                    md: "1rem",
                    lg: "1.1rem",
                  },
                  fontWeight: 700,
                  border: `1px solid ${alpha("#ffffff", 0.3)}`,
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  "&:hover": {
                    background: alpha("#ffffff", 0.25),
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                  },
                  transition: "all 0.3s ease",
                  minWidth: { xs: 140, md: 160 },
                }}
              >
                آشنایی بیشتر
              </Button>
            </motion.div>
          </Grid>


        </Grid>
      </Container>


    </Box>
  );
}
