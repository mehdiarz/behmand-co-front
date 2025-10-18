import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";

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
  Modal,
  Fade,
  alpha,
  useTheme,
} from "@mui/material";
import {
  Calculate,
  ShowChart,
  Paid,
  Security,
  Timeline,
  SupportAgent,
  ArrowForward,
  Groups,
  Assignment,
  TrendingUp,
  EmojiPeople,
  PlayArrow,
  Pause,
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
import BalanceIcon from "@mui/icons-material/Balance";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import GavelIcon from "@mui/icons-material/Gavel";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AssessmentIcon from "@mui/icons-material/Assessment";

const API_URL = import.meta.env.VITE_API_URL;

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: 600, md: 700 },
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  maxHeight: "80vh",
  overflowY: "auto",
  border: "1px solid",
  borderColor: "divider",
};

// تصاویر با کیفیت برای اسلایدشو
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
];

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
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
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

  // اتوپلی اسلایدشو
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedService(null);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 5000);
  };

  const services = [
    {
      icon: <Calculate sx={{ fontSize: 48, color: "primary.main" }} />,
      title: "خدمات حسابرسی",
      desc: "از جمله انواع حسابرسی و بررسی اجمالی صورت های مالی...",
      fullDesc:
        "از جمله انواع حسابرسی و بررسی اجمالی صورت های مالی، رسیدگی به اطلاعات مالی آتی، روش های توافقی رسیدگی، حسابرسی خاص(ویژه)، حسابرسی عملیاتی، حسابرسی مالیاتی، حسابرسی بیمه ای.",
      color: "primary",
    },
    {
      icon: <Timeline sx={{ fontSize: 48, color: "success.main" }} />,
      title: "حسابرسی داخلی",
      desc: " گزارشگیری مالی بر اساس دستورالعمل های سزمان بورس و اوراق بهادار ومفاهیم یکپارچه coso",
      fullDesc:
        "ارائه گزارش حسابرسی داخلی به ویژه در محدوده کنترل های داخلی حاکم بر گزارشگیری مالی بر اساس دستورالعمل های سزمان بورس و اوراق بهادار ومفاهیم یکپارچه coso",
      color: "success",
    },
    {
      icon: <Paid sx={{ fontSize: 48, color: "warning.main" }} />,
      title: "خدمات مالی و حسابداری مالیاتی",
      desc: "برنامه‌ریزی و بهینه‌سازی مالیات با رعایت قوانین و مقررات ایران.",
      fullDesc:
        "مشاوره مالیاتی شامل تحلیل قوانین مالیاتی جاری، برنامه‌ریزی برای کاهش بار مالیاتی قانونی، تهیه اظهارنامه‌ها و نمایندگی در برابر مقامات مالیاتی است.",
      color: "warning",
    },
    {
      icon: <BalanceIcon sx={{ fontSize: 48, color: "secondary.main" }} />,
      title: "بازرسی قانونی",
      desc: "خدمات بازرسی قانونی شامل بررسی دقیق اسناد مالی، گزارش‌های حسابداری و عملکرد شرکت است تا اطمینان حاصل شود که فعالیت‌ها با قوانین و مقررات جاری کشور همخوانی دارد.",
      fullDesc:
        "بازرسی قانونی بر اساس مفاد ماده ۱۴۸ اصلاحیه قانون تجارت انجام می‌شود و هدف آن حمایت از حقوق سهامداران و ذی‌نفعان است. در این فرآیند، بازرس قانونی وظیفه دارد صورت‌های مالی، قراردادها و تصمیمات هیئت‌مدیره را به‌طور مستقل بررسی کرده و گزارشی شفاف و بی‌طرفانه ارائه دهد. این گزارش می‌تواند شامل ارزیابی ریسک‌ها، پیشنهادهای اصلاحی و تحلیل نقاط ضعف و قوت سیستم مالی شرکت باشد. نتیجه این بازرسی، ابزاری مهم برای تصمیم‌گیری مدیران و سهامداران محسوب می‌شود و نقش کلیدی در افزایش شفافیت و اعتماد عمومی دارد.",
      color: "secondary",
    },
    {
      icon: <AccountBalanceIcon sx={{ fontSize: 48, color: "info.main" }} />,
      title: "مشاوره مدیریت مالی",
      desc: "ارائه مشاوره تخصصی برای بهینه‌سازی منابع مالی، افزایش بهره‌وری سرمایه و کاهش ریسک‌های اقتصادی.",
      fullDesc:
        "خدمات مشاوره مدیریت مالی شامل تحلیل وضعیت مالی فعلی سازمان، طراحی استراتژی‌های سرمایه‌گذاری، مدیریت جریان نقدی و ارائه راهکارهای کاهش هزینه‌ها است. در این فرآیند، مشاوران مالی با بررسی دقیق صورت‌های مالی، بودجه‌بندی و پیش‌بینی‌های اقتصادی، به مدیران کمک می‌کنند تا تصمیمات آگاهانه‌تری بگیرند. هدف اصلی این خدمات، افزایش سودآوری، ایجاد ثبات مالی و پشتیبانی از رشد پایدار کسب‌وکار است. همچنین، مشاوره مدیریت مالی می‌تواند شامل راهنمایی در زمینه تأمین مالی پروژه‌ها، مدیریت بدهی‌ها و طراحی ساختار سرمایه بهینه باشد.",
      color: "info",
    },
    {
      icon: <GavelIcon sx={{ fontSize: 48, color: "error.main" }} />,
      title: "نظارت بر امور تصفیه",
      desc: "نظارت بر عملکرد مدیران تصفیه و ارائه گزارش شفاف به مجمع عمومی بر اساس ماده ۲۱۸ قانون تجارت.",
      fullDesc:
        "مطابق ماده ۲۱۸ اصلاحیه قانون تجارت، ناظر تصفیه وظیفه دارد بر کلیه اقدامات و عملیات مدیران تصفیه شرکت نظارت کند. این نظارت شامل بررسی اسناد، قراردادها و تصمیمات مرتبط با فرآیند تصفیه است تا اطمینان حاصل شود که تمامی امور در چارچوب قانون و به نفع ذی‌نفعان انجام می‌شود. در پایان، ناظر موظف است گزارشی جامع و بی‌طرفانه از نتایج بررسی‌های خود به مجمع عمومی شرکت ارائه نماید تا شفافیت و پاسخگویی در فرآیند تصفیه تضمین گردد.",
      color: "error",
    },
    {
      icon: <AssessmentIcon sx={{ fontSize: 48, color: "error.main" }} />,
      title: "داوری مالی",
      desc: "حل‌وفصل اختلافات مالی و قراردادی خارج از دادگاه با رأی داور بی‌طرف.",
      fullDesc:
        "داوری مالی روشی خصوصی و توافقی برای حل‌وفصل اختلافات مالی و قراردادی است که به‌جای مراجعه به دادگاه، با انتخاب داور بی‌طرف انجام می‌شود. در این فرآیند، مستندات، گزارش‌های مالی و مفاد قراردادها بررسی شده و رأی لازم‌الاجرا صادر می‌گردد. مزایای داوری شامل سرعت بیشتر، محرمانگی، هزینه کمتر و امکان انتخاب داور متخصص در امور مالی است. این رویکرد، به طرفین کمک می‌کند اختلافات را با کمترین اختلال در کسب‌وکار و بیشترین قطعیت حل کنند.",
      color: "error",
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 48, color: "success.main" }} />,
      title: "ارزیابی سهام و سهم‌الشرکه",
      desc: "تعیین ارزش منصفانه سهام و سهم‌الشرکه با روش‌های تخصصی ارزش‌گذاری.",
      fullDesc:
        "ارزیابی سهام و سهم‌الشرکه شامل تعیین ارزش منصفانه مالکیت در شرکت‌های سهامی و غیرسهامی بر اساس رویکردهای پذیرفته‌شده مثل درآمدی (DCF)، مقایسه‌ای بازار و بهای تمام‌شده/خالص ارزش دارایی‌ها است. در این فرآیند، صورت‌های مالی، جریان‌های نقدی، ساختار سرمایه، ریسک‌ها و چشم‌انداز رشد بررسی می‌شوند تا مبنایی معتبر برای معاملات، جذب سرمایه، خروج شریک، ادغام/تملک و رسیدگی به اختلافات فراهم شود. خروجی ارزیابی به‌صورت گزارش مستند، شفاف و قابل اتکا ارائه می‌گردد.",
      color: "success",
    },
  ];

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
      {/* Hero Section با اسلایدشو */}
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
                backgroundAttachment: { xs: "scroll", md: "fixed" }, // تغییر در موبایل
                backgroundRepeat: "no-repeat",
              }}
            />
          ))}
        </Box>

        {/* کنترل‌های اسلایدشو */}
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: 20, md: 40 }, // تنظیم موقعیت برای موبایل
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
                width: { xs: 10, md: 12 }, // سایز کوچکتر در موبایل
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
              width: { xs: 28, md: 32 }, // سایز کوچکتر در موبایل
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
            px: { xs: 2, sm: 3, md: 4 }, // padding جانبی در موبایل
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
                  label="موسسه معتبر حسابرسی"
                  sx={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))",
                    color: "white",
                    fontWeight: 700,
                    fontSize: { xs: "0.8rem", md: "0.9rem" }, // فونت کوچکتر در موبایل
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
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" }, // سایز فونت مناسب موبایل
                    lineHeight: 1.2,
                    mb: 3,
                    color: "white",
                    textShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                    textAlign: { xs: "center", md: "left" }, // متن در مرکز در موبایل
                  }}
                >
                  موسسه حسابرسی
                  <Box
                    component="span"
                    sx={{
                      display: "block",
                      background: "linear-gradient(135deg, #66bb6a, #388e3c)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textAlign: { xs: "center", md: "left" },
                    }}
                  >
                    بهمند
                  </Box>
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    color: "rgba(255, 255, 255, 0.9)",
                    maxWidth: 600,
                    lineHeight: 1.6,
                    fontWeight: 400,
                    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" }, // سایز فونت مناسب موبایل
                    textAlign: { xs: "center", md: "left" }, // متن در مرکز در موبایل
                  }}
                >
                  ارائه خدمات تخصصی حسابرسی، مالی و مشاوره‌ای با استانداردهای
                  حسابداری و حسابرسی ایران و بیش از ۴۶ سال تجربه
                </Typography>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={3}
                  sx={{
                    justifyContent: { xs: "center", md: "flex-start" }, // دکمه‌ها در مرکز در موبایل
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
                      width: { xs: "100%", sm: "auto" }, // عرض کامل در موبایل
                      maxWidth: { xs: 280, sm: "none" },
                    }}
                  >
                    شروع همکاری
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
                      width: { xs: "100%", sm: "auto" }, // عرض کامل در موبایل
                      maxWidth: { xs: 280, sm: "none" },
                    }}
                  >
                    درباره ما
                  </Button>
                </Stack>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      <AboutSection />

      {/* Blog Section */}
      <BlogSection />

      {/* Services Section - طراحی مدرن */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: "background.default",
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Chip
                label="خدمات تخصصی"
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
                  color: "text.primary",
                  fontSize: { xs: "2.5rem", md: "3rem" },
                  mb: 3,
                }}
              >
                خدمات حرفه‌ای ما
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
                مجموعه‌ای کامل از خدمات مالی و حسابرسی برای پاسخ‌گویی به نیازهای
                متفاوت سازمان ها، نهادها و کسب و کارها
              </Typography>
            </motion.div>
          </Box>

          {/* Services Grid */}
          <Grid
            container
            spacing={3}
            sx={{
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{ width: 500 }}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    onClick={() => handleOpenModal(service)}
                    sx={{
                      height: "100%",
                      minHeight: 300,
                      cursor: "pointer",
                      borderRadius: 4,
                      border: "1px solid",
                      borderColor: "divider",
                      background:
                        "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      overflow: "visible",
                      position: "relative",
                      "&:before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: `linear-gradient(90deg, ${theme.palette[service.color].main}, ${theme.palette[service.color].light})`,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        transform: "scaleX(0)",
                        transition: "transform 0.4s ease",
                      },
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 24px 48px rgba(0,0,0,0.12)",
                        "&:before": {
                          transform: "scaleX(1)",
                        },
                        "& .service-icon": {
                          transform: "scale(1.1)",
                          background: `linear-gradient(135deg, ${theme.palette[service.color].main}20, ${theme.palette[service.color].light}20)`,
                        },
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        p: 4,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* Icon */}
                      <Box
                        className="service-icon"
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 3,
                          mx: "auto",
                          transition: "all 0.4s ease",
                          background: `linear-gradient(135deg, ${theme.palette[service.color].main}10, ${theme.palette[service.color].light}10)`,
                          border: `1px solid ${theme.palette[service.color].main}20`,
                        }}
                      >
                        {service.icon}
                      </Box>

                      {/* Content */}
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="h5"
                          sx={{
                            mb: 2,
                            fontWeight: 700,
                            color: "text.primary",
                          }}
                        >
                          {service.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", lineHeight: 1.7 }}
                        >
                          {service.desc}
                        </Typography>
                      </Box>

                      {/* CTA */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: `${service.color}.main`,
                          fontWeight: 600,
                          mt: "auto",
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          اطلاعات بیشتر
                        </Typography>
                        <ArrowForward
                          sx={{
                            fontSize: 18,
                            mr: 1,
                            transition: "transform 0.3s ease",
                          }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

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

      {/* Modal for Service Details */}
      <Modal open={openModal} onClose={handleCloseModal} closeAfterTransition>
        <Fade in={openModal}>
          <Box sx={modalStyle}>
            {selectedService && (
              <>
                <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 3,
                      background: `linear-gradient(135deg, ${theme.palette[selectedService.color].main}20, ${theme.palette[selectedService.color].light}20)`,
                    }}
                  >
                    {selectedService.icon}
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {selectedService.title}
                  </Typography>
                </Box>
                <Typography
                  color="text.secondary"
                  sx={{ lineHeight: 1.8, fontSize: "1.1rem" }}
                >
                  {selectedService.fullDesc}
                </Typography>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
