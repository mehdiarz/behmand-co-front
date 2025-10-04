import React from "react";
import { Box, Typography, Grid, Stack, Link, IconButton } from "@mui/material";
import {
  Phone,
  Email,
  LocationOn,
  Fax,
  MarkunreadMailbox,
  LocalPostOffice,
  Facebook,
  LinkedIn,
  Twitter,
  Instagram,
} from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #1c1c1c, #2a2a2a)",
        color: "white",
        py: 6,
        mt: "auto",
      }}
    >
      <Grid container spacing={6} justifyContent="center">
        {/* ستون معرفی */}
        <Grid item xs={12} md={3} ml={1}>
          <Typography variant="h6" gutterBottom>
            موسسه حسابرسی بهمند
          </Typography>
          <Typography variant="body2" color="grey.400">
            ارائه‌دهنده خدمات حسابرسی مستقل، مشاوره مالی و مالیاتی برای شرکت‌های
            بزرگ و کوچک.
          </Typography>
        </Grid>

        {/* ستون پیوندها */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            پیوندها
          </Typography>
          <Stack spacing={1}>
            {[
              { text: "جامعه حسابداران رسمی ایران", url: "https://iacpa.ir/" },
              {
                text: "سازمان بورس و اوراق بهادار",
                url: "https://www.seo.ir/",
              },
              { text: "سازمان حسابرسی", url: "https://audit.org.ir/" },
              {
                text: "International Federation of Accountants",
                url: "https://www.ifac.org/",
              },
              { text: "IFRS", url: "https://www.ifrs.org/" },
              { text: "مجله حسابرس", url: "https://www.hesabras.com/" },
              { text: "بانک مرکزی", url: "https://www.cbi.ir/" },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.url}
                target="_blank"
                sx={{
                  position: "relative",
                  color: "inherit",
                  textDecoration: "none",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -2,
                    right: 0,
                    width: 0,
                    height: "2px",
                    bgcolor: "primary.main",
                    transition: "width 0.3s ease",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                {item.text}
              </Link>
            ))}
          </Stack>
        </Grid>

        {/* ستون تماس با ما */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            تماس با ما
          </Typography>
          <Stack spacing={1}>
            <Link
              href="https://www.google.com/maps?q=35.720722,51.421000"
              target="_blank"
              sx={{
                position: "relative",
                color: "inherit",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -2,
                  right: 0,
                  width: 0,
                  height: "2px",
                  bgcolor: "primary.main",
                  transition: "width 0.3s ease",
                },
                "&:hover::after": {
                  width: "100%",
                },
              }}
            >
              <LocationOn fontSize="small" sx={{ mr: 1 }} />
              خیابان قائم مقام فراهانی – شماره ۱۱۴ – طبقه ۴ – واحد ۱۸
            </Link>

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
                sx={{
                  position: "relative",
                  color: "inherit",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -2,
                    right: 0,
                    width: 0,
                    height: "2px",
                    bgcolor: "primary.main",
                    transition: "width 0.3s ease",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                <Phone fontSize="small" sx={{ mr: 1 }} /> {num}
              </Link>
            ))}

            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Fax fontSize="small" sx={{ mr: 1 }} /> 02188844685
            </Typography>
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <LocalPostOffice fontSize="small" sx={{ mr: 1 }} /> کدپستی:
              ۱۵۸۶۹۳۶۱۴۵
            </Typography>
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <MarkunreadMailbox fontSize="small" sx={{ mr: 1 }} /> صندوق پستی:
              ۱۵۸۱۵-۱۱۳۷
            </Typography>

            <Link
              href="mailto:info@behmand.com"
              sx={{
                position: "relative",
                color: "inherit",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -2,
                  right: 0,
                  width: 0,
                  height: "2px",
                  bgcolor: "primary.main",
                  transition: "width 0.3s ease",
                },
                "&:hover::after": {
                  width: "100%",
                },
              }}
            >
              <Email fontSize="small" sx={{ mr: 1 }} /> info@behmand.com
            </Link>
          </Stack>
        </Grid>

        {/* ستون شبکه‌های اجتماعی */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            ما را دنبال کنید
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton
              color="inherit"
              href="#"
              sx={{ transition: "0.3s", "&:hover": { color: "#1877F2" } }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              color="inherit"
              href="#"
              sx={{ transition: "0.3s", "&:hover": { color: "#0A66C2" } }}
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              color="inherit"
              href="#"
              sx={{ transition: "0.3s", "&:hover": { color: "#1DA1F2" } }}
            >
              <Twitter />
            </IconButton>
            <IconButton
              color="inherit"
              href="#"
              sx={{ transition: "0.3s", "&:hover": { color: "#E4405F" } }}
            >
              <Instagram />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>

      {/* کپی‌رایت */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="body2" color="grey.500">
          © {new Date().getFullYear()} Behmand Co. | کلیه حقوق محفوظ است
        </Typography>
      </Box>
    </Box>
  );
}
