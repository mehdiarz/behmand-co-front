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
} from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

import Grid from "@mui/material/Grid";

import asghar from "../assets/asghar-hooshi.jpg";
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
- لیسانس حسابداری از مدرسه عالی علوم اقتصادی و اجتماعی بابلسر درسال ۱۳۵۳

💼 سوابق کاری:
- حسابرسی در مؤسسه حسابرسی طوس (۱۰ ماه)
- حسابرسی در مؤسسه حسابرسی دقیق (۵ سال، سرپرست ارشد)
- حسابرسی در مؤسسه حسابرسی بهمند از ۱۳۵۸ (شریک و عضو هیات مدیره)

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران`,
      en: `🎓 Education:
- B.Sc. in Accounting from Babolsar School of Higher Economic and Social Sciences (1974)

💼 Professional Experience:
- Auditor at Tous Auditing Institute (10 months)
- Auditor at Deghigh Auditing Institute (5 years, Senior Supervisor)
- Auditor at Behmand Auditing Institute since 1979 (Partner and Board Member)

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
- لیسانس حسابداری از مدرسه عالی بازرگانی (۱۳۵۷)

💼 سوابق کاری:
- حسابرسی در مؤسسه حسابرسی دقیق (۳.۵ سال، سرپرست)
- حسابرسی در مؤسسه حسابرسی بهمند از ۱۳۵۸ (شریک و عضو هیات مدیره)

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران
- عضویت در کارگروه های تخصصی قوانین و مقررات، بورس، بیمه و بانک
- عضو بند ۳ ماده ۲۴۴ هیات حل اختلاف مالیاتی قانون مالیات های مستقیم`,
      en: `🎓 Education:
- B.Sc. in Accounting from Higher School of Commerce (1978)

💼 Professional Experience:
- Auditor at Deghigh Auditing Institute (3.5 years, Supervisor)
- Auditor at Behmand Auditing Institute since 1979 (Partner and Board Member)

👥 Professional Memberships:
- Certified Public Accountant - Member of Iranian Association of Certified Public Accountants
- Independent Accountant - Member of Iranian Association of Chartered Accountants
- Member of specialized working groups for regulations, stock exchange, insurance and banking
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
- لیسانس حسابداری از دانشکده امور اقتصادی و دارائی (۱۳۷۸)
- فوق لیسانس حسابداری از دانشگاه شهید بهشتی (۱۳۸۱)

💼 سوابق کاری:
- حسابرسی در مؤسسه حسابرسی بهمند از ۱۳۷۳ (شریک و عضو هیات مدیره)

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران
- عضو انجمن حسابداری ایران
- عضو انجمن حسابرسان داخلی ایران
- دانشجوی دوره ACCA`,
      en: `🎓 Education:
- B.Sc. in Accounting from Faculty of Economics and Finance (1999)
- M.Sc. in Accounting from Shahid Beheshti University (2002)

💼 Professional Experience:
- Auditor at Behmand Auditing Institute since 1994 (Partner and Board Member)

👥 Professional Memberships:
- Certified Public Accountant - Member of Iranian Association of Certified Public Accountants
- Independent Accountant - Member of Iranian Association of Chartered Accountants
- Member of Iranian Accounting Association
- Member of Iranian Internal Auditors Association
- ACCA Candidate`,
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
- لیسانس حسابداری از دانشگاه شهید بهشتی (۱۳۷۴)

💼 سوابق کاری:
- حسابرسی در مؤسسه حسابرسی بهمند از ۱۳۷۱ (شریک)

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران`,
      en: `🎓 Education:
- B.Sc. in Accounting from Shahid Beheshti University (1995)

💼 Professional Experience:
- Auditor at Behmand Auditing Institute since 1992 (Partner)

👥 Professional Memberships:
- Certified Public Accountant - Member of Iranian Association of Certified Public Accountants
- Independent Accountant - Member of Iranian Association of Chartered Accountants`,
    },
  },
  {
    name: {
      fa: "احمد رضا شریفی",
      en: "Ahmad Sharifi",
    },
    role: {
      fa: "شریک و عضو هیات مدیره",
      en: "Partner and Board Member",
    },
    avatar: sharifi,
    details: {
      fa: `🎓 مدارک تحصیلی:
- لیسانس حسابداری از دانشگاه آزاد اسلامی (۱۳۷۶)

💼 سوابق کاری:
- حسابرسی در مؤسسه حسابرسی بهمند از ۱۳۷۸ (شریک)

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران
- عضو انجمن حسابداری ایران
- عضو انجمن حسابرسان داخلی ایران`,
      en: `🎓 Education:
- B.Sc. in Accounting from Islamic Azad University (1997)

💼 Professional Experience:
- Auditor at Behmand Auditing Institute since 1999 (Partner)

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
- لیسانس حسابداری از دانشگاه شهید بهشتی (۱۳۷۳)

💼 سوابق کاری:
- حسابرسی در مؤسسه حسابرسی بهمند از ۱۳۷۱ (شریک)

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران`,
      en: `🎓 Education:
- B.Sc. in Accounting from Shahid Beheshti University (1994)

💼 Professional Experience:
- Auditor at Behmand Auditing Institute since 1991 (Partner)

👥 Professional Memberships:
- Certified Public Accountant - Member of Iranian Association of Certified Public Accountants
- Independent Accountant - Member of Iranian Association of Chartered Accountants`,
    },
  },
  {
    name: {
      fa: "رسول دوازده امامی",
      en: "Rasol Davazdah Emami",
    },
    role: {
      fa: "شریک و عضو هیات مدیره",
      en: "Partner and Board Member",
    },
    avatar: emami,
    details: {
      fa: `🎓 مدارک تحصیلی:
- فوق لیسانس حسابداری از دانشگاه اشرفی اصفهانی (۱۳۹۷)
- دکترای حسابداری

💼 سوابق کاری:
- حسابداری در بخش خصوصی (۲ سال)
- حسابرسی در مؤسسه حسابرسی بهمند از ۱۳۷۵ (شریک)

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران`,
      en: `🎓 Education:
- M.Sc. in Accounting from Ashrafi Esfahani University (2018)
- Ph.D. in Accounting

💼 Professional Experience:
- Accountant in private sector (2 years)
- Auditor at Behmand Auditing Institute since 1996 (Partner)

👥 Professional Memberships:
- Certified Public Accountant - Member of Iranian Association of Certified Public Accountants
- Independent Accountant - Member of Iranian Association of Chartered Accountants`,
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
- لیسانس حسابداری از دانشگاه آزاد اسلامی

💼 سوابق کاری:
- حسابرسی در مؤسسه حسابرسی بهمند از سال ۱۳۸۰

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران`,
      en: `🎓 Education:
- B.Sc. in Accounting from Islamic Azad University

💼 Professional Experience:
- Auditor at Behmand Auditing Institute since 2001

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
- فوق لیسانس حسابداری از دانشگاه آزاد اسلامی

💼 سوابق کاری:
- حسابداری در موسسه حسابرسی دانشگر محاسب به مدت ۳ سال
- حسابرسی در مؤسسه حسابرسی بهمند از سال ۱۳۸۹

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران`,
      en: `🎓 Education:
- M.Sc. in Accounting from Islamic Azad University

💼 Professional Experience:
- Accountant at Daneshgar Mohaseb Auditing Institute for 3 years
- Auditor at Behmand Auditing Institute since 2010

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
- فوق لیسانس حسابداری از دانشگاه آزاد اسلامی

💼 سوابق کاری:
- حسابرسی در مؤسسه حسابرسی بهمند از سال ۱۳۸۹

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران
- کارشناس دادگستری`,
      en: `🎓 Education:
- M.Sc. in Accounting from Islamic Azad University

💼 Professional Experience:
- Accountant at Novin Gozar Company for 3 years
- Accountant at Ati Hesab Khebreh Financial Institute for 12 years
- Auditor at Behmand Auditing Institute since 2010

👥 Professional Memberships:
- Certified Public Accountant - Member of Iranian Association of Certified Public Accountants
- Independent Accountant - Member of Iranian Association of Chartered Accountants`,
    },
  },
];

// تقسیم اعضا به گروه‌ها
const firstRow = teamMembers.slice(0, 3);
const secondRow = teamMembers.slice(3, 7);
const thirdRow = teamMembers.slice(7, 10);

// کامپوننت نمایش یک ردیف
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
                }}
              >
                {member.name[language]}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: { xs: "0.75rem", md: "0.9rem" },
                  mt: 1,
                  textShadow: "0 0 4px rgba(0,0,0,0.25)",
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
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const handleOpen = (member) => {
    setSelectedMember(member);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMember(null);
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box
              sx={{
                position: "relative",
                borderRadius: 3,
                background: "rgba(255,255,255,0.25)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                overflow: "hidden",
                p: 0,
                display: "inline-block",
                transition: "all 0.4s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0 12px 36px rgba(0,0,0,0.25)",
                  background: "rgba(255,255,255,0.35)",
                },
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
                  maxWidth: { xs: 280, sm: 320, md: 380 },
                  borderRadius: 3,
                  transition: "transform 0.4s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
            </Box>
          </Box>

          <Typography variant="h5" gutterBottom>
            {t("about.founder.name")}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              maxWidth: 900,
              mx: "auto",
              textAlign: "justify",
              lineHeight: 2,
              fontSize: { xs: "0.9rem", md: "1rem" },
              mb: { xs: 6, md: 8 },
            }}
          >
            {t("about.founder.bio")}
          </Typography>

          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 800,
              mb: { xs: 4, md: 6 },
              mt: { xs: 8, md: 15 },
              background: "linear-gradient(90deg, #1b5e20, #66bb6a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t("about.currentPartners.title")}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              maxWidth: 900,
              mx: "auto",
              textAlign: "justify",
              lineHeight: 2,
              fontWeight: 700,
              fontSize: { xs: "0.9rem", md: "1rem" },
              mb: { xs: 6, md: 10 },
              px: { xs: 2, md: 0 },
            }}
          >
            {t("about.currentPartners.description")}
          </Typography>
        </Box>

        {/* بخش هیئت مدیره */}
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

        {/* جدول اطلاعات (اگر دارید) */}
        {/*<Box sx={{ mt: 10 }}>*/}
        {/*    <Typography*/}
        {/*        variant="h4"*/}
        {/*        align="center"*/}
        {/*        gutterBottom*/}
        {/*        sx={{*/}
        {/*            fontWeight: 800,*/}
        {/*            mb: 6,*/}
        {/*            background: "linear-gradient(90deg, #1b5e20, #66bb6a)",*/}
        {/*            WebkitBackgroundClip: "text",*/}
        {/*            WebkitTextFillColor: "transparent",*/}
        {/*        }}*/}
        {/*    >*/}
        {/*        {language === 'fa' ? 'اطلاعات آماری' : 'Statistical Information'}*/}
        {/*    </Typography>*/}

        {/*    <Grid container spacing={4} sx={{ mb: 6 }}>*/}
        {/*        <Grid item xs={12} md={4}>*/}
        {/*            <Card sx={{ p: 3, textAlign: 'center' }}>*/}
        {/*                <Typography variant="h3" color="primary" fontWeight="bold">*/}
        {/*                    46+*/}
        {/*                </Typography>*/}
        {/*                <Typography variant="h6">*/}
        {/*                    {language === 'fa' ? 'سال تجربه' : 'Years of Experience'}*/}
        {/*                </Typography>*/}
        {/*            </Card>*/}
        {/*        </Grid>*/}
        {/*        <Grid item xs={12} md={4}>*/}
        {/*            <Card sx={{ p: 3, textAlign: 'center' }}>*/}
        {/*                <Typography variant="h3" color="primary" fontWeight="bold">*/}
        {/*                    1000+*/}
        {/*                </Typography>*/}
        {/*                <Typography variant="h6">*/}
        {/*                    {language === 'fa' ? 'پروژه موفق' : 'Successful Projects'}*/}
        {/*                </Typography>*/}
        {/*            </Card>*/}
        {/*        </Grid>*/}
        {/*        <Grid item xs={12} md={4}>*/}
        {/*            <Card sx={{ p: 3, textAlign: 'center' }}>*/}
        {/*                <Typography variant="h3" color="primary" fontWeight="bold">*/}
        {/*                    24*/}
        {/*                </Typography>*/}
        {/*                <Typography variant="h6">*/}
        {/*                    {language === 'fa' ? 'مدیر و شریک' : 'Managers and Partners'}*/}
        {/*                </Typography>*/}
        {/*            </Card>*/}
        {/*        </Grid>*/}
        {/*    </Grid>*/}
        {/*</Box>*/}

        {/* Dialog جزئیات اعضا */}
          <Dialog
              open={open}
              onClose={handleClose}
              maxWidth="sm"
              fullWidth
              sx={{
                  "& .MuiDialog-paper": {
                      direction: language === "fa" ? "ltr" : "ltr",
                      textAlign: language === "fa" ? "left" : "left",
                  }
              }}
          >
              <DialogTitle
                  sx={{
                      display: "flex",
                      flexDirection: language === "fa" ? "row" : "row-reverse",
                      justifyContent: "space-between",
                      alignItems: "center",
                  }}
              >
                  {selectedMember?.name[language]}
                  <IconButton onClick={handleClose}>
                      <CloseIcon />
                  </IconButton>
              </DialogTitle>

              <DialogContent
                  sx={{
                      direction: language === "fa" ? "ltr" : "ltr",
                      textAlign: language === "fa" ? "left" : "left",
                  }}
              >
                  {selectedMember && (
                      <Stack spacing={2} alignItems="center">
                          <Avatar
                              src={selectedMember.avatar}
                              alt={selectedMember.name[language]}
                              sx={{
                                  width: 200,
                                  height: 200,
                                  "& .MuiAvatar-img": {
                                      objectFit: "contain",
                                  },
                              }}
                          />

                          <Typography variant="subtitle1" color="text.secondary">
                              {selectedMember.role[language]}
                          </Typography>

                          <Box
                              sx={{
                                  whiteSpace: "pre-wrap",
                                  fontFamily: "inherit",
                                  width: "100%",
                                  lineHeight: 1.8,
                                  fontSize: "1rem",
                                  p: 1,
                              }}
                          >
                              {selectedMember.details[language]}
                          </Box>
                      </Stack>
                  )}
              </DialogContent>
          </Dialog>

      </Container>
    </Box>
  );
}
