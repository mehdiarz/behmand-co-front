import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Chip,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import AboutSlider from "../slider/AboutSlider.jsx";

import about1 from "../../assets/about1.jpg";
import about2 from "../../assets/about2.jpeg";
import about3 from "../../assets/about3.jpeg";
import about4 from "../../assets/about4.jpeg";
import about5 from "../../assets/about5.jpeg";

const tabs = [
  {
    key: "audit",
    label: "حسابرسی مستقل",
    text: "حسابرسی مستقل به معنای بررسی دقیق و بی‌طرفانه صورت‌های مالی شرکت‌هاست. در این فرآیند، تیم حسابرسی با استفاده از استانداردهای بین‌المللی و تجربه عملی، تمامی اسناد مالی، دفاتر و گزارش‌ها را تحلیل می‌کند تا از صحت و شفافیت اطلاعات اطمینان حاصل شود. هدف اصلی این خدمت، ایجاد اعتماد برای سهامداران، مدیران و نهادهای نظارتی است تا بتوانند بر اساس داده‌های واقعی تصمیم‌گیری کنند.",
  },
  {
    key: "consulting",
    label: "مشاوره مالی",
    text: "مشاوره مالی شامل ارائه راهکارهای تخصصی برای مدیریت بهینه منابع مالی، سرمایه‌گذاری‌های هوشمندانه و بهبود جریان نقدی سازمان است. مشاوران مالی ما با بررسی وضعیت فعلی شرکت، نقاط قوت و ضعف را شناسایی کرده و استراتژی‌هایی برای افزایش سودآوری، کاهش هزینه‌ها و مدیریت ریسک‌های مالی پیشنهاد می‌دهند. این خدمات به مدیران کمک می‌کند تا تصمیمات کلان اقتصادی خود را با اطمینان بیشتری اتخاذ کنند.",
  },
  {
    key: "tax",
    label: "خدمات مالیاتی",
    text: "خدمات مالیاتی به شرکت‌ها کمک می‌کند تا ضمن رعایت کامل قوانین و مقررات مالیاتی، از فرصت‌های قانونی برای کاهش بار مالیاتی خود استفاده کنند. این خدمات شامل تهیه و تنظیم اظهارنامه‌های مالیاتی، مشاوره در زمینه معافیت‌ها و بخشودگی‌ها، و همچنین دفاع از حقوق شرکت در برابر سازمان امور مالیاتی است. هدف ما کاهش ریسک‌های مالیاتی و بهینه‌سازی هزینه‌ها در چارچوب قوانین جاری کشور است.",
  },
];

const stats = [
  { num: 15, suffix: "+", text: "سال تجربه" },
  { num: 250, suffix: "+", text: "پروژه موفق" },
  { num: 100, suffix: "+", text: "مشتری فعال" },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("audit");
  const [counters, setCounters] = useState(stats.map(() => 0));

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
    });
  }, []);

  const activeContent = tabs.find((t) => t.key === activeTab);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      sx={{ py: { xs: 10, md: 16 } }} // 👈 ارتفاع بیشتر
    >
      <Container>
        <Grid container spacing={8} alignItems="center">
          {/* متن */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom fontWeight={700}>
              درباره بهمند
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              {tabs.map((t) => (
                <Chip
                  key={t.key}
                  label={t.label}
                  clickable
                  onClick={() => setActiveTab(t.key)}
                  sx={{
                    bgcolor:
                      activeTab === t.key ? "success.main" : "warning.main",
                    color: "#fff",
                    fontWeight: 600,
                  }}
                />
              ))}
            </Stack>

            <Typography sx={{ mb: 4 }}>{activeContent.text}</Typography>

            <Grid
              container
              spacing={4}
              justifyContent="center"
              sx={{ textAlign: "center", mb: 4 }}
            >
              {stats.map((s, i) => (
                <Grid item xs={4} key={i}>
                  <Typography
                    variant="h3"
                    fontWeight={700}
                    color="success.light"
                  >
                    {counters[i]}
                    {s.suffix}
                  </Typography>
                  <Typography variant="subtitle1">{s.text}</Typography>
                </Grid>
              ))}
            </Grid>

            <Button
              variant="contained"
              color="success"
              size="large"
              href="/about"
            >
              بیشتر بدانید
            </Button>
          </Grid>
        </Grid>

        {/* اسلایدر */}
        <Grid item xs={12} md={6} sx={{ mt: 5 }}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: 6,
              width: { xs: 300, md: 1000 },
              height: { xs: 200, md: 400 },
              maxWidth: { xs: "100%" }, // 👈 عریض‌تر در دسکتاپ
              mx: "auto",
              aspectRatio: "16/9",
            }}
          >
            <AboutSlider images={[about1, about2, about3, about4, about5]} />
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
