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
    <Box sx={{ bgcolor: "grey.900", color: "white", py: 6, mt: "auto" }}>
      <Grid container spacing={6} justifyContent="center">
        {/* ستون معرفی */}
        <Grid item xs={12} md={3}>
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
            <Link
              href="https://iacpa.ir/"
              target="_blank"
              color="inherit"
              underline="hover"
            >
              جامعه حسابداران رسمی ایران
            </Link>
            <Link
              href="https://www.seo.ir/"
              target="_blank"
              color="inherit"
              underline="hover"
            >
              سازمان بورس و اوراق بهادار
            </Link>
            <Link
              href="https://audit.org.ir/"
              target="_blank"
              color="inherit"
              underline="hover"
            >
              سازمان حسابرسی ایران
            </Link>
            <Link
              href="https://www.ifac.org/"
              target="_blank"
              color="inherit"
              underline="hover"
            >
              International Federation of Accountants
            </Link>
            <Link
              href="https://www.ifrs.org/"
              target="_blank"
              color="inherit"
              underline="hover"
            >
              IFRS
            </Link>
            <Link
              href="https://www.hesabras.com/"
              target="_blank"
              color="inherit"
              underline="hover"
            >
              مجله حسابرس
            </Link>
            <Link
              href="https://www.cbi.ir/"
              target="_blank"
              color="inherit"
              underline="hover"
            >
              بانک مرکزی
            </Link>
          </Stack>
        </Grid>

        {/* ستون تماس با ما */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            تماس با ما
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              <LocationOn fontSize="small" sx={{ mr: 1 }} />
              خیابان قائم مقام فراهانی – شماره ۱۱۴ – طبقه ۴ – واحد ۱۸
            </Typography>
            <Typography variant="body2">
              <Phone fontSize="small" sx={{ mr: 1 }} />
              02188305391 - 02188843708 - 02188320129
            </Typography>
            <Typography variant="body2">
              <Phone fontSize="small" sx={{ mr: 1 }} />
              02188315270 - 02188316283
            </Typography>
            <Typography variant="body2">
              <Fax fontSize="small" sx={{ mr: 1 }} />
              02188844685
            </Typography>
            <Typography variant="body2">
              <LocalPostOffice fontSize="small" sx={{ mr: 1 }} />
              کدپستی: ۱۵۸۶۹۳۶۱۴۵
            </Typography>
            <Typography variant="body2">
              <MarkunreadMailbox fontSize="small" sx={{ mr: 1 }} />
              صندوق پستی: ۱۵۸۱۵-۱۱۳۷
            </Typography>
            <Typography variant="body2">
              <Email fontSize="small" sx={{ mr: 1 }} />
              info@behmand.com
            </Typography>
          </Stack>
        </Grid>

        {/* ستون شبکه‌های اجتماعی */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            ما را دنبال کنید
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton color="inherit" href="#">
              <Facebook />
            </IconButton>
            <IconButton color="inherit" href="#">
              <LinkedIn />
            </IconButton>
            <IconButton color="inherit" href="#">
              <Twitter />
            </IconButton>
            <IconButton color="inherit" href="#">
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
