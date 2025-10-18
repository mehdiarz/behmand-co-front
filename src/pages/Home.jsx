import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  alpha,
  useTheme,
} from "@mui/material";
import {
  ArrowForward,
  Groups,
  Assignment,
  TrendingUp,
  EmojiPeople,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import bankShahr from "../assets/shahrLogo.png";
import bankGardeshgari from "../assets/gardeshgariLogo.png";
import naftBandar from "../assets/naftBandar.png";
import bimeNovin from "../assets/bimeNovin.png";
import bimeMa from "../assets/bimeMa.png";
import zarMakaron from "../assets/zarMakaron.png";
import maadiran from "../assets/maadiran.png";
import AboutSection from "../components/about/AboutSection.jsx";
import { useNavigate } from "react-router-dom";
import BlogSection from "../components/about/BlogSection.jsx";
import HeroSection from "../components/hero/HeroSection.jsx";
import ServicesSection from "../components/services/ServicesSection.jsx";

const API_URL = import.meta.env.VITE_API_URL;


// تصاویر با کیفیت برای اسلایدشو

export default function Home() {
  const theme = useTheme();
  const logos = [
    { src: bankShahr, alt: "بانک شهر" },
    { src: bankGardeshgari, alt: "بانک گردشگری" },
    { src: naftBandar, alt: "پالایش نفت بندر عباس" },
    { src: bimeNovin, alt: "بیمه نوین" },
    { src: bimeMa, alt: "بیمه ما" },
    { src: zarMakaron, alt: "زر ماکارون" },
    { src: maadiran, alt: "مادیران" },
  ];
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/blogs?limit=3`);
        const data = await res.json();
        setBlogs(data.items || data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    })();
  }, []);



  const features = [
    {
      icon: <Groups sx={{ fontSize: 48, color: "primary.main" }} />,
      title: "استانداردهای حرفه‌ای",
      desc: "رعایت آیین رفتار حرفه‌ای و استقلال در تمام خدمات با تمرکز بر کیفیت جهانی.",
    },
    {
      icon: <Assignment sx={{ fontSize: 48, color: "primary.main" }} />,
      title: "تیم مجرب",
      desc: "کارشناسان با تجربه در حوزه‌های حسابرسی، مالیات و مدیریت استراتژیک.",
    },
    {
      icon: <TrendingUp sx={{ fontSize: 48, color: "primary.main" }} />,
      title: "شفافیت و اعتماد",
      desc: "گزارش‌های دقیق برای تصمیم‌گیری مطمئن و پایدار.",
    },
    {
      icon: <EmojiPeople sx={{ fontSize: 48, color: "primary.main" }} />,
      title: "پوشش کامل خدمات",
      desc: "حسابرسی و بازرسی شرکت ها، سازمان ها، نهادها و سایر خدمات مرتبط با امور مالی",
    },
  ];

  return (
    <Box sx={{ overflow: "hidden", bgcolor: "background.default" }}>
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Blog Section */}
      <BlogSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Why Choose Us Section - طراحی مدرن */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: "linear-gradient(135deg, #ffffff 0%, #f8fbf8 100%)",
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: "center", mb: 8 }}>
              <Chip
                label="مزایای ما"
                sx={{
                  mb: 3,
                  px: 3,
                  py: 1,
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #388e3c, #66bb6a)",
                  color: "white",
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  color: "primary.dark",
                  fontSize: { xs: "2.5rem", md: "3rem" },
                  mb: 3,
                }}
              >
                چرا بهمند؟
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "text.secondary",
                  maxWidth: 800,
                  mx: "auto",
                  lineHeight: 1.8,
                  fontWeight: 400,
                }}
              >
                ترکیب تجربه، استانداردهای حرفه‌ای و نگاه داده‌محور برای ایجاد
                اعتماد و تصمیم‌های بهتر در دنیای رقابتی امروز. سابقه طولانی در
                ارائه خدمات حسابرسی و بازرسی به مدت ۴۶ سال
              </Typography>
            </Box>
          </motion.div>

          <Grid
            container
            spacing={4}
            sx={{
              justifyContent: "center", // مرکز کردن کل گرید
              alignItems: "stretch",
            }}
          >
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index} sx={{ width: 500 }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      minHeight: 200,
                      p: 4,
                      borderRadius: 4,
                      background:
                        "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
                      border: "1px solid",
                      borderColor: "divider",
                      transition: "all 0.3s ease",
                      textAlign: "center",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 16px 32px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                        mx: "auto",
                        background:
                          "linear-gradient(135deg, #388e3c20, #66bb6a20)",
                        color: "primary.main",
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 2,
                        fontWeight: 700,
                        color: "primary.dark",
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.7,
                        fontSize: "0.95rem",
                      }}
                    >
                      {feature.desc}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Stats Section - طراحی مدرن */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
                            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%)
                        `,
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={6} justifyContent="center">
            {[
              { label: "سال تجربه", value: 46, suffix: "+", icon: "📅" },
              {
                label: "پروژه‌های حسابرسی",
                value: 20000,
                suffix: "+",
                icon: "📊",
              },
              { label: "مشتریان فعال", value: 250, suffix: "+", icon: "👥" },
              { label: "تعداد کل پرسنل موسسه", value: 130, suffix: "+", icon: "🎓" },
            ].map((stat, i) => {
              const { ref, inView } = useInView({
                triggerOnce: true,
                threshold: 0.2,
              });
              return (
                <Grid item xs={6} sm={3} key={i} ref={ref}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.2,
                      ease: "easeOut",
                    }}
                    style={{ textAlign: "center" }}
                  >
                    <Box
                      sx={{
                        fontSize: "3rem",
                        mb: 2,
                        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 900,
                        fontSize: { xs: "2.5rem", md: "3rem" },
                        mb: 1,
                        textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                      }}
                    >
                      {inView ? (
                        <CountUp
                          start={0}
                          end={stat.value}
                          duration={2.5}
                          suffix={stat.suffix}
                        />
                      ) : (
                        "0"
                      )}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        opacity: 0.9,
                        fontSize: { xs: "1rem", md: "1.2rem" },
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Customers Section - طراحی مدرن */}
      <Box
        sx={{
          py: { xs: 6, sm: 8, md: 12 },
          px: { xs: 2, sm: 3, md: 0 },
          background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            sx={{
              mb: { xs: 6, md: 8 },
              justifyContent: { xs: "center", md: "space-between" },
              alignItems: { xs: "stretch", md: "center" },
            }}
            spacing={{ xs: 3, sm: 0 }}
          >
            <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
              <Chip
                label="مشتریان ما"
                sx={{
                  mb: 2,
                  px: { xs: 2, sm: 3 },
                  py: 1,
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #388e3c, #66bb6a)",
                  color: "white",
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  color: "primary.dark",
                  fontSize: {
                    xs: "1.8rem",
                    sm: "2rem",
                    md: "2.5rem",
                  },
                  lineHeight: 1.2,
                }}
              >
                برخی از مشتریان ما
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="primary"
              href="/customers"
              endIcon={<ArrowForward />}
              sx={{
                borderRadius: 3,
                px: { xs: 3, sm: 4 },
                py: 1,
                fontWeight: 600,
                borderWidth: 2,
                fontSize: { xs: "0.9rem", sm: "1rem" },
                width: { xs: "100%", sm: "auto" },
                minWidth: { xs: "auto", sm: 140 },
                "&:hover": {
                  borderWidth: 2,
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              مشاهده بیشتر
            </Button>
          </Stack>

          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 4 }}
            justifyContent="center"
            alignItems="center"
          >
            {logos.map((logo, i) => (
              <Grid
                item
                xs={4} // 3 ستون در موبایل
                sm={3} // 4 ستون در تبلت کوچک
                md={2} // 6 ستون در تبلت
                lg={2.4} // 5 ستون در دسکتاپ
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  style={{ width: "100%" }}
                >
                  <Box
                    sx={{
                      bgcolor: "white",
                      borderRadius: { xs: 2, sm: 3, md: 4 },
                      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                      height: {
                        xs: 80, // ارتفاع کمتر در موبایل
                        sm: 100, // ارتفاع متوسط در تبلت
                        md: 120, // ارتفاع استاندارد در دسکتاپ
                      },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      p: { xs: 2, sm: 3, md: 4 },
                      transition: "all 0.3s ease",
                      border: "1px solid",
                      borderColor: "divider",
                      mx: "auto",
                      maxWidth: { xs: 120, sm: 140, md: 160 },
                      "&:hover": {
                        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                        transform: {
                          xs: "translateY(-2px)",
                          sm: "translateY(-4px)",
                        },
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={logo.src}
                      alt={logo.alt}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        filter: "grayscale(100%)",
                        opacity: 0.7,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          filter: "grayscale(0%)",
                          opacity: 1,
                        },
                      }}
                    />
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* دکمه مشاهده بیشتر برای موبایل */}
          <Box
            sx={{
              display: { xs: "block", sm: "none" },
              textAlign: "center",
              mt: 4,
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              href="/customers"
              endIcon={<ArrowForward />}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontWeight: 600,
                borderWidth: 2,
                fontSize: "0.9rem",
                width: "100%",
                maxWidth: 280,
                "&:hover": {
                  borderWidth: 2,
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              مشاهده تمام مشتریان
            </Button>
          </Box>
        </Container>
      </Box>
      {/* CTA Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #66bb6a 0%, #388e3c 100%)",
          color: "white",
          py: { xs: 8, md: 12 },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
                            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%)
                        `,
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.5rem", md: "3rem" },
                mb: 3,
              }}
            >
              آماده شروع همکاری هستید؟
            </Typography>
            <Typography
              variant="h6"
              sx={{
                maxWidth: 800,
                mx: "auto",
                mb: 6,
                lineHeight: 1.8,
                fontWeight: 400,
                opacity: 0.9,
                fontSize: { xs: "1.1rem", md: "1.3rem" },
              }}
            >
              برای دریافت مشاوره اولیه و بررسی نیازهای کسب‌وکار شما، با ما تماس
              بگیرید یا درخواست خود را ثبت کنید.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              justifyContent="center"
            >
              <Button
                variant="contained"
                size="large"
                href="/contact"
                endIcon={<ArrowForward />}
                sx={{
                  borderRadius: 3,
                  px: 6,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.6)",
                  },
                }}
              >
                تماس با ما
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="/services"
                sx={{
                  borderRadius: 3,
                  px: 6,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  borderColor: "white",
                  color: "white",
                  borderWidth: 2,
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.1)",
                    borderColor: "white",
                    borderWidth: 2,
                  },
                }}
              >
                خدمات ما
              </Button>
            </Stack>
          </motion.div>
        </Container>
      </Box>

    </Box>
  );
}
