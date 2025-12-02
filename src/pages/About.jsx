import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

import Grid from "@mui/material/Grid";

import asghar from "../assets/asghar-hooshii.png";
import atash from "../assets/atash.jpg";
import sharifi from "../assets/sharifi.png";
import arezoomand from "../assets/arezoomand.png";
import emami from "../assets/emami.png";
import hooman from "../assets/hooman.png";
import mashreghi from "../assets/mashreghi.png";
import rastegari from "../assets/rastegari.png";
import delpak from "../assets/delpak.png";
import rahmanian from "../assets/rahmanian.png";
import rahmati from "../assets/rahmati.png";

import OrganizationalChart from "../components/OrganizationalChart";
import ResumeDownloadSection from "../components/ResumeDownloadSection.jsx";

// تیم ممبرز کامل دو زبانه
const teamMembers = [
  {
    name: {
      fa: "رضا آتش",
      en: "Reza Atash",
    },
    role: {
      fa: "شریک و عضو هیات مدیره",
      en: "Partner and Board Member",
    },
    avatar: atash,
    details: {
      fa: `🎓 مدارک تحصیلی:
- کارشناسی حسابداری از مدرسه عالی علوم اقتصادی و اجتماعی بابلسر درسال ۱۳۵۳

💼 سوابق کاری:
- حسابرسی در مؤسسه حسابرسی طوس (۱۰ ماه)
- حسابرسی در مؤسسه حسابرسی دقیق (۵ سال، سرپرست ارشد)
- حسابرسی در مؤسسه حسابرسی بهمند از سال ۱۳۵۸ (شریک و عضو هیات مدیره)

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران`,
      en: `🎓 Education:
- Bachelor of Accounting from Babolsar School of Higher Economic and Social Sciences (1974)

💼 Professional Experience:
- Auditor at Tous Audit Firm (10 months)
- Auditor at Daghigh Audit Firm (5 years, Senior Supervisor)
- Auditor at Behmand Audit Firm since 1979 (Partner and Board Member)

👥 Professional Memberships:
- Certified Public Accountant - Member of Iranian Association of Certified Public Accountants
- Independent Accountant - Member of Iranian Association of Chartered Accountants`,
    },
  },
  {
    name: {
      fa: "علی مشرقی",
      en: "Ali Mashreghi",
    },
    role: {
      fa: "شریک و عضو هیات مدیره",
      en: "Partner and Board Member",
    },
    avatar: mashreghi,
    details: {
      fa: `🎓 مدارک تحصیلی:
- کارشناسی حسابداری از مدرسه عالی بازرگانی در سال ۱۳۵۷

💼 سوابق کاری:
- حسابرسی در مؤسسه حسابرسی دقیق (۳.۵ سال، سرپرست)
- حسابرسی در مؤسسه حسابرسی بهمند از سال ۱۳۵۸ (شریک و عضو هیات مدیره)

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران
- عضویت در کارگروه های تخصصی قوانین و مقررات، بورس، بیمه و بانک جامعه حسابداران رسمی ایران
- عضو بند ۳ ماده ۲۴۴ هیات حل اختلاف مالیاتی قانون مالیات های مستقیم`,
      en: `🎓 Education:
- Bachelor of Accounting from Higher School of Commerce (1978)

💼 Professional Experience:
- Auditor at Daghigh Audit Firm (3.5 years, Supervisor)
- Auditor at Behmand Audit Firm since 1979 (Partner and Board Member)

👥 Professional Memberships:
- Certified Public Accountant - Member of Iranian Association of Certified Public Accountants
- Independent Accountant - Member of Iranian Association of Chartered Accountants
- Member of specialized working groups for Regulations, Stock Exchange, Insurance, and Banking at Iranian Association of Certified Public Accountants
- Member of Article 244, Clause 3 of Direct Tax Law Dispute Resolution Board`,
    },
  },
  {
    name: {
      fa: "هومن هشی",
      en: "Hooman Hoshi",
    },
    role: {
      fa: "شریک و عضو هیات مدیره",
      en: "Partner and Board Member",
    },
    avatar: hooman,
    details: {
      fa: `🎓 مدارک تحصیلی:
- کارشناسی حسابداری از دانشکده امور اقتصادی و دارائی در سال ۱۳۷۸
- کارشناسی ارشد حسابداری از دانشگاه شهید بهشتی در سال ۱۳۸۱

💼 سوابق کاری:
- حسابرسی در مؤسسه حسابرسی بهمند از سال ۱۳۷۳ (شریک و عضو هیات مدیره)

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران
- عضو انجمن حسابداری ایران
- عضو انجمن حسابرسان داخلی ایران
- عضو بند ۳ ماده ۲۴۴ هیات حل اختلاف مالیاتی قانون مالیات های مستقیم
- دانشجوی دوره ACCA`,
      en: `🎓 Education:
- Bachelor of Accounting from Faculty of Economics and Finance (1999)
- Master of Accounting from Shahid Beheshti University (2002)

💼 Professional Experience:
- Auditor at Behmand Audit Firm since 1994 (Partner and Board Member)

👥 Professional Memberships:
- Certified Public Accountant - Member of Iranian Association of Certified Public Accountants
- Independent Accountant - Member of Iranian Association of Chartered Accountants
- Member of Iranian Accounting Association
- Member of Iranian Internal Auditors Association
- Member of Article 244, Clause 3 of Direct Tax Law Dispute Resolution Board
- ACCA Student`,
    },
  },
  {
    name: {
      fa: "محمد رضا آرزومند",
      en: "Mohammad Reza Arezoomand",
    },
    role: {
      fa: "شریک و عضو هیات مدیره",
      en: "Partner and Board Member",
    },
    avatar: arezoomand,
    details: {
      fa: `🎓 مدارک تحصیلی:
- کارشناسی حسابداری از دانشگاه شهید بهشتی در سال ۱۳۷۴

💼 سوابق کاری:
- حسابرسی در مؤسسه حسابرسی بهمند از سال ۱۳۷۱ (شریک و عضو هیات مدیره)

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران`,
      en: `🎓 Education:
- Bachelor of Accounting from Shahid Beheshti University (1995)

💼 Professional Experience:
- Auditor at Behmand Audit Firm since 1992 (Partner and Board Member)

👥 Professional Memberships:
- Certified Public Accountant - Member of Iranian Association of Certified Public Accountants
- Independent Accountant - Member of Iranian Association of Chartered Accountants`,
    },
  },
  {
    name: {
      fa: "احمد رضا شریفی",
      en: "Ahmad Reza Sharifi",
    },
    role: {
      fa: "شریک و عضو هیات مدیره",
      en: "Partner and Board Member",
    },
    avatar: sharifi,
    details: {
      fa: `🎓 مدارک تحصیلی:
- کارشناسی حسابداری از دانشگاه آزاد اسلامی در سال ۱۳۷۶

💼 سوابق کاری:
- حسابرسی در مؤسسه حسابرسی بهمند از سال ۱۳۷۸ (شریک و عضو هیات مدیره)

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران
- عضو انجمن حسابداری ایران
- عضو انجمن حسابرسان داخلی ایران`,
      en: `🎓 Education:
- Bachelor of Accounting from Islamic Azad University (1997)

💼 Professional Experience:
- Auditor at Behmand Audit Firm since 1999 (Partner and Board Member)

👥 Professional Memberships:
- Certified Public Accountant - Member of Iranian Association of Certified Public Accountants
- Independent Accountant - Member of Iranian Association of Chartered Accountants
- Member of Iranian Accounting Association
- Member of Iranian Internal Auditors Association`,
    },
  },
  {
    name: {
      fa: "نادر رستگاری",
      en: "Nader Rastegari",
    },
    role: {
      fa: "شریک و عضو هیات مدیره",
      en: "Partner and Board Member",
    },
    avatar: rastegari,
    details: {
      fa: `🎓 مدارک تحصیلی:
- کارشناسی حسابداری از دانشگاه شهید بهشتی در سال ۱۳۷۲

💼 سوابق کاری:
- حسابرسی در مؤسسه حسابرسی بهمند از سال ۱۳۷۰ (شریک و عضو هیات مدیره)

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران`,
      en: `🎓 Education:
- Bachelor of Accounting from Shahid Beheshti University (1993)

💼 Professional Experience:
- Auditor at Behmand Audit Firm since 1991 (Partner and Board Member)

👥 Professional Memberships:
- Certified Public Accountant - Member of Iranian Association of Certified Public Accountants
- Independent Accountant - Member of Iranian Association of Chartered Accountants`,
    },
  },
  {
    name: {
      fa: "رسول دوازده امامی",
      en: "Rasoul Davazdah Emami",
    },
    role: {
      fa: "شریک و عضو هیات مدیره",
      en: "Partner and Board Member",
    },
    avatar: emami,
    details: {
      fa: `🎓 مدارک تحصیلی:
- کارشناسی حسابداری از دانشگاه اصفهان در سال ۱۳۷۶
- کارشناسی ارشد حسابداری از دانشگاه اشرفی اصفهانی در سال ۱۳۹۷
- دکترای حسابداری از دانشگاه یزد در سال ۱۴۰۱

💼 سوابق کاری:
- حسابداری در بخش خصوصی (۲ سال)
- حسابرسی در مؤسسه حسابرسی بهمند از سال ۱۳۷۵ (شریک و عضو هیات مدیره)

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران
- عضو جامعه مشاوران رسمی مالیاتی ایران`,
      en: `🎓 Education:
- Bachelor of Accounting from University of Isfahan (1997)
- Master of Accounting from Ashrafi Esfahani University (2018)
- Ph.D. in Accounting from Yazd University (2022)

💼 Professional Experience:
- Accountant in private sector (2 years)
- Auditor at Behmand Audit Firm since 1996 (Partner and Board Member)

👥 Professional Memberships:
- Certified Public Accountant - Member of Iranian Association of Certified Public Accountants
- Independent Accountant - Member of Iranian Association of Chartered Accountants
- Member of Iranian Association of Official Tax Consultants`,
    },
  },
  {
    name: {
      fa: "محمد رضا رحمانیان",
      en: "Mohammad Reza Rahmanian",
    },
    role: {
      fa: "شریک",
      en: "Partner",
    },
    avatar: rahmanian,
    details: {
      fa: `🎓 مدارک تحصیلی:
- کارشناسی حسابداری از دانشگاه آزاد اسلامی در سال ۱۳۸۰

💼 سوابق کاری:
- حسابرسی در مؤسسه حسابرسی بهمند از سال ۱۳۸۰ (شریک)

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران`,
      en: `🎓 Education:
- Bachelor of Accounting from Islamic Azad University (2001)

💼 Professional Experience:
- Auditor at Behmand Audit Firm  since 2001 (Partner)

👥 Professional Memberships:
- Certified Public Accountant - Member of Iranian Association of Certified Public Accountants
- Independent Accountant - Member of Iranian Association of Chartered Accountants`,
    },
  },
  {
    name: {
      fa: "سجاد دل پاک",
      en: "Sajjad Delpak",
    },
    role: {
      fa: "شریک",
      en: "Partner",
    },
    avatar: delpak,
    details: {
      fa: `🎓 مدارک تحصیلی:
- کارشناسی حسابداری از دانشگاه آزاد اسلامی در سال ۱۳۸۴
- کارشناسی ارشد حسابداری از دانشگاه آزاد اسلامی در سال ۱۳۸۶

💼 سوابق کاری:
- حسابرسی در موسسه حسابرسی دانشگر محاسب به مدت ۳ سال
- حسابرسی در مؤسسه حسابرسی بهمند از سال ۱۳۸۹ (شریک)

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران`,
      en: `🎓 Education:
- Bachelor of Accounting from Islamic Azad University (2005)
- Master of Accounting from Islamic Azad University (2007)

💼 Professional Experience:
- Auditor at Daneshgar Mohaseb Audit Firm (3 years)
- Auditor at Behmand Audit Firm since 2010 (Partner)

👥 Professional Memberships:
- Certified Public Accountant - Member of Iranian Association of Certified Public Accountants
- Independent Accountant - Member of Iranian Association of Chartered Accountants`,
    },
  },
  {
    name: {
      fa: "علی رحمتی",
      en: "Ali Rahmati",
    },
    role: {
      fa: "شریک",
      en: "Partner",
    },
    avatar: rahmati,
    details: {
      fa: `🎓 مدارک تحصیلی:
- کارشناسی حسابداری از دانشگاه آزاد اسلامی در سال ۱۳۸۷
- کارشناسی ارشد حسابداری از دانشگاه آزاد اسلامی در سال ۱۳۹۵

💼 سوابق کاری:
- حسابرسی در مؤسسه حسابرسی بهمند از سال ۱۳۸۹ (شریک)

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران
- کارشناسی رسمی دادگستری`,
      en: `🎓 Education:
- Bachelor of Accounting from Islamic Azad University (2008)
- Master of Accounting from Islamic Azad University (2016)

💼 Professional Experience:
- Auditor at Behmand Audit Firm since 2010 (Partner)

👥 Professional Memberships:
- Certified Public Accountant - Member of Iranian Association of Certified Public Accountants
- Independent Accountant - Member of Iranian Association of Chartered Accountants
- Official Expert of the Judiciary`,
    },
  },
];

// تقسیم اعضا به گروه‌ها
const firstRow = teamMembers.slice(0, 3);
const secondRow = teamMembers.slice(3, 7);
const thirdRow = teamMembers.slice(7, 10);

// کامپوننت نمایش یک ردیف - دقیقاً مانند کد قبلی
function TeamRow({ members, handleOpen, language }) {
  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 3, md: 4 }}
      justifyContent="center"
      sx={{
        mb: { xs: 4, md: 6 },
        px: { xs: 1, sm: 2, md: 4 },
      }}
    >
      {members.map((member, i) => (
        <Grid
          key={i}
          size={{
            xs: 6,
            sm: 4,
            md: 3,
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.1 }}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              onClick={() => handleOpen(member)}
              sx={{
                width: "100%",
                maxWidth: 260,
                minHeight: { xs: 180, sm: 220 },
                pl: { xs: 2, sm: 3 },
                pr: { xs: 2, sm: 3 },
                pt: { xs: 2, sm: 3 },
                borderRadius: 5,
                textAlign: "center",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                transition: "all 0.35s ease",
                overflow: "visible",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.25)",
                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.25), 0 0 20px rgba(0,150,255,0.2)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(240,240,240,0.15))",
                  transform: "translateY(-6px)",
                  boxShadow:
                    "0 8px 30px rgba(0,0,0,0.3), 0 0 35px rgba(0,170,255,0.35)",
                },
              }}
            >
              <Avatar
                src={member.avatar}
                alt={member.name[language]}
                sx={{
                  width: { xs: 70, sm: 85, md: 95 },
                  height: { xs: 70, sm: 85, md: 95 },
                  mb: 2,
                  border: "3px solid rgba(255,255,255,0.6)",
                  boxShadow:
                    "0 0 12px rgba(0,150,255,0.3), 0 4px 15px rgba(0,0,0,0.25)",
                  "& .MuiAvatar-img": {
                    objectFit: "contain",
                  },
                }}
              />
              <Typography
                variant="subtitle1"
                fontWeight={700}
                sx={{
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  textShadow: "0 0 6px rgba(0,0,0,0.3)",
                  mb: 0.5,
                  color: "#000000", // متن مشکی
                }}
              >
                {member.name[language]}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "0.75rem", md: "0.9rem" },
                  mt: 1,
                  textShadow: "0 0 4px rgba(0,0,0,0.25)",
                  color: "#000000", // متن مشکی
                }}
              >
                {member.role[language]}
              </Typography>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
}

export default function About() {
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [founderHovered, setFounderHovered] = useState(false);
  const [founderDialogOpen, setFounderDialogOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpen = (member) => {
    setSelectedMember(member);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMember(null);
  };

  const handleFounderClick = () => {
    if (isMobile) {
      setFounderDialogOpen(true);
    }
  };

  const handleFounderDialogClose = () => {
    setFounderDialogOpen(false);
  };

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, mt: 10, mb: 10 }}>
      <Container maxWidth="lg">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 800,
              mb: { xs: 6, md: 8 },
              color: "#111",
              textShadow: "0 2px 4px rgba(0,0,0,0.2)",
              letterSpacing: "0.5px",
            }}
          >
            {t("about.chip")}
          </Typography>
        </motion.div>

        {/* بخش معرفی موسسه */}
        <Box
          sx={{
            maxWidth: 900,
            mx: "auto",
            mb: 8,
            px: { xs: 2, sm: 4 },
            py: { xs: 3, sm: 5 },
            borderRadius: 5,
            background: "rgba(255,255,255,0.65)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.4)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.5s ease",
            "&:hover": {
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(240,240,240,0.5))",
              boxShadow: "0 12px 36px rgba(0,0,0,0.25)",
            },
            "&:before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "-50%",
              width: "200%",
              height: "100%",
              background:
                "linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent)",
              transform: "translateX(-100%)",
              transition: "transform 0.8s ease",
            },
            "&:hover:before": {
              transform: "translateX(100%)",
            },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              lineHeight: 2,
              letterSpacing: "0.8px",
              background: "linear-gradient(90deg, #2e7d32, #81c784)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t("about.intro")}
          </Typography>
        </Box>

        {/* بخش ویژه مرحوم اصغر هشی */}
        <Box sx={{ textAlign: "center", my: 8, px: 2 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                mb: 4,
              }}
            >
              {/* تصویر مرحوم اصغر هشی */}
              <motion.div
                whileHover={{ scale: isMobile ? 1 : 0.9 }}
                whileTap={{ scale: 0.85 }}
                onHoverStart={() => !isMobile && setFounderHovered(true)}
                onHoverEnd={() => !isMobile && setFounderHovered(false)}
                onClick={handleFounderClick}
                style={{
                  position: "relative",
                  cursor: isMobile ? "pointer" : "default",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 3,
                    overflow: "hidden",
                    p: 0,
                    display: "inline-block",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    background: "transparent",
                  }}
                >
                  <Box
                    component="img"
                    src={asghar}
                    alt={t("about.founder.name")}
                    sx={{
                      display: "block",
                      width: "100%",
                      height: "auto",
                      maxWidth: { xs: 280, sm: 340, md: 400 },
                      borderRadius: 3,
                      transition: "all 0.4s ease",
                      filter: founderHovered
                        ? "brightness(1.05) contrast(1.1) saturate(1.1)"
                        : "brightness(1) contrast(1) saturate(1)",
                    }}
                  />
                </Box>
              </motion.div>

              {/* نام */}
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  background: "linear-gradient(90deg, #1b5e20, #66bb6a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  fontSize: { xs: "1.8rem", sm: "2.2rem" },
                }}
              >
                {t("about.founder.name")}
              </Typography>
            </Box>
          </motion.div>

          {/* توضیحات با انیمیشن مدرن - فقط برای دسکتاپ */}
          {!isMobile && (
            <AnimatePresence>
              {founderHovered && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 30,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 30,
                    scale: 0.95,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                  style={{
                    width: "100%",
                    maxWidth: 800,
                    margin: "0 auto",
                  }}
                >
                  <Box
                    sx={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(245,245,245,0.98))",
                      backdropFilter: "blur(20px)",
                      borderRadius: 3,
                      p: { xs: 3, sm: 4 },
                      boxShadow:
                        "0 20px 60px rgba(0,0,0,0.15), 0 0 40px rgba(76,175,80,0.1)",
                      border: "1px solid rgba(76,175,80,0.3)",
                      position: "relative",
                      overflow: "hidden",
                      mb: 4,
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: "justify",
                        lineHeight: 1.8,
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                        fontWeight: 500,
                        color: "#000000", // متن مشکی
                      }}
                    >
                      {t("about.founder.bio")}
                    </Typography>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/*<motion.div*/}
          {/*  initial={{ opacity: 0, y: 40 }}*/}
          {/*  animate={{ opacity: 1, y: 0 }}*/}
          {/*  transition={{ duration: 0.6, delay: 0.4 }}*/}
          {/*>*/}
          {/*  <Typography*/}
          {/*    variant="h4"*/}
          {/*    align="center"*/}
          {/*    gutterBottom*/}
          {/*    sx={{*/}
          {/*      fontWeight: 800,*/}
          {/*      mb: { xs: 4, md: 6 },*/}
          {/*      mt: { xs: 8, md: 15 },*/}
          {/*      background: "linear-gradient(90deg, #1b5e20, #66bb6a)",*/}
          {/*      WebkitBackgroundClip: "text",*/}
          {/*      WebkitTextFillColor: "transparent",*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    {t("about.currentPartners.title")}*/}
          {/*  </Typography>*/}
          {/*  <Typography*/}
          {/*    sx={{*/}
          {/*      maxWidth: 900,*/}
          {/*      mx: "auto",*/}
          {/*      textAlign: "justify",*/}
          {/*      lineHeight: 2,*/}
          {/*      fontWeight: 700,*/}
          {/*      fontSize: { xs: "0.9rem", md: "1rem" },*/}
          {/*      mb: { xs: 6, md: 10 },*/}
          {/*      px: { xs: 2, md: 0 },*/}
          {/*      color: "#000000", // متن مشکی*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    {t("about.currentPartners.description")}*/}
          {/*  </Typography>*/}
          {/*</motion.div>*/}
        </Box>

        {/* بخش هیئت مدیره - دقیقاً مانند قبل */}
        <Box sx={{ mt: 10 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 800,
              mb: 6,
              background: "linear-gradient(90deg, #1b5e20, #66bb6a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {language === "fa"
              ? "اعضای هیئت مدیره و شرکا"
              : "Board Members and Partners"}
          </Typography>

          <TeamRow
            members={firstRow}
            handleOpen={handleOpen}
            language={language}
          />
          <TeamRow
            members={secondRow}
            handleOpen={handleOpen}
            language={language}
          />
          <TeamRow
            members={thirdRow}
            handleOpen={handleOpen}
            language={language}
          />
        </Box>

        <ResumeDownloadSection />

        {/* نمودار سازمانی */}
        <Box sx={{ mt: 10 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 800,
              mb: 6,
              background: "linear-gradient(90deg, #1b5e20, #66bb6a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {language === "fa" ? "نمودار سازمانی" : "Organizational Chart"}
          </Typography>
          <OrganizationalChart language={language} />
        </Box>

        {/* Dialog جزئیات اعضا با طراحی مدرن */}
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
          sx={{
            "& .MuiDialog-paper": {
              borderRadius: 3,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(245,245,245,0.9))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(76,175,80,0.2)",
              boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
              overflow: "hidden",
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)",
              color: "white",
              borderRadius: "0",
              py: 3,
              px: 4,
            }}
          >
            <Typography variant="h5" fontWeight={700}>
              {selectedMember?.name[language]}
            </Typography>
            <IconButton
              onClick={handleClose}
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ p: 0 }}>
            {selectedMember && (
              <Stack spacing={3} alignItems="center" sx={{ p: 4 }}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Avatar
                    src={selectedMember.avatar}
                    alt={selectedMember.name[language]}
                    sx={{
                      width: 140,
                      height: 140,
                      border: "4px solid rgba(76, 175, 80, 0.3)",
                      boxShadow: "0 8px 25px rgba(56,142,60,0.15)",
                    }}
                  />
                </motion.div>

                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    color: "#2e7d32",
                    fontWeight: 600,
                  }}
                >
                  {selectedMember.role[language]}
                </Typography>

                <Box
                  sx={{
                    whiteSpace: "pre-wrap",
                    fontFamily: "inherit",
                    width: "100%",
                    lineHeight: 1.8,
                    fontSize: "1rem",
                    p: 3,
                    borderRadius: 2,
                    background: "rgba(245,245,245,0.6)",
                    border: "1px solid rgba(76,175,80,0.2)",
                    color: "#000000", // متن مشکی
                    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                  }}
                >
                  {selectedMember.details[language]}
                </Box>
              </Stack>
            )}
          </DialogContent>
        </Dialog>

        {/* Dialog مخصوص مرحوم اصغر هشی برای موبایل */}
        <Dialog
          open={founderDialogOpen}
          onClose={handleFounderDialogClose}
          maxWidth="md"
          fullWidth
          sx={{
            "& .MuiDialog-paper": {
              borderRadius: 3,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(245,245,245,0.9))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(76,175,80,0.2)",
              boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
              overflow: "hidden",
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)",
              color: "white",
              borderRadius: "0",
              py: 3,
              px: 4,
            }}
          >
            <Typography variant="h5" fontWeight={700}>
              {t("about.founder.name")}
            </Typography>
            <IconButton
              onClick={handleFounderDialogClose}
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ p: 0 }}>
            <Stack spacing={3} alignItems="center" sx={{ p: 4 }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Avatar
                  src={asghar}
                  alt={t("about.founder.name")}
                  sx={{
                    width: 140,
                    height: 140,
                    border: "4px solid rgba(76, 175, 80, 0.3)",
                    boxShadow: "0 8px 25px rgba(56,142,60,0.15)",
                  }}
                />
              </motion.div>

              <Box
                sx={{
                  whiteSpace: "pre-wrap",
                  fontFamily: "inherit",
                  width: "100%",
                  lineHeight: 1.8,
                  fontSize: "1rem",
                  p: 3,
                  borderRadius: 2,
                  background: "rgba(245,245,245,0.6)",
                  border: "1px solid rgba(76,175,80,0.2)",
                  color: "#000000", // متن مشکی
                  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                }}
              >
                {t("about.founder.bio")}
              </Box>
            </Stack>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}
