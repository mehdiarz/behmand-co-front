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

import atash from "../assets/atash.jpg";
import sharifi from "../assets/sharifi.jpg";
import arezoomand from "../assets/arezoomand.jpg";
import emami from "../assets/emami.jpg";
import hooman from "../assets/hooman.jpg";
import mashreghi from "../assets/mashreghi.jpg";
import rastegari from "../assets/rastegari.jpg";

const teamMembers = [
  {
    name: "جناب آقای رضا آتش",
    role: "شریک و عضو هیات مدیره",
    avatar: atash,
    details: `
🎓 مدارک تحصیلی:
- لیسانس حسابداری از مدرسه عالی علوم اقتصادی و اجتماعی بابلسر درسال ۱۳۵۳

💼 سوابق کاری:
- حسابرسی در مؤسسه حسابرسی طوس (۱۰ ماه)
- حسابرسی در مؤسسه حسابرسی دقیق (۵ سال، سرپرست ارشد)
- حسابرسی در مؤسسه حسابرسی بهمند از ۱۳۵۸ (شریک و عضو هیات مدیره)

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران
    `,
  },
  {
    name: "جناب آقای علی مشرفی آرائی",
    role: "شریک و عضو هیات مدیره",
    avatar: mashreghi,
    details: `
🎓 مدارک تحصیلی:
- لیسانس حسابداری از مدرسه عالی بازرگانی (۱۳۵۷)

💼 سوابق کاری:
- حسابرسی در مؤسسه حسابرسی دقیق (۳.۵ سال، سرپرست)
- حسابرسی در مؤسسه حسابرسی بهمند از ۱۳۵۸ (شریک و عضو هیات مدیره)

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران
    `,
  },
  {
    name: "جناب آقای هومن هشی",
    role: "شریک و عضو هیات مدیره",
    avatar: hooman,
    details: `
🎓 مدارک تحصیلی:
- لیسانس حسابداری از دانشکده امور اقتصادی و دارائی (۱۳۷۸)
- فوق لیسانس حسابداری از دانشگاه شهید بهشتی (۱۳۸۱)

💼 سوابق کاری:
- حسابرسی در مؤسسه حسابرسی بهمند از ۱۳۷۳ (شریک و عضو هیات مدیره)

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران
- عضو انجمن حسابداری ایران
- عضو انجمن حسابرسان داخلی ایران
- دانشجوی دوره ACCA
    `,
  },
  {
    name: "جناب آقای محمد رضا آرزومند",
    role: "شریک",
    avatar: arezoomand,
    details: `
🎓 مدارک تحصیلی:
- لیسانس حسابداری از دانشگاه شهید بهشتی (۱۳۷۳)

💼 سوابق کاری:
- حسابرسی در مؤسسه حسابرسی بهمند از ۱۳۷۰ (شریک)

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران
    `,
  },
  {
    name: "جناب آقای احمد شریفی قزوینی",
    role: "شریک",
    avatar: sharifi,
    details: `
🎓 مدارک تحصیلی:
- لیسانس حسابداری از دانشگاه آزاد اسلامی (۱۳۷۶)

💼 سوابق کاری:
- حسابرسی در مؤسسه حسابرسی بهمند از ۱۳۷۸ (شریک)

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران
- عضو انجمن حسابداری ایران
- عضو انجمن حسابرسان داخلی ایران
    `,
  },
  {
    name: "جناب آقای نادر رستگاری",
    role: "شریک",
    avatar: rastegari,
    details: `
🎓 مدارک تحصیلی:
- لیسانس حسابداری از دانشگاه شهید بهشتی (۱۳۷۳)

💼 سوابق کاری:
- حسابرسی در مؤسسه حسابرسی بهمند از ۱۳۷۰ (شریک)

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران
    `,
  },
  {
    name: "جناب آقای رسول دوازده امامی",
    role: "شریک",
    avatar: emami,
    details: `
🎓 مدارک تحصیلی:
- فوق لیسانس حسابداری از دانشگاه اشرفی اصفهانی (۱۳۹۷)

💼 سوابق کاری:
- حسابداری در بخش خصوصی (۲ سال)
- حسابرسی در مؤسسه حسابرسی بهمند از ۱۳۷۵ (شریک)

👥 عضویت‌ها:
- حسابدار رسمی – عضو جامعه حسابداران رسمی ایران
- حسابدار مستقل – عضو انجمن حسابداران خبره ایران
    `,
  },
];

export default function About() {
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

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
      <Container>
        {/* Title */}
        <Typography variant="h3" align="center" gutterBottom>
          درباره ما
        </Typography>
        <Typography
          align="center"
          color="text.secondary"
          sx={{ maxWidth: 800, mx: "auto", mb: 6 }}
        >
          مؤسسه حسابرسی بهمند با مجوز رسمی از جامعه حسابداران رسمی ایران، با هدف
          ارائه خدمات حرفه‌ای حسابرسی، مشاوره مالی و مالیاتی تأسیس شده است.
        </Typography>

        {/* Team Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            هیئت مدیره
          </Typography>
          <Typography
            align="center"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: "auto", mb: 5 }}
          >
            تیم بهمند متشکل از حسابداران رسمی و کارشناسان خبره مالی است.
          </Typography>

          {/* CSS Grid Layout */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 4,
              gridAutoRows: "1fr", // کارت‌ها هم‌ارتفاع
            }}
          >
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{ height: "100%" }}
              >
                <Card
                  onClick={() => handleOpen(member)}
                  sx={{
                    height: "100%", // 👈 همه کارت‌ها هم‌ارتفاع
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                    borderRadius: 4,
                    cursor: "pointer",
                    boxShadow: 3,
                    transition: "0.3s",
                    mt: 2,
                  }}
                >
                  <Avatar
                    src={member.avatar}
                    alt={member.name}
                    sx={{
                      width: { xs: 70, md: 90 },
                      height: { xs: 70, md: 90 },
                      mx: "auto",
                      mb: 2,
                      bgcolor: "primary.main",
                    }}
                  />
                  <Typography variant="subtitle1" fontWeight={600}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.role}
                  </Typography>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Box>

        {/* Dialog for details */}
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
          sx={{ direction: "rtl" }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              direction: "rtl",
              textAlign: "right",
            }}
          >
            {selectedMember?.name}
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent
            sx={{
              direction: "rtl",
              textAlign: "right",
            }}
          >
            {selectedMember && (
              <Stack spacing={2} alignItems="center">
                <Avatar
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  sx={{
                    width: { xs: 100, sm: 120, md: 140 },
                    height: { xs: 100, sm: 120, md: 140 },
                  }}
                />
                <Typography variant="subtitle1" color="text.secondary">
                  {selectedMember.role}
                </Typography>
                <Typography
                  component="pre"
                  sx={{
                    whiteSpace: "pre-wrap",
                    fontFamily: "inherit",
                    width: "100%",
                    fontSize: { xs: "0.85rem", sm: "0.95rem" },
                  }}
                >
                  {selectedMember.details}
                </Typography>
              </Stack>
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}
