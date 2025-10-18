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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

  // انیمیشن پیچیده‌تر برای ورود کارت‌ها
  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.7,
        ease: "easeOut",
      },
    }),
  };

  return (
    <Container
      sx={{
        py: 8,
        mt: 5,
        maxWidth: "lg",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          {t("nav.contact")}
        </Typography>

        <Stack spacing={4} sx={{ mt: 4 }}>
          {/* کارت اطلاعات تماس (دو ستونه) */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Paper sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 4,
                }}
              >
                {/* ستون اطلاعات */}
                <Box flex={1}>
                  <Typography variant="h6" gutterBottom>
                    {language === "fa"
                      ? "نشانی دفتر مرکزی"
                      : "Head Office Address"}
                  </Typography>
                  <Typography color="text.secondary">
                    {t("contact.address")}
                  </Typography>

                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {language === "fa" ? "شماره تماس" : "Phone Numbers"}
                  </Typography>
                  <Stack spacing={1}>
                    {t("contact.phoneNumbers", { returnObjects: true }).map(
                      (num, i) => (
                        <Link
                          key={i}
                          href={`tel:${num}`}
                          underline="hover"
                          color="primary"
                        >
                          {num}
                        </Link>
                      ),
                    )}
                  </Stack>

                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {language === "fa" ? "نمابر (فکس)" : "Fax"}
                  </Typography>
                  <Typography color="text.secondary">
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

                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {language === "fa" ? "پست الکترونیک" : "Email"}
                  </Typography>
                  <Link
                    href={`mailto:${t("contact.email")}`}
                    underline="hover"
                    color="primary"
                  >
                    {t("contact.email")}
                  </Link>
                </Box>

                {/* ستون ساعات کاری + FAQ + CTA */}
                <Box flex={1}>
                  <Typography variant="h6" gutterBottom>
                    {language === "fa" ? "ساعات کاری" : "Working Hours"}
                  </Typography>
                  <Typography color="text.secondary">
                    {language === "fa"
                      ? "شنبه تا چهارشنبه: ۹ صبح تا ۵ عصر"
                      : "Saturday to Wednesday: 9 AM to 5 PM"}{" "}
                    <br />
                    {language === "fa"
                      ? "پنجشنبه: ۹ صبح تا ۲ ظهر"
                      : "Thursday: 9 AM to 2 PM"}{" "}
                    <br />
                    {language === "fa"
                      ? "جمعه و تعطیلات رسمی: تعطیل"
                      : "Friday and official holidays: Closed"}
                  </Typography>

                  <Typography variant="h6" sx={{ mt: 3 }}>
                    {language === "fa"
                      ? "سوالات متداول"
                      : "Frequently Asked Questions"}
                  </Typography>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      {language === "fa"
                        ? "ویژگی‌های یک مشاور خوب چیست؟"
                        : "What are the characteristics of a good consultant?"}
                    </AccordionSummary>
                    <AccordionDetails>
                      {language === "fa"
                        ? "تجربه، تخصص و توانایی ارائه راهکارهای عملی."
                        : "Experience, expertise and ability to provide practical solutions."}
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      {language === "fa"
                        ? "پاسخگویی به پیام‌ها چقدر طول می‌کشد؟"
                        : "How long does it take to respond to messages?"}
                    </AccordionSummary>
                    <AccordionDetails>
                      {language === "fa"
                        ? "معمولاً در کمتر از ۲۴ ساعت کاری پاسخ داده می‌شود."
                        : "Usually answered in less than 24 business hours."}
                    </AccordionDetails>
                  </Accordion>

                  <Box
                    sx={{
                      mt: 3,
                      p: 2,
                      bgcolor: "primary.main",
                      borderRadius: 2,
                      textAlign: "center",
                      color: "#fff",
                    }}
                  >
                    <Typography variant="subtitle1" gutterBottom>
                      {language === "fa"
                        ? "برای مشاوره  همین حالا تماس بگیرید"
                        : "Call now for  consultation"}
                    </Typography>
                    <Button
                      href="tel:02188305391"
                      variant="contained"
                      sx={{
                        bgcolor: "#fff",
                        color: "primary.main",
                        fontWeight: "bold",
                      }}
                    >
                      📞 021-88305391
                    </Button>
                  </Box>
                </Box>
              </Box>
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
              <Typography variant="h6" gutterBottom>
                {language === "fa" ? "فرم تماس" : "Contact Form"}
              </Typography>
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
          {/* کارت نقشه */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                {language === "fa"
                  ? "موقعیت دفتر روی نقشه"
                  : "Office Location on Map"}
              </Typography>
              <Box sx={{ borderRadius: 2, overflow: "hidden" }}>
                <iframe
                  title="map"
                  src="https://www.google.com/maps?q=35.720722,51.421000&hl=fa&z=16&output=embed"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </Box>
            </Paper>
          </motion.div>
        </Stack>
      </motion.div>
    </Container>
  );
}
