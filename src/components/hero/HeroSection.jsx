import { Box, Container, Typography, Stack, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation();
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
          {t('hero.title')}
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
          {t('hero.subtitle')}
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
            {t('hero.ctaServices')}
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            href="/resumeForm"
          >
            {t('hero.ctaCareers')}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
