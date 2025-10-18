import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  Chip,
  Button,
  Modal,
  Fade,
  alpha,
  useTheme,
} from "@mui/material";
import {
  Calculate,
  ShowChart,
  Paid,
  Security,
  Timeline,
  SupportAgent,
  ArrowForward,
  Groups,
  Assignment,
  TrendingUp,
  EmojiPeople,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import BalanceIcon from "@mui/icons-material/Balance";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import GavelIcon from "@mui/icons-material/Gavel";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AssessmentIcon from "@mui/icons-material/Assessment";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: 600, md: 700 },
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  maxHeight: "80vh",
  overflowY: "auto",
  border: "1px solid",
  borderColor: "divider",
};

export default function ServicesSection() {
  const { t } = useTranslation();
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedService(null);
  };

  const services = [
    {
      icon: <Calculate sx={{ fontSize: 48, color: "primary.main" }} />,
      title: t("services.audit"),
      desc: t("services.audit"),
      fullDesc: t("services.audit"),
      color: "primary",
    },
    {
      icon: <Timeline sx={{ fontSize: 48, color: "success.main" }} />,
      title: t("services.consulting"),
      desc: t("services.consulting"),
      fullDesc: t("services.consulting"),
      color: "success",
    },
    {
      icon: <Paid sx={{ fontSize: 48, color: "warning.main" }} />,
      title: t("services.tax"),
      desc: t("services.tax"),
      fullDesc: t("services.tax"),
      color: "warning",
    },
    {
      icon: <BalanceIcon sx={{ fontSize: 48, color: "secondary.main" }} />,
      title: t("services.accounting"),
      desc: t("services.accounting"),
      fullDesc: t("services.accounting"),
      color: "secondary",
    },
  ];

  const features = [
    {
      icon: <Groups sx={{ fontSize: 48, color: "primary.main" }} />,
      title: t("home.about.title"),
      desc: t("home.about.subtitle"),
    },
    {
      icon: <Assignment sx={{ fontSize: 48, color: "primary.main" }} />,
      title: t("home.about.title"),
      desc: t("home.about.subtitle"),
    },
    {
      icon: <TrendingUp sx={{ fontSize: 48, color: "primary.main" }} />,
      title: t("home.about.title"),
      desc: t("home.about.subtitle"),
    },
    {
      icon: <EmojiPeople sx={{ fontSize: 48, color: "primary.main" }} />,
      title: t("home.about.title"),
      desc: t("home.about.subtitle"),
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "background.default",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Chip
              label={t("home.services.subtitle")}
              sx={{
                mb: 3,
                px: 3,
                py: 1,
                fontSize: "0.9rem",
                fontWeight: 700,
                background: "linear-gradient(135deg, #388e3c, #66bb6a)",
                color: "white",
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                color: "text.primary",
                fontSize: { xs: "2.5rem", md: "3rem" },
                mb: 3,
              }}
            >
              {t("home.services.title")}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                maxWidth: 800,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              {t("home.services.subtitle")}
            </Typography>
          </motion.div>
        </Box>

        {/* Services Grid */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: `0 20px 40px ${alpha(theme.palette[service.color].main, 0.15)}`,
                      borderColor: `${service.color}.main`,
                    },
                  }}
                  onClick={() => handleOpenModal(service)}
                >
                  <CardContent sx={{ p: 4, textAlign: "center" }}>
                    <Box sx={{ mb: 3 }}>{service.icon}</Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: "text.primary",
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        lineHeight: 1.6,
                        mb: 3,
                      }}
                    >
                      {service.desc}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      endIcon={<ArrowForward />}
                      sx={{
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        fontWeight: 600,
                        borderColor: `${service.color}.main`,
                        color: `${service.color}.main`,
                        "&:hover": {
                          bgcolor: `${service.color}.main`,
                          color: "white",
                        },
                      }}
                    >
                      {t("common.learnMore")}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Features Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "text.primary",
              mb: 2,
            }}
          >
            {t("home.about.title")}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              maxWidth: 600,
              mx: "auto",
              mb: 6,
            }}
          >
            {t("home.about.subtitle")}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Box sx={{ textAlign: "center", p: 3 }}>
                  <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: "text.primary",
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.desc}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Service Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={modalStyle}>
            {selectedService && (
              <>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  {selectedService.icon}
                  <Typography
                    variant="h4"
                    sx={{
                      ml: 2,
                      fontWeight: 800,
                      color: "text.primary",
                    }}
                  >
                    {selectedService.title}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.8,
                    fontSize: "1.1rem",
                  }}
                >
                  {selectedService.fullDesc}
                </Typography>
                <Box sx={{ mt: 4, textAlign: "center" }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleCloseModal}
                    sx={{
                      borderRadius: 3,
                      px: 4,
                      py: 1.5,
                      fontWeight: 700,
                    }}
                  >
                    {t("common.readMore")}
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}