import React, {useEffect, useState} from "react";
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
  CardMedia,
  Chip,
  Stack,
  Avatar,
  Divider,
} from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PaidIcon from "@mui/icons-material/Paid";
import SecurityIcon from "@mui/icons-material/Security";
import TimelineIcon from "@mui/icons-material/Timeline";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AboutSlider from "../components/slider/AboutSlider.jsx";
import { motion } from "framer-motion";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import bankShahr from "../assets/shahrLogo.png";
import bankGardeshgari from "../assets/gardeshgariLogo.png";
import heroSection from "../assets/heroSection.jpeg";
import bgImage from "../assets/abourBg.png";
import AboutSection from "../components/about/AboutSection.jsx";
import HeroSection from "../components/hero/HeroSection.jsx";
import {useNavigate} from "react-router-dom";
import BlogSection from "../components/about/BlogSection.jsx";

const API_URL = import.meta.env.VITE_API_URL;


export default function Home() {
  const logos = [
    { src: bankShahr, alt: "بانک شهر" },
    { src: bankGardeshgari, alt: "بانک گردشگری" },
  ];
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${API_URL}/api/blogs?limit=3`);
                const data = await res.json();
                setBlogs(data.items || data); // بسته به خروجی API
            } catch (err) {
                console.error("Error fetching blogs:", err);
            }
        })();
    }, []);
  return (
    <>
        <Box
            sx={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                color: "#fff",
            }}
        >
            {/* Hero Section */}
            <HeroSection />

            {/* About Section */}
            <AboutSection />
        </Box>

        {/* Blog Section (بیرون از Box چون بک‌گراند خودش رو داشته باشه) */}
        <BlogSection />


        {/* Services Section — Grid v2 with equal widths & heights */}
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "grey.50" }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            خدمات ما
          </Typography>
          <Typography
            align="center"
            color="text.secondary"
            sx={{ mb: 5, maxWidth: 800, mx: "auto" }}
          >
            مجموعه‌ای کامل از خدمات مالی و حسابرسی برای پاسخ‌گویی به نیازهای
            متفاوت کسب‌وکارها.
          </Typography>

          <Grid
            container
            columns={12}
            columnSpacing={4}
            rowSpacing={4}
            alignItems="center"
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            {[
              {
                icon: <CalculateIcon color="primary" sx={{ fontSize: 48 }} />,
                title: "حسابرسی صورت‌های مالی",
                desc: "ارزیابی بی‌طرفانه صورت‌های مالی براساس استانداردهای روز.",
              },
              {
                icon: <TimelineIcon color="success" sx={{ fontSize: 48 }} />,
                title: "حسابرسی داخلی",
                desc: "بهبود کنترل‌های داخلی و کاهش ریسک‌های عملیاتی.",
              },
              {
                icon: <PaidIcon color="warning" sx={{ fontSize: 48 }} />,
                title: "مشاوره مالیاتی",
                desc: "برنامه‌ریزی و بهینه‌سازی مالیات با رعایت قوانین و مقررات.",
              },
              {
                icon: <ShowChartIcon color="secondary" sx={{ fontSize: 48 }} />,
                title: "تحلیل و بودجه‌ریزی",
                desc: "تحلیل عملکرد و تدوین بودجه برای رشد پایدار.",
              },
              {
                icon: <SecurityIcon color="info" sx={{ fontSize: 48 }} />,
                title: "حاکمیت شرکتی",
                desc: "طراحی ساختارهای نظارتی و گزارشگری برای شفافیت بیشتر.",
              },
              {
                icon: <SupportAgentIcon color="error" sx={{ fontSize: 48 }} />,
                title: "پشتیبانی مالی",
                desc: "همراهی مستمر در گزارشگری و تصمیم‌سازی مالی.",
              },
            ].map((s, i) => (
              <Grid
                key={i}
                sx={{
                  gridColumn: { xs: "span 12", sm: "span 6", md: "span 4" },
                  display: "flex",
                }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    transition: "0.3s",
                    "&:hover": { boxShadow: 4, transform: "translateY(-4px)" },
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CardContent
                    sx={{
                      textAlign: "center",
                      py: 4,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      flexGrow: 1,
                    }}
                  >
                    {/* آیکن با ارتفاع ثابت */}
                    <Box
                      sx={{
                        height: 60,
                        width: 500,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                      }}
                    >
                      {s.icon}
                    </Box>

                    {/* عنوان با ارتفاع ثابت */}
                    <Typography
                      variant="h6"
                      sx={{
                        minHeight: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                      }}
                    >
                      {s.title}
                    </Typography>

                    {/* توضیح؛ دو خط clamp برای ارتفاع یکنواخت */}
                    <Typography
                      color="text.secondary"
                      sx={{
                        textAlign: "center",
                        lineHeight: 1.7,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: 48,
                      }}
                    >
                      {s.desc}
                    </Typography>

                    {/* Spacer برای پر کردن ارتفاع باقی‌مانده */}
                    <Box sx={{ flexGrow: 1 }} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Why Us Section */}
      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            چرا بهمند؟
          </Typography>
          <Typography
            align="center"
            color="text.secondary"
            sx={{ mb: 5, maxWidth: 800, mx: "auto" }}
          >
            ترکیب تجربه، استانداردهای حرفه‌ای و نگاه داده‌محور برای ایجاد اعتماد
            و تصمیم‌های بهتر.
          </Typography>

          <Grid container columns={12} columnSpacing={4} rowSpacing={4}>
            {[
              {
                title: "استانداردهای حرفه‌ای",
                desc: "رعایت آیین رفتار حرفه‌ای و استقلال در تمام خدمات.",
              },
              {
                title: "تیم مجرب",
                desc: "کارشناسان با تجربه در حوزه‌های حسابرسی، مالیات و مدیریت.",
              },
              {
                title: "شفافیت و اعتماد",
                desc: "گزارش‌های دقیق برای تصمیم‌گیری مطمئن.",
              },
              {
                title: "پوشش کامل خدمات",
                desc: "از حسابرسی تا مشاوره مالی و مالیاتی.",
              },
            ].map((f, i) => (
              <Grid
                key={i}
                sx={{ gridColumn: { xs: "span 12", sm: "span 6" } }}
              >
                <Stack spacing={1.5}>
                  <Typography variant="h6">{f.title}</Typography>
                  <Typography color="text.secondary">{f.desc}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "grey.100" }}>
        <Container>
          <Grid
            container
            columns={12}
            columnSpacing={4}
            rowSpacing={4}
            justifyContent="center"
          >
            {[
              { label: "سال تجربه", value: 15, suffix: "+" },
              { label: "پروژه‌های حسابرسی", value: 250, suffix: "+" },
              { label: "مشتریان فعال", value: 120, suffix: "+" },
              { label: "کارشناسان متخصص", value: 30, suffix: "+" },
            ].map((st, i) => {
              const { ref, inView } = useInView({
                triggerOnce: true,
                threshold: 0.3,
              });
              return (
                <Grid
                  key={i}
                  ref={ref}
                  sx={{
                    gridColumn: { xs: "span 6", md: "span 3" },
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h3">
                    {inView ? (
                      <CountUp
                        start={0}
                        end={st.value}
                        duration={2}
                        suffix={st.suffix}
                      />
                    ) : (
                      "0"
                    )}
                  </Typography>
                  <Typography color="text.secondary">{st.label}</Typography>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Clients / Partners Section */}

      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "grey.50" }}>
        <Container>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Typography variant="h5">برخی از مشتریان ما</Typography>
            <Button variant="text" href="/customers">
              مشاهده بیشتر
            </Button>
          </Stack>

          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            {logos.map((l, i) => (
              <Grid key={i} item xs={6} sm={3}>
                <Box
                  sx={{
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 1,
                    height: { xs: 100, sm: 120, md: 140 },
                    width: { xs: 100, sm: 120, md: 140 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.08)",
                      boxShadow: 4,
                    },
                  }}
                >
                  <img
                    src={l.src}
                    alt={l.alt}
                    style={{
                      maxWidth: "80%",
                      maxHeight: "80%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/*<Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "grey.50" }}>*/}
      {/*  <Container>*/}
      {/*    <Typography variant="h4" align="center" gutterBottom>*/}
      {/*      نظرات مشتریان*/}
      {/*    </Typography>*/}
      {/*    <Grid*/}
      {/*      container*/}
      {/*      columns={12}*/}
      {/*      columnSpacing={4}*/}
      {/*      rowSpacing={4}*/}
      {/*      sx={{ mt: 2 }}*/}
      {/*    >*/}
      {/*      {[1, 2, 3].map((i) => (*/}
      {/*        <Grid*/}
      {/*          key={i}*/}
      {/*          sx={{ gridColumn: { xs: "span 12", md: "span 4" } }}*/}
      {/*        >*/}
      {/*          <Card variant="outlined" sx={{ height: "100%" }}>*/}
      {/*            <CardContent>*/}
      {/*              <Stack*/}
      {/*                direction="row"*/}
      {/*                spacing={2}*/}
      {/*                alignItems="center"*/}
      {/*                sx={{ mb: 2 }}*/}
      {/*              >*/}
      {/*                <Avatar />*/}
      {/*                <Box>*/}
      {/*                  <Typography variant="subtitle1">*/}
      {/*                    نام مشتری {i}*/}
      {/*                  </Typography>*/}
      {/*                  <Typography variant="caption" color="text.secondary">*/}
      {/*                    شرکت نمونه*/}
      {/*                  </Typography>*/}
      {/*                </Box>*/}
      {/*              </Stack>*/}
      {/*              <Typography color="text.secondary">*/}
      {/*                لورم ایپسوم متن ساختگی است برای نمایش نظر مشتری درباره*/}
      {/*                کیفیت خدمات و همکاری حرفه‌ای با تیم بهمند.*/}
      {/*              </Typography>*/}
      {/*            </CardContent>*/}
      {/*          </Card>*/}
      {/*        </Grid>*/}
      {/*      ))}*/}
      {/*    </Grid>*/}
      {/*  </Container>*/}
      {/*</Box>*/}


      {/* Blog / Articles Section */}
        {/*<Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Typography variant="h4">مقالات اخیر</Typography>
            <Button variant="text" href="/blog">
              مشاهده همه
            </Button>
          </Stack>

          <Grid container columns={12} columnSpacing={4} rowSpacing={4}>
            {blogs.map((b) => (
              <Grid
                key={b._id}
                sx={{ gridColumn: { xs: "span 12", md: "span 4" } }}
              >
                <Card
                  variant="outlined"
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(`/blog/${b.slug}`)}
                >
                  {b.coverImage?.filePath && (
                    <CardMedia
                      component="img"
                      height="160"
                      image={`http://localhost:5000/${b.coverImage.filePath}`}
                      alt={b.title}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6">{b.title}</Typography>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      {b.excerpt}
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {(b.tags || []).map((t) => (
                        <Chip key={t} size="small" label={t} />
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      */}
      {/* Contact CTA Section */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: { xs: 6, md: 8 },
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h5" gutterBottom>
            آماده شروع همکاری هستید؟
          </Typography>
          <Typography sx={{ maxWidth: 700, mx: "auto" }}>
            برای دریافت مشاوره اولیه و بررسی نیازهای کسب‌وکار شما، با ما تماس
            بگیرید یا درخواست خود را ثبت کنید.
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mt: 3 }}
          >
            <Button
              variant="contained"
              sx={{ bgcolor: "white", color: "primary.main" }}
              href="/contact"
            >
              تماس با ما
            </Button>
            <Button variant="outlined" color="inherit" href="/services">
              خدمات
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
