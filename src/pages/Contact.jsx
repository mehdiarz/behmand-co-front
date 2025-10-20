import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Stack,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  LocationOn,
  Phone,
  Fax,
  Email,
  Schedule,
  Business,
  SupportAgent,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { Alert } from "@mui/material";
import { useTranslation } from "react-i18next";

const API_URL = import.meta.env.VITE_API_URL;

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (!form.firstName.trim())
      newErrors.firstName = t("contact.form.errors.firstName");
    if (!form.lastName.trim())
      newErrors.lastName = t("contact.form.errors.lastName");
    if (!phoneDigits || phoneDigits.length < 10)
      newErrors.phone = t("contact.form.errors.phone");
    if (!form.message.trim() || form.message.length < 10)
      newErrors.message = t("contact.form.errors.message");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch(`${API_URL}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setStatus({ type: "success", text: t("contact.form.success") });
        setForm({ firstName: "", lastName: "", phone: "", message: "" });
      } else {
        setStatus({ type: "error", text: t("contact.form.error") });
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setStatus({ type: "error", text: t("contact.form.error") });
    }
  };

  // انیمیشن‌های جدید
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <Container
      sx={{
        py: 4,
        mt: 12,
        maxWidth: "lg",
      }}
    >
      <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "primary.main",
            mb: 2,
          }}
        >
          {t("nav.contact")}
        </Typography>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <Stack spacing={4}>
            {/* کارت اطلاعات دفاتر */}
            <motion.div variants={cardVariants}>
              <Paper sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  fontWeight={600}
                  sx={{ mb: 3 }}
                >
                  {language === "fa" ? "اطلاعات دفاتر" : "Office Information"}
                </Typography>

                <Grid container spacing={4}>
                  {/* دفتر مرکزی */}
                  <Grid item xs={12} md={6} width={500}>
                    <Card variant="outlined" sx={{ height: "100%" }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 3 }}
                        >
                          <Business
                            color="primary"
                            sx={{ mr: 2, fontSize: 28 }}
                          />
                          <Typography variant="h6" fontWeight={600}>
                            {language === "fa" ? "دفتر مرکزی" : "Head Office"}
                          </Typography>
                        </Box>

                        <Stack spacing={2.5}>
                          <Box
                            sx={{ display: "flex", alignItems: "flex-start" }}
                          >
                            <LocationOn
                              sx={{
                                mr: 2,
                                mt: 0.25,
                                color: "primary.main",
                                fontSize: 20,
                              }}
                            />
                            <Typography
                              variant="body1"
                              sx={{ lineHeight: 1.6 }}
                            >
                              {t("contact.address")}
                            </Typography>
                          </Box>

                          <Box
                            sx={{ display: "flex", alignItems: "flex-start" }}
                          >
                            <Phone
                              sx={{
                                mr: 2,
                                mt: 0.25,
                                color: "primary.main",
                                fontSize: 20,
                              }}
                            />
                            <Box>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                              >
                                {language === "fa"
                                  ? "شماره تماس"
                                  : "Phone Numbers"}
                              </Typography>
                              {t("contact.phoneNumbers", {
                                returnObjects: true,
                              }).map((num, i) => (
                                <Typography
                                  key={i}
                                  variant="body1"
                                  component={Link}
                                  href={`tel:${num}`}
                                  sx={{
                                    color: "primary.main",
                                    display: "block",
                                    textDecoration: "none",
                                    fontWeight: 500,
                                    "&:hover": { textDecoration: "none" },
                                  }}
                                >
                                  {num}
                                </Typography>
                              ))}
                            </Box>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Fax
                              sx={{
                                mr: 2,
                                color: "primary.main",
                                fontSize: 20,
                              }}
                            />
                            <Box>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {language === "fa" ? "نمابر" : "Fax"}
                              </Typography>
                              <Typography variant="body1" fontWeight={500}>
                                {t("contact.fax")}
                              </Typography>

                              <Typography variant="h6" sx={{ mt: 2 }}>
                                {language === "fa" ? "کدپستی" : "Postal Code"}
                              </Typography>
                              <Typography color="text.secondary">
                                {t("contact.postalCode")}
                              </Typography>

                              <Typography variant="h6" sx={{ mt: 2 }}>
                                {language === "fa" ? "صندوق پستی" : "P.O. Box"}
                              </Typography>
                              <Typography color="text.secondary">
                                {t("contact.poBox")}
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Email
                              sx={{
                                mr: 2,
                                color: "primary.main",
                                fontSize: 20,
                              }}
                            />
                            <Box>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {language === "fa" ? "پست الکترونیک" : "Email"}
                              </Typography>
                              <Link
                                href={`mailto:${t("contact.email")}`}
                                sx={{
                                  color: "primary.main",
                                  textDecoration: "none",
                                  fontWeight: 500,
                                  "&:hover": { textDecoration: "none" },
                                }}
                              >
                                {t("contact.email")}
                              </Link>
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              pt: 2,
                              borderTop: "1px solid",
                              borderColor: "divider",
                            }}
                          >
                            <Schedule
                              sx={{
                                mr: 2,
                                color: "primary.main",
                                fontSize: 20,
                              }}
                            />
                            <Box>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {language === "fa"
                                  ? "ساعات کاری"
                                  : "Working Hours"}
                              </Typography>
                              <Typography variant="body1" fontWeight={500}>
                                {language === "fa"
                                  ? "همه روزه به غیر از روزهای تعطیل از ساعت ۸/۵ صبح"
                                  : "Every day except holidays from 8.5 AM"}
                              </Typography>
                            </Box>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* دفتر اصفهان */}
                  <Grid item xs={12} md={6} width={500}>
                    <Card variant="outlined" sx={{ height: "100%" }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 3 }}
                        >
                          <Business
                            color="primary"
                            sx={{ mr: 2, fontSize: 28 }}
                          />
                          <Typography variant="h6" fontWeight={600}>
                            {language === "fa"
                              ? "دفتر اصفهان"
                              : "Isfahan Office"}
                          </Typography>
                        </Box>

                        <Stack spacing={2.5}>
                          <Box
                            sx={{ display: "flex", alignItems: "flex-start" }}
                          >
                            <LocationOn
                              sx={{
                                mr: 2,
                                mt: 0.25,
                                color: "primary.main",
                                fontSize: 20,
                              }}
                            />
                            <Typography
                              variant="body1"
                              sx={{ lineHeight: 1.6 }}
                            >
                              {language === "fa"
                                ? "اصفهان- مرداویج-خیابان فارابی جنوبی- کوچه ۵ پلاک ۱۰ طبقه همکف"
                                : "Isfahan - Mardavij - South Farabi Street - Alley 5, No. 10, Ground Floor"}
                            </Typography>
                          </Box>

                          <Box
                            sx={{ display: "flex", alignItems: "flex-start" }}
                          >
                            <Phone
                              sx={{
                                mr: 2,
                                mt: 0.25,
                                color: "primary.main",
                                fontSize: 20,
                              }}
                            />
                            <Box>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                              >
                                {language === "fa"
                                  ? "شماره تماس"
                                  : "Phone Number"}
                              </Typography>
                              <Typography
                                variant="body1"
                                component={Link}
                                href="tel:03136702943"
                                sx={{
                                  color: "primary.main",
                                  textDecoration: "none",
                                  fontWeight: 500,
                                  "&:hover": { textDecoration: "none" },
                                }}
                              >
                                031-36702943
                              </Typography>
                            </Box>
                          </Box>

                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {language === "fa" ? "کد پستی" : "Postal Code"}
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              8168985991
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              pt: 2,
                              borderTop: "1px solid",
                              borderColor: "divider",
                            }}
                          >
                            <Schedule
                              sx={{
                                mr: 2,
                                color: "primary.main",
                                fontSize: 20,
                              }}
                            />
                            <Box>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {language === "fa"
                                  ? "ساعات کاری"
                                  : "Working Hours"}
                              </Typography>
                              <Typography variant="body1" fontWeight={500}>
                                {language === "fa"
                                  ? "همه روزه به غیر از روزهای تعطیل از ساعت ۸/۵ صبح"
                                  : "Every day except holidays from 8.5 AM"}
                              </Typography>
                            </Box>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>

            {/* کارت فرم تماس */}
            <motion.div
              custom={1}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <SupportAgent color="primary" sx={{ mr: 2, fontSize: 28 }} />
                  <Typography variant="h5" fontWeight={600}>
                    {language === "fa" ? "فرم تماس با ما" : "Contact Form"}
                  </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                  <Stack spacing={2}>
                    <TextField
                      label={language === "fa" ? "نام" : "First Name"}
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                    />
                    <TextField
                      label={language === "fa" ? "نام خانوادگی" : "Last Name"}
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                    />
                    <TextField
                      label={language === "fa" ? "شماره تماس" : "Phone Number"}
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.phone}
                      helperText={errors.phone}
                    />
                    <TextField
                      label={language === "fa" ? "پیام" : "Message"}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={5}
                      error={!!errors.message}
                      helperText={errors.message}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      {language === "fa" ? "ارسال پیام" : "Send Message"}
                    </Button>
                    {status && (
                      <Alert severity={status.type} sx={{ mt: 2 }}>
                        {status.text}
                      </Alert>
                    )}
                  </Stack>
                </form>
              </Paper>
            </motion.div>

            {/* کارت سوالات متداول */}
            <motion.div variants={cardVariants}>
              <Paper sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  fontWeight={600}
                  sx={{ mb: 3 }}
                >
                  {language === "fa" ? "سوالات متداول" : "FAQ"}
                </Typography>

                <Stack spacing={2}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography fontWeight={500}>
                        {language === "fa"
                          ? "مدت زمان پاسخگویی به پیام‌ها چقدر است؟"
                          : "How long does it take to respond to messages?"}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        {language === "fa"
                          ? "معمولاً در کمتر از ۲۴ ساعت کاری پاسخ داده می‌شود. در موارد فوری می‌توانید با شماره‌های مستقیم تماس بگیرید."
                          : "Usually answered in less than 24 business hours. For urgent matters, you can call direct numbers."}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography fontWeight={500}>
                        {language === "fa"
                          ? "ویژگی‌های یک مشاور مالی خوب چیست؟"
                          : "What are the characteristics of a good financial consultant?"}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        {language === "fa"
                          ? "تجربه عملی، تخصص فنی، توانایی ارائه راهکارهای عملی و به‌روز بودن با قوانین جدید از مهم‌ترین ویژگی‌هاست."
                          : "Practical experience, technical expertise, ability to provide practical solutions and staying updated with new regulations are the most important features."}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography fontWeight={500}>
                        {language === "fa"
                          ? "آیا مشاوره اولیه رایگان است؟"
                          : "Is the initial consultation free?"}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        {language === "fa"
                          ? "بله، جلسه مشاوره اولیه به صورت رایگان و برای شناخت نیازهای شما برگزار می‌شود."
                          : "Yes, the initial consultation session is free and held to understand your needs."}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Stack>
              </Paper>
            </motion.div>

            {/* کارت مشاوره فوری */}
            <motion.div variants={cardVariants}>
              <Paper
                sx={{
                  p: 4,
                  background: "linear-gradient(135deg, #388e3c, #2e7d32)",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <SupportAgent sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />

                <Typography variant="h5" fontWeight={700} gutterBottom>
                  {language === "fa" ? "مشاوره فوری" : "Instant Consultation"}
                </Typography>

                <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                  {language === "fa"
                    ? "برای مشاوره تخصصی همین حالا تماس بگیرید"
                    : "Call now for specialized consultation"}
                </Typography>

                <Button
                  href="tel:02188305391"
                  variant="contained"
                  sx={{
                    bgcolor: "white",
                    color: "primary.main",
                    fontWeight: 700,
                    py: 1.5,
                    px: 4,
                    fontSize: "1.1rem",
                    "&:hover": {
                      bgcolor: "grey.100",
                    },
                  }}
                >
                  📞 021-88305391
                </Button>

                <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
                  {language === "fa"
                    ? "پاسخگویی همه روزه به غیر از روزهای تعطیل از ساعت ۸/۵ صبح"
                    : "Available every day except holidays from 8.5 AM"}
                </Typography>
              </Paper>
            </motion.div>

            {/* کارت نقشه */}
            <motion.div variants={cardVariants}>
              <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  {language === "fa"
                    ? "موقعیت دفاتر روی نقشه"
                    : "Office Locations on Map"}
                </Typography>
                <Box sx={{ borderRadius: 2, overflow: "hidden", mt: 2 }}>
                  <iframe
                    title="map"
                    src="https://www.google.com/maps?q=35.720722,51.421000&hl=fa&z=16&output=embed"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </Box>
              </Paper>
            </motion.div>
          </Stack>
        </motion.div>
      </motion.div>
    </Container>
  );
}
