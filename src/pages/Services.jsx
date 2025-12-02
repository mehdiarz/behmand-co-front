import React, { useState } from "react";
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
  Stack,
} from "@mui/material";
import {
  Close,
  Analytics,
  Assessment,
  AccountBalance,
  ArrowForward,
  PlayArrow,
  Calculate,
  Balance,
  Gavel,
  TrendingUp,
  ReceiptLong,
  SupervisorAccount,
  MonetizationOn,
  PriceCheck,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import dakheli from "../assets/dakheli.png";
import arzyabi from "../assets/arzyabii.png";
import davari from "../assets/davari.png";
import tasfie from "../assets/tasfie.png";
import maliat from "../assets/maliat.png";
import hesabdari from "../assets/hesabdari.png";
import bazresi from "../assets/bazresi.png";
import moshavere from "../assets/moshavere.png";

// استفاده از عکس‌های placeholder با کیفیت از Unsplash
const serviceImages = {
  audit: hesabdari,
  // "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  internalAudit: dakheli,
  // "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  tax: maliat,
  // "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  legalInspection: bazresi,
  // "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  financialConsulting: moshavere,
  // "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  liquidation: tasfie,
  // "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  arbitration: davari,
  // "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  valuation: arzyabi,
  // "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
};

export default function ServicesPage() {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const navigate = useNavigate();

  const services = [
    {
      id: "audit",
      title: t("services.audit.title"),
      desc: t("services.audit.desc"),
      detailedDesc: t("services.audit.fullDesc"),
      img: serviceImages.audit,
      icon: <Analytics sx={{ fontSize: 40 }} />,
      color: "primary",
      features: [
        language === "fa"
          ? "حسابرسی مستقل صورت‌های مالی"
          : "Independent Financial Statement Audit",
        language === "fa"
          ? "حسابرسی عملیاتی و عملکرد"
          : "Operational and Performance Audit",
        language === "fa" ? "حسابرسی مالیاتی" : "Tax Audit",
        language === "fa"
          ? "حسابرسی داخلی و کنترل‌ها"
          : "Internal Audit and Controls",
        language === "fa" ? "حسابرسی بیمه‌ای" : "Insurance Audit",
        language === "fa" ? "حسابرسی خاص و ویژه" : "Special Audits",
      ],
      stats:
        language === "fa"
          ? " ۴۶+ سال تجربه و بیش از ۱۰۰ کارشناس خبره"
          : "Over 46 years of experience and more than 100 expert professionals",
    },
    {
      id: "internalAudit",
      title: t("services.internalAudit.title"),
      desc: t("services.internalAudit.desc"),
      detailedDesc: t("services.internalAudit.fullDesc"),
      img: serviceImages.internalAudit,
      icon: <Assessment sx={{ fontSize: 40 }} />,
      color: "secondary",
      features: [
        language === "fa"
          ? "ارزیابی کنترل‌های داخلی"
          : "Internal Controls Evaluation",
        language === "fa" ? "مطالعه و تحلیل ریسک" : "Risk Analysis and Study",
        language === "fa"
          ? "گزارش‌دهی به کمیته حسابرسی"
          : "Reporting to Audit Committee",
        language === "fa"
          ? "مشاوره بهبود فرآیندها"
          : "Process Improvement Consulting",
        language === "fa"
          ? "نظارت بر اجرای توصیه‌ها"
          : "Recommendation Implementation Monitoring",
        language === "fa"
          ? "آموزش و توسعه کارکنان"
          : "Staff Training and Development",
      ],
      stats:
        language === "fa"
          ? "تخصص در استانداردهای داخلی و بین‌المللی"
          : "Expertise in domestic and international standards",
    },
    {
      id: "tax",
      title: t("services.tax.title"),
      desc: t("services.tax.desc"),
      detailedDesc: t("services.tax.fullDesc"),
      img: serviceImages.tax,
      icon: <Calculate sx={{ fontSize: 40 }} />,
      color: "success",
      features: [
        language === "fa"
          ? "برنامه‌ریزی و مشاوره مالیاتی"
          : "Tax Planning and Consultation",
        language === "fa"
          ? "تهیه و تنظیم اظهارنامه‌ها"
          : "Tax Return Preparation",
        language === "fa"
          ? "دفاعیه و حل اختلاف مالیاتی"
          : "Tax Dispute Resolution",
        language === "fa"
          ? "بهینه‌سازی ساختار مالیاتی"
          : "Tax Structure Optimization",
        language === "fa"
          ? "مطالعه و پیگیری قوانین"
          : "Law Study and Follow-up",
        language === "fa"
          ? "مشاوره مالیاتی بین‌المللی"
          : "International Tax Consulting",
      ],
      stats:
        language === "fa"
          ? "بیش از ۱۰۰ کارشناس خبره"
          : "more than 100 expert professionals",
    },
    {
      id: "legalInspection",
      title: t("services.legalInspection.title"),
      desc: t("services.legalInspection.desc"),
      detailedDesc: t("services.legalInspection.fullDesc"),
      img: serviceImages.legalInspection,
      icon: <Balance sx={{ fontSize: 40 }} />,
      color: "info",
      features: [
        language === "fa"
          ? "بازرسی قانونی شرکت‌ها"
          : "Legal Inspection of Companies",
        language === "fa"
          ? "حفظ حقوق سهامداران"
          : "Shareholders Rights Protection",
        language === "fa"
          ? "گزارش‌دهی شفاف و بی‌طرف"
          : "Transparent and Impartial Reporting",
        language === "fa"
          ? "تحلیل نقاط قوت و ضعف مالی"
          : "Financial SWOT Analysis",
        language === "fa"
          ? "نظارت بر تصمیمات هیئت مدیره"
          : "Board Decisions Monitoring",
        language === "fa" ? "ارزیابی ریسک‌های حقوقی" : "Legal Risk Assessment",
      ],
      stats:
        language === "fa" ? "دارای تجربه از سال ۱۳۵۸" : "Experience Since 1979",
    },
    {
      id: "financialConsulting",
      title: t("services.financialConsulting.title"),
      desc: t("services.financialConsulting.desc"),
      detailedDesc: t("services.financialConsulting.fullDesc"),
      img: serviceImages.financialConsulting,
      icon: <MonetizationOn sx={{ fontSize: 40 }} />,
      color: "warning",
      features: [
        language === "fa"
          ? "تحلیل وضعیت مالی سازمان"
          : "Organization Financial Analysis",
        language === "fa"
          ? "طراحی استراتژی سرمایه‌گذاری"
          : "Investment Strategy Design",
        language === "fa" ? "مدیریت جریان نقدی" : "Cash Flow Management",
        language === "fa"
          ? "بهینه‌سازی ساختار سرمایه"
          : "Capital Structure Optimization",
        language === "fa"
          ? "برنامه‌ریزی مالی استراتژیک"
          : "Strategic Financial Planning",
        language === "fa"
          ? "مشاوره ادغام و تملیک"
          : "Merger and Acquisition Consulting",
      ],
      stats:
        language === "fa"
          ? "مشاوره تخصصی مالی"
          : "Specialized Financial Consulting",
    },
    {
      id: "liquidation",
      title: t("services.liquidation.title"),
      desc: t("services.liquidation.desc"),
      detailedDesc: t("services.liquidation.fullDesc"),
      img: serviceImages.liquidation,
      icon: <Gavel sx={{ fontSize: 40 }} />,
      color: "error",
      features: [
        language === "fa"
          ? "نظارت بر عملکرد مدیران تصفیه"
          : "Supervision of Liquidation Managers",
        language === "fa"
          ? "بررسی اسناد و قراردادها"
          : "Document and Contract Review",
        language === "fa"
          ? "گزارش‌دهی به مجمع عمومی"
          : "Reporting to General Assembly",
        language === "fa"
          ? "حفظ حقوق ذی‌نفعان"
          : "Stakeholders Rights Protection",
        language === "fa"
          ? "نظارت بر فروش دارایی‌ها"
          : "Asset Sale Supervision",
        language === "fa"
          ? "تسویه بدهی‌ها و تعهدات"
          : "Debt and Obligation Settlement",
      ],
      stats:
        language === "fa"
          ? "تخصص در حقوق تجارت"
          : "Expertise in Commercial Law",
    },
    {
      id: "arbitration",
      title: t("services.arbitration.title"),
      desc: t("services.arbitration.desc"),
      detailedDesc: t("services.arbitration.fullDesc"),
      img: serviceImages.arbitration,
      icon: <SupervisorAccount sx={{ fontSize: 40 }} />,
      color: "primary",
      features: [
        language === "fa"
          ? "حل اختلافات مالی و قراردادی"
          : "Financial and Contractual Dispute Resolution",
        language === "fa"
          ? "داوری تخصصی و بی‌طرف"
          : "Specialized and Impartial Arbitration",
        language === "fa"
          ? "سرعت در رسیدگی و صدور رأی"
          : "Fast Processing and Ruling",
        language === "fa"
          ? "کمینه‌سازی اختلال کسب‌وکار"
          : "Business Disruption Minimization",
        language === "fa" ? "محرمانگی اطلاعات" : "Information Confidentiality",
        language === "fa"
          ? "کاهش هزینه‌های دادرسی"
          : "Litigation Cost Reduction",
      ],
      stats:
        language === "fa"
          ? "روش جایگزین حل اختلاف"
          : "Alternative Dispute Resolution",
    },
    {
      id: "valuation",
      title: t("services.valuation.title"),
      desc: t("services.valuation.desc"),
      detailedDesc: t("services.valuation.fullDesc"),
      img: serviceImages.valuation,
      icon: <PriceCheck sx={{ fontSize: 40 }} />,
      color: "success",
      features: [
        language === "fa"
          ? "ارزش‌گذاری سهام و شرکت‌ها"
          : "Stock and Company Valuation",
        language === "fa"
          ? "تحلیل مالی و اقتصادی"
          : "Financial and Economic Analysis",
        language === "fa"
          ? "گزارش‌دهی مستند و شفاف"
          : "Documented and Transparent Reporting",
        language === "fa"
          ? "پشتیبانی از معاملات و ادغام"
          : "Transaction and Merger Support",
        language === "fa"
          ? "ارزش‌گذاری دارایی‌های نامشهود"
          : "Intangible Asset Valuation",
        language === "fa"
          ? "تحلیل بازار و رقبا"
          : "Market and Competitor Analysis",
      ],
      stats:
        language === "fa"
          ? "ارزش‌گذاری مبتنی بر استاندارد"
          : "Standard-Based Valuation",
    },
  ];

  const handleConsultationRequest = () => {
    setSelected(null);
    navigate("/contact");
  };

  return (
    <Box
      sx={{
        py: { xs: 6, md: 12 },
        background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
        position: "relative",
        overflow: "hidden",
        mt: 5,
        minHeight: "100vh",
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

      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Chip
              label={t("servicesPage.chip")}
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
              {t("servicesPage.title")}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                maxWidth: 800,
                mx: "auto",
                lineHeight: 1.8,
                fontWeight: 400,
                fontSize: { xs: "1rem", md: "1.1rem" },
              }}
            >
              {t("servicesPage.subtitle")}
            </Typography>
          </Box>
        </motion.div>

        {/* Services Grid */}
        <Grid container spacing={4} justifyContent="center">
          {services.map((service, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              lg={4}
              xl={3}
              key={service.id}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{ width: "100%", maxWidth: 400 }}
                onHoverStart={() => setHovered(index)}
                onHoverEnd={() => setHovered(null)}
              >
                <Card
                  onClick={() => setSelected(index)}
                  sx={{
                    height: "100%",
                    minHeight: 480,
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
                    display: "flex",
                    flexDirection: "column",
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
                      height: 200,
                      flexShrink: 0,
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
                        width: 70,
                        height: 70,
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
                        height: 28,
                      }}
                    />
                  </Box>

                  <CardContent
                    sx={{
                      p: 3,
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: "text.primary",
                        fontSize: "1.3rem",
                        lineHeight: 1.3,
                        minHeight: "3.2em",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {service.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: "text.secondary",
                        lineHeight: 1.6,
                        flexGrow: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        fontSize: "0.95rem",
                      }}
                    >
                      {service.desc}
                    </Typography>

                    {/* Features Preview */}
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        mt: "auto",
                      }}
                    >
                      {service.features.slice(0, 3).map((feature, i) => (
                        <Chip
                          key={i}
                          label={feature}
                          size="small"
                          variant="outlined"
                          sx={{
                            height: 28,
                            fontSize: "0.75rem",
                            borderColor: `${service.color}.main}30`,
                            color: `${service.color}.main`,
                            background: `${service.color}.main}08`,
                            "& .MuiChip-label": {
                              px: 1.5,
                              py: 0.5,
                            },
                          }}
                        />
                      ))}
                      {service.features.length > 3 && (
                        <Chip
                          label={`+${service.features.length - 3}`}
                          size="small"
                          sx={{
                            height: 28,
                            fontSize: "0.75rem",
                            background: `linear-gradient(135deg, ${theme.palette[service.color].main}, ${theme.palette[service.color].light})`,
                            color: "white",
                            fontWeight: 600,
                          }}
                        />
                      )}
                    </Box>

                    {/* CTA */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: 2,
                        pt: 2,
                        borderTop: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: `${service.color}.main`,
                          fontWeight: 600,
                          fontSize: "0.95rem",
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {language === "fa" ? "اطلاعات بیشتر" : "More Info"}
                        </Typography>
                        <ArrowForward
                          sx={{
                            fontSize: 20,
                            mr: 1,
                            transition: "transform 0.3s ease",
                            transform:
                              hovered === index ? "translateX(-3px)" : "none",
                          }}
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Fixed Modern Modal */}
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
            maxHeight: "90vh",
            m: 2,
            display: "flex",
            flexDirection: "column",
          },
        }}
        scroll="paper"
      >
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <DialogContent
                sx={{
                  p: 0,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "#f1f1f1",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#c1c1c1",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: "#a8a8a8",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    overflow: "hidden",
                  }}
                >
                  {/* Header Image - Fixed */}
                  <Box
                    sx={{
                      position: "relative",
                      height: 300,
                      overflow: "hidden",
                      flexShrink: 0,
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
                        background:
                          "linear-gradient(transparent, rgba(0,0,0,0.7))",
                      }}
                    >
                      <Typography
                        variant="h2"
                        sx={{
                          color: "white",
                          fontWeight: 900,
                          fontSize: { xs: "1.8rem", md: "2.2rem" },
                          textShadow: "0 4px 12px rgba(0,0,0,0.3)",
                          lineHeight: 1.2,
                        }}
                      >
                        {services[selected].title}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Scrollable Content */}
                  <Box
                    sx={{
                      flex: 1,
                      overflow: "auto",
                      p: 4,
                    }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={8}>
                        <Typography
                          variant="h6"
                          sx={{
                            mb: 3,
                            color: "text.primary",
                            lineHeight: 1.8,
                            fontSize: "1.1rem",
                            textAlign: language === "fa" ? "justify" : "left",
                          }}
                        >
                          {services[selected].detailedDesc}
                        </Typography>

                        {/* Features */}
                        <Box sx={{ mb: 4 }}>
                          <Typography
                            variant="h5"
                            sx={{
                              mb: 3,
                              fontWeight: 700,
                              color: "primary.main",
                            }}
                          >
                            {language === "fa"
                              ? "ویژگی‌های خدمت"
                              : "Service Features"}
                          </Typography>
                          <Grid container spacing={2}>
                            {services[selected].features.map(
                              (feature, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "flex-start",
                                      gap: 2,
                                      p: 1.5,
                                      borderRadius: 2,
                                      background: `linear-gradient(135deg, ${theme.palette[services[selected].color].main}08, ${theme.palette[services[selected].color].light}08)`,
                                      border: `1px solid ${theme.palette[services[selected].color].main}20`,
                                    }}
                                  >
                                    <PlayArrow
                                      sx={{
                                        fontSize: 20,
                                        color: `${services[selected].color}.main`,
                                        mt: 0.25,
                                        flexShrink: 0,
                                      }}
                                    />
                                    <Typography
                                      variant="body1"
                                      sx={{ lineHeight: 1.6 }}
                                    >
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
                            variant="h5"
                            sx={{
                              mb: 3,
                              fontWeight: 700,
                              color: "primary.main",
                            }}
                          >
                            {language === "fa"
                              ? "مشخصات خدمت"
                              : "Service Details"}
                          </Typography>

                          <Chip
                            label={services[selected].stats}
                            sx={{
                              background: `linear-gradient(135deg, ${theme.palette[services[selected].color].main}, ${theme.palette[services[selected].color].light})`,
                              color: "white",
                              fontWeight: 700,
                              fontSize: "1rem",
                              px: 3,
                              py: 1.5,
                              mb: 3,
                              width: "100%",
                              justifyContent: "center",
                            }}
                          />

                          <Stack spacing={2}>
                            <Button
                              variant="contained"
                              fullWidth
                              size="large"
                              endIcon={<ArrowForward />}
                              onClick={handleConsultationRequest}
                              sx={{
                                background: `linear-gradient(135deg, ${theme.palette[services[selected].color].main}, ${theme.palette[services[selected].color].light})`,
                                borderRadius: 2,
                                py: 1.5,
                                fontWeight: 700,
                                fontSize: "1rem",
                                "&:hover": {
                                  transform: "translateY(-2px)",
                                  boxShadow: `0 8px 24px ${theme.palette[services[selected].color].main}40`,
                                },
                                transition: "all 0.3s ease",
                              }}
                            >
                              {language === "fa"
                                ? "درخواست مشاوره"
                                : "Request  Consultation"}
                            </Button>

                            <Button
                              variant="outlined"
                              fullWidth
                              size="large"
                              onClick={() => setSelected(null)}
                              sx={{
                                borderRadius: 2,
                                py: 1.5,
                                fontWeight: 700,
                                fontSize: "1rem",
                                borderColor: `${services[selected].color}.main`,
                                color: `${services[selected].color}.main`,
                                "&:hover": {
                                  borderColor: `${services[selected].color}.dark`,
                                  backgroundColor: `${services[selected].color}.main}08`,
                                  transform: "translateY(-1px)",
                                },
                                transition: "all 0.3s ease",
                              }}
                            >
                              {language === "fa"
                                ? "بازگشت به خدمات"
                                : "Back to Services"}
                            </Button>
                          </Stack>
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
