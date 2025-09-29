import React, { useState } from "react";
import service1 from "../assets/services1.jpeg";
import service2 from "../assets/services2.jpeg";
import service3 from "../assets/services3.jpeg";
import service4 from "../assets/services4.jpeg";

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    title: "حسابرسی صورت‌های مالی",
    desc: "ارزیابی و بررسی صورت‌های مالی بر اساس استانداردهای حسابرسی برای شفافیت و اعتماد بیشتر.",
    img: service1,
  },
  {
    title: "حسابرسی داخلی",
    desc: "شناسایی ریسک‌ها و بهبود کنترل‌های داخلی سازمان برای افزایش بهره‌وری و کاهش خطا.",
    img: service2,
  },
  {
    title: "مشاوره مالیاتی",
    desc: "ارائه راهکارهای قانونی برای بهینه‌سازی مالیات و کاهش هزینه‌های غیرضروری.",
    img: service3,
  },
  {
    title: "مشاوره مالی و سرمایه‌گذاری",
    desc: "کمک به تصمیم‌گیری‌های مالی و سرمایه‌گذاری با تحلیل دقیق و تخصصی.",
    img: service4,
  },
];

export default function Services() {
  const [selected, setSelected] = useState(null);

  return (
    <Container sx={{ py: 8, mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        خدمات ما
      </Typography>
      <Typography
        align="center"
        color="text.secondary"
        sx={{ mb: 6, maxWidth: 700, mx: "auto" }}
      >
        موسسه بهمند مجموعه‌ای کامل از خدمات حسابرسی، مالیاتی و مشاوره‌ای را برای
        سازمان‌ها و کسب‌وکارها ارائه می‌دهد.
      </Typography>

      <Grid container spacing={4} alignItems="stretch">
        {services.map((s, i) => (
          <Grid item xs={12} sm={6} md={3} key={i} sx={{ width: 500, height: 300 }}>
            <motion.div
              layout
              onClick={() => setSelected(i)}
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              style={{ height: "100%", cursor: "pointer" }}
            >
              <Card
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 3,
                  transition: "0.3s",
                }}
              >
                <CardMedia
                  component="img"
                  image={s.img}
                  alt={s.title}
                  sx={{
                    height: 180,
                    objectFit: "cover",
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom noWrap>
                    {s.title}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {s.desc}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* نمایش کارت انتخاب‌شده به صورت بزرگ */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "100%",
              height: "100%",
              background: "rgba(255,255,255,0.95)",
              zIndex: 1300,
              overflowY: "auto",
            }}
          >
            <Box sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
              <IconButton
                onClick={() => setSelected(null)}
                sx={{ position: "absolute", top: 16, right: 16 }}
              >
                <CloseIcon />
              </IconButton>
              <img
                src={services[selected].img}
                alt={services[selected].title}
                style={{
                  width: "100%",
                  maxHeight: 400,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
              <Typography variant="h4" sx={{ mt: 3 }}>
                {services[selected].title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                {services[selected].desc}
                <br />
                اینجا می‌تونی توضیحات کامل‌تر و جزئیات بیشتری درباره این خدمت
                بنویسی.
              </Typography>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
}
