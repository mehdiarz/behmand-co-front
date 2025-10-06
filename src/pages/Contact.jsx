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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (!form.firstName.trim()) newErrors.firstName = "نام الزامی است";
    if (!form.lastName.trim()) newErrors.lastName = "نام خانوادگی الزامی است";
    if (!phoneDigits || phoneDigits.length < 10)
      newErrors.phone = "شماره تماس معتبر وارد کنید";
    if (!form.message.trim() || form.message.length < 10)
      newErrors.message = "پیام باید حداقل ۱۰ کاراکتر باشد";
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
        setStatus({ type: "success", text: "پیام شما با موفقیت ارسال شد ✅" });
        setForm({ firstName: "", lastName: "", phone: "", message: "" });
      } else {
        setStatus({ type: "error", text: "❌ خطا در ارسال پیام" });
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setStatus({ type: "error", text: "❌ خطای سرور" });
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
    <Container sx={{ py: 8, mt: 5, maxWidth: "lg" }}>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          تماس با ما
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
                    نشانی دفتر مرکزی
                  </Typography>
                  <Typography color="text.secondary">
                    خیابان قائم مقام فراهانی – شماره ۱۱۴ – طبقه ۴ – واحد ۱۸
                  </Typography>

                  <Typography variant="h6" sx={{ mt: 2 }}>
                    شماره تماس
                  </Typography>
                  <Stack spacing={1}>
                    {[
                      "02188305391",
                      "02188843708",
                      "02188320129",
                      "02188315270",
                      "02188316283",
                    ].map((num, i) => (
                      <Link
                        key={i}
                        href={`tel:${num}`}
                        underline="hover"
                        color="primary"
                      >
                        {num}
                      </Link>
                    ))}
                  </Stack>

                  <Typography variant="h6" sx={{ mt: 2 }}>
                    نمابر (فکس)
                  </Typography>
                  <Typography color="text.secondary">02188844685</Typography>

                  <Typography variant="h6" sx={{ mt: 2 }}>
                    کدپستی
                  </Typography>
                  <Typography color="text.secondary">۱۵۸۶۹۳۶۱۴۵</Typography>

                  <Typography variant="h6" sx={{ mt: 2 }}>
                    صندوق پستی
                  </Typography>
                  <Typography color="text.secondary">۱۵۸۱۵-۱۱۳۷</Typography>

                  <Typography variant="h6" sx={{ mt: 2 }}>
                    پست الکترونیک
                  </Typography>
                  <Link
                    href="mailto:info@behmand.com"
                    underline="hover"
                    color="primary"
                  >
                    info@behmand.com
                  </Link>
                </Box>

                {/* ستون ساعات کاری + FAQ + CTA */}
                <Box flex={1}>
                  <Typography variant="h6" gutterBottom>
                    ساعات کاری
                  </Typography>
                  <Typography color="text.secondary">
                    شنبه تا چهارشنبه: ۹ صبح تا ۵ عصر <br />
                    پنجشنبه: ۹ صبح تا ۲ ظهر <br />
                    جمعه و تعطیلات رسمی: تعطیل
                  </Typography>

                  <Typography variant="h6" sx={{ mt: 3 }}>
                    سوالات متداول
                  </Typography>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      ویژگی‌های یک مشاور خوب چیست؟
                    </AccordionSummary>
                    <AccordionDetails>
                      تجربه، تخصص و توانایی ارائه راهکارهای عملی.
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      پاسخگویی به پیام‌ها چقدر طول می‌کشد؟
                    </AccordionSummary>
                    <AccordionDetails>
                      معمولاً در کمتر از ۲۴ ساعت کاری پاسخ داده می‌شود.
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
                      برای مشاوره رایگان همین حالا تماس بگیرید
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
                فرم تماس
              </Typography>
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <TextField
                    label="نام"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                  <TextField
                    label="نام خانوادگی"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                  <TextField
                    label="شماره تماس"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                  <TextField
                    label="پیام"
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
                    ارسال پیام
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
                موقعیت دفتر روی نقشه
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
