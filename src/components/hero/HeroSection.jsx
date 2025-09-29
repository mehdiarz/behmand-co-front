import { Box, Container, Typography, Stack, Button } from "@mui/material";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <Box sx={{ textAlign: "center", py: { xs: 10, md: 16 } }}>
      <Container>
        <Typography
          component={motion.h1}
          variant="h3"
          gutterBottom
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{ fontWeight: 700, textShadow: "0 2px 6px rgba(0,0,0,0.6)" }}
        >
          موسسه حسابرسی بهمند
        </Typography>

        <Typography
          component={motion.p}
          variant="h6"
          sx={{
            maxWidth: 800,
            mx: "auto",
            mb: 3,
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          ارائه‌دهنده خدمات حسابرسی، مشاوره مالی و مالیاتی برای کسب‌وکارهای کوچک
          تا سازمان‌های بزرگ
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            href="/services"
          >
            مشاهده خدمات
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            href="/resumeForm"
          >
            فرصت‌های شغلی
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
