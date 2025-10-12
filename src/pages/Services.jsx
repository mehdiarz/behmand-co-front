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
  Box,
  IconButton,
  Chip,
  Dialog,
  DialogContent,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import {
  Close,
  Analytics,
  Assessment,
  TrendingUp,
  AccountBalance,
  ArrowForward,
  PlayArrow,
  Calculate,
  Receipt,
  ShowChart,
  PieChart,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    title: "حسابرسی صورت‌های مالی",
    desc: "ارزیابی و بررسی صورت‌های مالی بر اساس استانداردهای حسابرسی برای شفافیت و اعتماد بیشتر.",
    detailedDesc:
      "خدمات حسابرسی جامع صورت‌های مالی مطابق با آخرین استانداردهای ملی و بین‌المللی حسابرسی. ما با تیمی متخصص از حسابرسان حرفه‌ای، صورت‌های مالی شما را به دقت بررسی کرده و گزارش‌های تحلیلی ارائه می‌دهیم.",
    img: service1,
    icon: <Analytics sx={{ fontSize: 40 }} />,
    color: "primary",
    features: ["حسابرسی مستقل", "گزارش‌دهی شفاف", "تحلیل ریسک", "مشاوره بهبود"],
    stats: "۱۵+ سال تجربه",
  },
  {
    title: "حسابرسی داخلی",
    desc: "شناسایی ریسک‌ها و بهبود کنترل‌های داخلی سازمان برای افزایش بهره‌وری و کاهش خطا.",
    detailedDesc:
      "ارزیابی سیستم کنترل‌های داخلی و ارائه راهکارهای عملی برای بهبود فرآیندها. تیم متخصص ما با بررسی دقیق فرآیندهای سازمانی، نقاط ضعف را شناسایی و راهکارهای کاربردی ارائه می‌دهد.",
    img: service2,
    icon: <Assessment sx={{ fontSize: 40 }} />,
    color: "secondary",
    features: [
      "کنترل داخلی",
      "مدیریت ریسک",
      "بهبود فرآیند",
      "مشاوره استراتژیک",
    ],
    stats: "۹۵٪ رضایت‌مندی",
  },
  {
    title: "مشاوره مالیاتی",
    desc: "ارائه راهکارهای قانونی برای بهینه‌سازی مالیات و کاهش هزینه‌های غیرضروری.",
    detailedDesc:
      "مشاوره تخصصی در زمینه قوانین مالیاتی و برنامه‌ریزی مالیاتی بهینه. ما با بهره‌گیری از آخرین تغییرات قوانین مالیاتی، بهترین راهکارها را برای کاهش بار مالیاتی شما ارائه می‌دهیم.",
    img: service3,
    icon: <Receipt sx={{ fontSize: 40 }} />,
    color: "success",
    features: [
      "برنامه‌ریزی مالیاتی",
      "مشاوره حقوقی",
      "بهینه‌سازی",
      "پیگیری پرونده",
    ],
    stats: "۳۰٪ صرفه‌جویی",
  },
  {
    title: "مشاوره مالی و سرمایه‌گذاری",
    desc: "کمک به تصمیم‌گیری‌های مالی و سرمایه‌گذاری با تحلیل دقیق و تخصصی.",
    detailedDesc:
      "تحلیل بازارهای مالی و ارائه راهکارهای سرمایه‌گذاری هوشمند. تیم تحلیل‌گران ما با استفاده از آخرین ابزارهای تحلیلی، بهترین فرصت‌های سرمایه‌گذاری را شناسایی می‌کنند.",
    img: service4,
    icon: <TrendingUp sx={{ fontSize: 40 }} />,
    color: "info",
    features: [
      "تحلیل بازار",
      "مدیریت پرتفوی",
      "سرمایه‌گذاری هوشمند",
      "مشاوره استراتژیک",
    ],
    stats: "۲۰٪ بازدهی بیشتر",
  },
];

export default function ModernServices() {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        py: { xs: 6, md: 12 },
        background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
        position: "relative",
        overflow: "hidden",
        mt: 5,
      }}
    >
      {/* Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #66bb6a20, #388e3c10)",
          filter: "blur(40px)",
        }}
      />

      <Container maxWidth="lg">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: "center", mb: 8 }}>
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
                boxShadow: "0 4px 12px rgba(56, 142, 60, 0.3)",
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                color: "text.primary",
                fontSize: { xs: "2.5rem", md: "3rem" },
                mb: 3,
                background: "linear-gradient(135deg, #2e7d32, #66bb6a)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              خدمات حرفه‌ای ما
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.8,
                fontWeight: 400,
                fontSize: { xs: "1rem", md: "1.1rem" },
              }}
            >
              با تکیه بر سال‌ها تجربه و تیمی از متخصصان مجرب، خدمات مالی و
              حسابرسی با بالاترین استانداردهای بین‌المللی ارائه می‌دهیم
            </Typography>
          </Box>
        </motion.div>

        {/* Services Grid */}
        <Grid container spacing={3} justifyContent="center">
          {services.map((service, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              lg={3}
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{ width: "100%", maxWidth: 320 }}
                onHoverStart={() => setHovered(index)}
                onHoverEnd={() => setHovered(null)}
              >
                <Card
                  onClick={() => setSelected(index)}
                  sx={{
                    height: "100%",
                    cursor: "pointer",
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    background:
                      "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                    "&:before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: `linear-gradient(90deg, ${theme.palette[service.color].main}, ${theme.palette[service.color].light})`,
                      transform: "scaleX(0)",
                      transition: "transform 0.4s ease",
                    },
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 24px 48px rgba(0,0,0,0.12)",
                      "&:before": {
                        transform: "scaleX(1)",
                      },
                      "& .service-image": {
                        transform: "scale(1.1)",
                      },
                      "& .service-icon": {
                        transform: "scale(1.1) translateY(-5px)",
                        background: `linear-gradient(135deg, ${theme.palette[service.color].main}30, ${theme.palette[service.color].light}30)`,
                      },
                    },
                  }}
                >
                  {/* Image with Overlay */}
                  <Box
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      height: 160,
                    }}
                  >
                    <Box
                      className="service-image"
                      component="img"
                      src={service.img}
                      alt={service.title}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.6s ease",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(135deg, ${theme.palette[service.color].main}40, ${theme.palette[service.color].dark}40)`,
                      }}
                    />

                    {/* Icon */}
                    <Box
                      className="service-icon"
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        width: 60,
                        height: 60,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `linear-gradient(135deg, ${theme.palette[service.color].main}20, ${theme.palette[service.color].light}20)`,
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${theme.palette[service.color].main}30`,
                        color: theme.palette[service.color].main,
                        transition: "all 0.4s ease",
                      }}
                    >
                      {service.icon}
                    </Box>

                    {/* Stats Chip */}
                    <Chip
                      label={service.stats}
                      size="small"
                      sx={{
                        position: "absolute",
                        bottom: 16,
                        left: 16,
                        background: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(10px)",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    />
                  </Box>

                  <CardContent
                    sx={{
                      p: 3,
                      height: 180,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                        fontWeight: 700,
                        color: "text.primary",
                        fontSize: "1.1rem",
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        lineHeight: 1.7,
                        flexGrow: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {service.desc}
                    </Typography>

                    {/* CTA */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: "auto",
                        pt: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: `${service.color}.main`,
                          fontWeight: 600,
                          fontSize: "0.9rem",
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
                            transform:
                              hovered === index ? "translateX(-3px)" : "none",
                          }}
                        />
                      </Box>

                      {/* Features Preview */}
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        {service.features.slice(0, 2).map((feature, i) => (
                          <Chip
                            key={i}
                            label={feature}
                            size="small"
                            variant="outlined"
                            sx={{
                              height: 24,
                              fontSize: "0.7rem",
                              borderColor: `${service.color}.main}30`,
                              color: `${service.color}.main`,
                              background: `${service.color}.main}08`,
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Modern Modal */}
      <Dialog
        open={selected !== null}
        onClose={() => setSelected(null)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
            overflow: "hidden",
          },
        }}
      >
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <DialogContent sx={{ p: 0 }}>
                <Box sx={{ position: "relative" }}>
                  {/* Header Image */}
                  <Box
                    sx={{
                      position: "relative",
                      height: 300,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      component="img"
                      src={services[selected].img}
                      alt={services[selected].title}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(135deg, ${theme.palette[services[selected].color].main}60, ${theme.palette[services[selected].color].dark}60)`,
                      }}
                    />

                    {/* Close Button */}
                    <IconButton
                      onClick={() => setSelected(null)}
                      sx={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        background: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(10px)",
                        "&:hover": {
                          background: "rgba(255,255,255,1)",
                        },
                      }}
                    >
                      <Close />
                    </IconButton>

                    {/* Title Overlay */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 4,
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          color: "white",
                          fontWeight: 900,
                          fontSize: { xs: "2rem", md: "2.5rem" },
                          textShadow: "0 4px 12px rgba(0,0,0,0.3)",
                        }}
                      >
                        {services[selected].title}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Content */}
                  <Box sx={{ p: 4 }}>
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={8}>
                        <Typography
                          variant="h6"
                          sx={{
                            mb: 3,
                            color: "text.primary",
                            lineHeight: 1.8,
                            fontSize: "1.1rem",
                          }}
                        >
                          {services[selected].detailedDesc}
                        </Typography>

                        {/* Features */}
                        <Box sx={{ mb: 4 }}>
                          <Typography
                            variant="h6"
                            sx={{ mb: 2, fontWeight: 700 }}
                          >
                            ویژگی‌های خدمت
                          </Typography>
                          <Grid container spacing={2}>
                            {services[selected].features.map(
                              (feature, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                    }}
                                  >
                                    <PlayArrow
                                      sx={{
                                        fontSize: 16,
                                        color: `${services[selected].color}.main`,
                                      }}
                                    />
                                    <Typography variant="body2">
                                      {feature}
                                    </Typography>
                                  </Box>
                                </Grid>
                              ),
                            )}
                          </Grid>
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Box
                          sx={{
                            p: 3,
                            borderRadius: 3,
                            background: `linear-gradient(135deg, ${theme.palette[services[selected].color].main}10, ${theme.palette[services[selected].color].light}10)`,
                            border: `1px solid ${theme.palette[services[selected].color].main}20`,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ mb: 2, fontWeight: 700 }}
                          >
                            آمار و ارقام
                          </Typography>
                          <Chip
                            label={services[selected].stats}
                            sx={{
                              background: `linear-gradient(135deg, ${theme.palette[services[selected].color].main}, ${theme.palette[services[selected].color].light})`,
                              color: "white",
                              fontWeight: 700,
                              fontSize: "1rem",
                              px: 2,
                              py: 1,
                            }}
                          />

                          <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            endIcon={<ArrowForward />}
                            sx={{
                              mt: 3,
                              background: `linear-gradient(135deg, ${theme.palette[services[selected].color].main}, ${theme.palette[services[selected].color].light})`,
                              borderRadius: 2,
                              py: 1.5,
                              fontWeight: 700,
                              "&:hover": {
                                transform: "translateY(-2px)",
                                boxShadow: `0 8px 24px ${theme.palette[services[selected].color].main}40`,
                              },
                              transition: "all 0.3s ease",
                            }}
                          >
                            درخواست مشاوره
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </DialogContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Dialog>
    </Box>
  );
}
