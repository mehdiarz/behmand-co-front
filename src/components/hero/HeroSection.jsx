import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PlayArrow, Pause } from "@mui/icons-material";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
];

export default function HeroSection() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // اتوپلی اسلایدشو
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 5000);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* اسلایدشو */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {HERO_IMAGES.map((image, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: index === currentSlide ? 1 : 0,
              transition: "opacity 1s ease-in-out",
              backgroundImage: {
                xs: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${image})`,
                md: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${image})`,
              },
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: { xs: "scroll", md: "fixed" },
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}
      </Box>

      {/* کنترل‌های اسلایدشو */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: 20, md: 40 },
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1,
          zIndex: 10,
        }}
      >
        {HERO_IMAGES.map((_, index) => (
          <Box
            key={index}
            onClick={() => goToSlide(index)}
            sx={{
              width: { xs: 10, md: 12 },
              height: { xs: 10, md: 12 },
              borderRadius: "50%",
              backgroundColor:
                index === currentSlide
                  ? "primary.main"
                  : "rgba(255, 255, 255, 0.5)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor:
                  index === currentSlide
                    ? "primary.dark"
                    : "rgba(255, 255, 255, 0.7)",
              },
            }}
          />
        ))}
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          sx={{
            minWidth: "auto",
            width: { xs: 28, md: 32 },
            height: { xs: 28, md: 32 },
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "white",
            ml: 2,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            },
          }}
        >
          {isPlaying ? (
            <Pause fontSize="small" />
          ) : (
            <PlayArrow fontSize="small" />
          )}
        </Button>
      </Box>

      {/* محتوای Hero */}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Chip
                label={t("home.hero.subtitle")}
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))",
                  color: "white",
                  fontWeight: 700,
                  fontSize: { xs: "0.8rem", md: "0.9rem" },
                  px: { xs: 2, md: 3 },
                  py: 1,
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  mb: 3,
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                  lineHeight: 1.2,
                  mb: 3,
                  color: "white",
                  textShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                {t("home.hero.title")}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  color: "rgba(255, 255, 255, 0.9)",
                  maxWidth: 600,
                  lineHeight: 1.6,
                  fontWeight: 400,
                  fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                {t("home.hero.description")}
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                sx={{
                  justifyContent: { xs: "center", md: "flex-start" },
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  href="/contact"
                  sx={{
                    background: "linear-gradient(135deg, #66bb6a, #388e3c)",
                    borderRadius: 3,
                    px: { xs: 3, md: 4 },
                    py: 1.5,
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    fontWeight: 700,
                    boxShadow: "0 8px 24px rgba(56,142,60,0.4)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #388e3c, #2e7d32)",
                      boxShadow: "0 12px 32px rgba(56,142,60,0.6)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                    width: { xs: "100%", sm: "auto" },
                    maxWidth: { xs: 280, sm: "none" },
                  }}
                >
                  {t("common.getStarted")}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  href="/about"
                  sx={{
                    borderRadius: 3,
                    px: { xs: 3, md: 4 },
                    py: 1.5,
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    fontWeight: 700,
                    borderColor: "white",
                    color: "white",
                    borderWidth: 2,
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      borderColor: "white",
                      borderWidth: 2,
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                    width: { xs: "100%", sm: "auto" },
                    maxWidth: { xs: 280, sm: "none" },
                  }}
                >
                  {t("navigation.about")}
                </Button>
              </Stack>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}