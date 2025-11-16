import React, { useState, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  Button,
  Stack,
  alpha,
  useTheme,
  IconButton,
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import {
  Close,
  NavigateBefore,
  NavigateNext,
  ZoomIn,
  ZoomOut,
  Download,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import AboutSlider from "../components/slider/AboutSlider.jsx";


import bg1 from "../assets/parvaneh.png";
import bg2 from "../assets/bg2.png";
import bg3 from "../assets/bg-building.jpg";

import bg4 from "../assets/bg-1.jpg";
import bg5 from "../assets/bg-2.jpg";
import bg7 from "../assets/bg-4.jpg";
// import bg8 from "../assets/bg-5.jpg";
import bg6 from "../assets/bg-3.jpg";
import bg9 from "../assets/bg-6.jpg";


import gallery1 from "../assets/gallery-1.jpg";


// تصاویر نمونه
// const GALLERY_IMAGES = [
//   "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
//   "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
//   "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
//   "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
//   "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
//   "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
//     bg2,
//     bg3,
//     bg1
// ];

const GALLERY_IMAGES = [
    bg4,
    bg5,
    bg3,
    bg2,
    bg1,
    gallery1,
    bg6,
    bg7,
    // bg8,
    bg9
];


export default function GalleryPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down(400));
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  // دسته‌بندی‌های دو زبانه
  const galleryCategories = [
    { key: "all", label: language === "fa" ? "همه تصاویر" : "All Images" },
      {
          key: "team",
          label: language === "fa" ? "تیم حرفه‌ای" : "Professional Team",
      },
    { key: "office", label: language === "fa" ? "فضای اداری" : "Office Space" },
    // { key: "projects", label: language === "fa" ? "پروژه‌ها" : "Projects" },
    { key: "events", label: language === "fa" ? "رویدادها" : "Events" },
  ];

  const filteredImages =
    selectedCategory === "all" ? GALLERY_IMAGES : GALLERY_IMAGES;

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setIsLightboxOpen(true);
    setZoomLevel(1);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
    setZoomLevel(1);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
    setZoomLevel(1);
  };

  const goToPrev = () => {
    const prevIndex =
      (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 1));
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = selectedImage;
    link.download = `gallery-image-${currentIndex + 1}.jpg`;
    link.click();
  };

  // مدیریت رویدادهای کیبورد در لایت‌بکس
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isLightboxOpen) return;

      switch (event.key) {
        case "Escape":
          handleCloseLightbox();
          break;
        case "ArrowRight":
          goToNext();
          break;
        case "ArrowLeft":
          goToPrev();
          break;
        case "+":
        case "=":
          handleZoomIn();
          break;
        case "-":
          handleZoomOut();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, currentIndex]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        pt: { xs: 1, sm: 2 },
        mt: { xs: 4, sm: 5 },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 3, sm: 6, md: 8 },
          px: { xs: 1.5, sm: 3, md: 4 },
        }}
      >
        {/* هدر گالری */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              textAlign: "center",
              mb: { xs: 3, sm: 6, md: 8 },
              px: { xs: 0.5, sm: 0 },
            }}
          >
            <Chip
              label={language === "fa" ? "گالری تصاویر" : "Gallery"}
              sx={{
                mb: { xs: 2, sm: 3 },
                px: { xs: 1.5, sm: 4 },
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: "0.75rem", sm: "1rem" },
                fontWeight: 700,
                background: alpha("#ffffff", 0.2),
                color: "white",
                backdropFilter: "blur(10px)",
                border: `1px solid ${alpha("#ffffff", 0.3)}`,
                height: { xs: 32, sm: 40 },
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                color: "white",
                fontSize: {
                  xs: "1.5rem",
                  sm: "2.5rem",
                  md: "3.5rem",
                  lg: "4rem",
                },
                mb: { xs: 1.5, sm: 3 },
                textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                lineHeight: 1.2,
              }}
            >
              {language === "fa" ? "گالری تصاویر" : "Gallery"}
              <Box
                component="span"
                sx={{
                  color: theme.palette.secondary.main,
                  display: "block",
                  fontSize: {
                    xs: "1.1rem",
                    sm: "1.8rem",
                    md: "2.5rem",
                    lg: "3rem",
                  },
                  mt: { xs: 0.5, sm: 1 },
                }}
              >
                {language === "fa" ? "موسسه بهمند" : "Behmand Firm"}
              </Box>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: alpha("#ffffff", 0.9),
                maxWidth: 800,
                mx: "auto",
                lineHeight: 1.6,
                fontWeight: 400,
                fontSize: {
                  xs: "0.8rem",
                  sm: "1rem",
                  md: "1.2rem",
                },
                px: { xs: 1, sm: 0 },
              }}
            >
              {language === "fa"
                ? "تصاویری از فضای کاری، تیم حرفه‌ای، پروژه‌های موفق و رویدادهای موسسه حسابرسی بهمند"
                : "Images of the workspace, professional team, successful projects and events of Behmand Audit Firm"}
            </Typography>
          </Box>
        </motion.div>

        {/* اسلایدر اصلی */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Box
            sx={{
              width: "100%",
              height: {
                xs: 200,
                sm: 300,
                md: 400,
                lg: 500,
                xl: 600,
              },
              borderRadius: { xs: 2, sm: 3, md: 4 },
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              border: `2px solid ${alpha("#ffffff", 0.2)}`,
              mb: { xs: 4, sm: 6, md: 8 },
              background: alpha("#ffffff", 0.05),
              backdropFilter: "blur(10px)",
              mx: "auto",
              maxWidth: 1200,
            }}
          >
            <AboutSlider
              images={GALLERY_IMAGES}
              interval={4000}
              height="100%"
            />
          </Box>
        </motion.div>

        {/* دسته‌بندی‌ها */}
        <Box
          sx={{
            mb: { xs: 3, sm: 5, md: 6 },
            px: { xs: 0.5, sm: 0 },
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              justifyContent: "center",
              flexWrap: "wrap",
              gap: { xs: 0.75, sm: 1.5 },
            }}
          >
            {galleryCategories.map((category) => (
              <Chip
                key={category.key}
                label={category.label}
                clickable
                onClick={() => setSelectedCategory(category.key)}
                sx={{
                  background:
                    selectedCategory === category.key
                      ? `linear-gradient(135deg, ${alpha("#ffffff", 0.3)}, ${alpha("#ffffff", 0.2)})`
                      : alpha("#ffffff", 0.1),
                  color: "white",
                  fontWeight: 600,
                  borderRadius: { xs: 1, sm: 2, md: 3 },
                  px: { xs: 1.5, sm: 3, md: 4 },
                  py: { xs: 0.5, sm: 1.5, md: 2 },
                  fontSize: {
                    xs: "0.7rem",
                    sm: "0.8rem",
                    md: "0.9rem",
                    lg: "1rem",
                  },
                  height: { xs: 28, sm: 32, md: 40 },
                  border:
                    selectedCategory === category.key
                      ? `2px solid ${alpha("#ffffff", 0.4)}`
                      : `1px solid ${alpha("#ffffff", 0.2)}`,
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                  minWidth: { xs: "auto", sm: 100 },
                  "&:hover": {
                    background: alpha("#ffffff", 0.2),
                    transform: "translateY(-2px)",
                  },
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* گالری تصاویر */}
        <Grid
          container
          spacing={{ xs: 1.5, sm: 2, md: 3 }}
          sx={{
            mb: { xs: 4, sm: 6 },
            px: { xs: 0.5, sm: 0 },
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {filteredImages.map((image, index) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={4}
              lg={4}
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: isMobile ? 1.02 : 1.05,
                  transition: { duration: 0.2 },
                }}
                style={{
                  width: "500px",
                  maxWidth: 400,
                }}
              >
                <Box
                  onClick={() => handleImageClick(image, index)}
                  sx={{
                    position: "relative",
                    borderRadius: { xs: 1.5, sm: 2, md: 3 },
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                    border: `1px solid ${alpha("#ffffff", 0.1)}`,
                    background: alpha("#ffffff", 0.05),
                    backdropFilter: "blur(10px)",
                    height: {
                      xs: 120,
                      sm: 180,
                      md: 220,
                      lg: 280,
                      xl: 300,
                    },
                    width: "100%",
                    "&:hover .gallery-overlay": {
                      opacity: 1,
                    },
                    "&:hover img": {
                      transform: isMobile ? "scale(1.05)" : "scale(1.1)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    }}
                    loading="lazy"
                  />
                  <Box
                    className="gallery-overlay"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.8)}, ${alpha(theme.palette.primary.dark, 0.8)})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      p: { xs: 1, sm: 2 },
                    }}
                  >
                    <Typography
                      variant={isMobile ? "body2" : "h6"}
                      sx={{
                        color: "white",
                        fontWeight: 700,
                        textAlign: "center",
                        fontSize: {
                          xs: "0.75rem",
                          sm: "0.85rem",
                          md: "1rem",
                        },
                      }}
                    >
                      {language === "fa" ? "مشاهده تصویر" : "View Image"}
                      <Box
                        component="span"
                        sx={{
                          display: "block",
                          fontSize: {
                            xs: "0.65rem",
                            sm: "0.75rem",
                            md: "0.9rem",
                          },
                          opacity: 0.9,
                          mt: 0.5,
                        }}
                      >
                        {index + 1} / {filteredImages.length}
                      </Box>
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* دکمه اقدام */}
        {/*<Box*/}
        {/*  sx={{*/}
        {/*    textAlign: "center",*/}
        {/*    mt: { xs: 4, sm: 6, md: 8 },*/}
        {/*    px: { xs: 1, sm: 0 },*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Button*/}
        {/*    variant="contained"*/}
        {/*    size="large"*/}
        {/*    href="/contact"*/}
        {/*    sx={{*/}
        {/*      background: `linear-gradient(135deg, ${alpha("#ffffff", 0.2)}, ${alpha("#ffffff", 0.1)})`,*/}
        {/*      color: "white",*/}
        {/*      borderRadius: { xs: 1.5, sm: 2, md: 3 },*/}
        {/*      px: { xs: 3, sm: 5, md: 6 },*/}
        {/*      py: { xs: 1, sm: 1.5, md: 2 },*/}
        {/*      fontSize: {*/}
        {/*        xs: "0.8rem",*/}
        {/*        sm: "0.9rem",*/}
        {/*        md: "1.1rem",*/}
        {/*        lg: "1.2rem",*/}
        {/*      },*/}
        {/*      fontWeight: 700,*/}
        {/*      border: `2px solid ${alpha("#ffffff", 0.3)}`,*/}
        {/*      backdropFilter: "blur(10px)",*/}
        {/*      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",*/}
        {/*      minWidth: { xs: 140, sm: 160, md: 200 },*/}
        {/*      height: { xs: 44, sm: 48, md: 56 },*/}
        {/*      "&:hover": {*/}
        {/*        background: alpha("#ffffff", 0.25),*/}
        {/*        transform: "translateY(-2px)",*/}
        {/*        boxShadow: "0 12px 40px rgba(0,0,0,0.4)",*/}
        {/*      },*/}
        {/*      transition: "all 0.3s ease",*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    {isSmallMobile*/}
        {/*      ? language === "fa"*/}
        {/*        ? "تماس"*/}
        {/*        : "Contact"*/}
        {/*      : isMobile*/}
        {/*        ? language === "fa"*/}
        {/*          ? "تماس با ما"*/}
        {/*          : "Contact Us"*/}
        {/*        : language === "fa"*/}
        {/*          ? "تماس با ما برای اطلاعات بیشتر"*/}
        {/*          : "Contact Us for More Information"}*/}
        {/*  </Button>*/}
        {/*</Box>*/}
      </Container>

      {/* لایت‌بکس (نمایش بزرگ تصویر) */}
      <Dialog
        open={isLightboxOpen}
        onClose={handleCloseLightbox}
        maxWidth="xl"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            background: "transparent",
            boxShadow: "none",
            overflow: "hidden",
            m: 0,
            ...(isMobile && {
              borderRadius: 0,
            }),
          },
        }}
      >
        <DialogContent
          sx={{
            p: 0,
            position: "relative",
            bgcolor: "transparent",
            ...(isMobile && {
              height: "100vh",
              display: "flex",
              flexDirection: "column",
            }),
          }}
        >
          {/* نوار ابزار لایت‌بکس */}
          <AppBar
            position="absolute"
            sx={{
              top: 0,
              left: 0,
              right: 0,
              background: "transparent",
              boxShadow: "none",
              bgcolor: alpha("#000000", 0.5),
              backdropFilter: "blur(10px)",
              zIndex: 1300,
            }}
          >
            <Toolbar
              sx={{
                minHeight: { xs: "48px !important", sm: "64px !important" },
                px: { xs: 1, sm: 2 },
              }}
            >
              <Typography
                variant={isMobile ? "body2" : "h6"}
                sx={{
                  flexGrow: 1,
                  color: "white",
                  fontSize: {
                    xs: "0.75rem",
                    sm: "0.9rem",
                    md: "1rem",
                  },
                }}
              >
                {language === "fa"
                  ? `تصویر ${currentIndex + 1} از ${filteredImages.length}`
                  : `Image ${currentIndex + 1} of ${filteredImages.length}`}
              </Typography>
              <Stack direction="row" spacing={0.5}>
                {!isMobile && (
                  <>
                    <IconButton
                      onClick={handleZoomOut}
                      sx={{
                        color: "white",
                        padding: { xs: "4px", sm: "6px", md: "8px" },
                        "& .MuiSvgIcon-root": {
                          fontSize: { xs: "18px", sm: "20px", md: "24px" },
                        },
                      }}
                      size={isMobile ? "small" : "medium"}
                    >
                      <ZoomOut />
                    </IconButton>
                    <IconButton
                      onClick={handleZoomIn}
                      sx={{
                        color: "white",
                        padding: { xs: "4px", sm: "6px", md: "8px" },
                        "& .MuiSvgIcon-root": {
                          fontSize: { xs: "18px", sm: "20px", md: "24px" },
                        },
                      }}
                      size={isMobile ? "small" : "medium"}
                    >
                      <ZoomIn />
                    </IconButton>
                  </>
                )}
                <IconButton
                  onClick={handleDownload}
                  sx={{
                    color: "white",
                    padding: { xs: "4px", sm: "6px", md: "8px" },
                    "& .MuiSvgIcon-root": {
                      fontSize: { xs: "18px", sm: "20px", md: "24px" },
                    },
                  }}
                  size={isMobile ? "small" : "medium"}
                >
                  <Download />
                </IconButton>
                <IconButton
                  onClick={handleCloseLightbox}
                  sx={{
                    color: "white",
                    padding: { xs: "4px", sm: "6px", md: "8px" },
                    "& .MuiSvgIcon-root": {
                      fontSize: { xs: "18px", sm: "20px", md: "24px" },
                    },
                  }}
                  size={isMobile ? "small" : "medium"}
                >
                  <Close />
                </IconButton>
              </Stack>
            </Toolbar>
          </AppBar>

          {/* تصویر اصلی */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: isMobile ? "calc(100vh - 48px)" : "100vh",
              bgcolor: alpha("#000000", 0.9),
              position: "relative",
              mt: isMobile ? "48px" : 0,
              overflow: "hidden",
              touchAction: "none",
            }}
            onClick={zoomLevel === 1 ? goToNext : undefined}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={selectedImage}
                alt={`Gallery image ${currentIndex + 1}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: zoomLevel }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                style={{
                  maxWidth: isMobile ? "95%" : "90%",
                  maxHeight: isMobile ? "95%" : "90%",
                  objectFit: "contain",
                  cursor: zoomLevel > 1 ? "grab" : "pointer",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  transform: `scale(${zoomLevel})`,
                }}
              />
            </AnimatePresence>

            {/* دکمه‌های ناوبری */}
            {filteredImages.length > 1 && !isMobile && (
              <>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrev();
                  }}
                  sx={{
                    position: "absolute",
                    left: { xs: 8, sm: 16, md: 20 },
                    color: "white",
                    bgcolor: alpha("#000000", 0.5),
                    "&:hover": { bgcolor: alpha("#000000", 0.7) },
                    width: { xs: 36, sm: 44, md: 48 },
                    height: { xs: 36, sm: 44, md: 48 },
                    "& .MuiSvgIcon-root": {
                      fontSize: { xs: "20px", sm: "24px", md: "28px" },
                    },
                  }}
                >
                  <NavigateBefore />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  sx={{
                    position: "absolute",
                    right: { xs: 8, sm: 16, md: 20 },
                    color: "white",
                    bgcolor: alpha("#000000", 0.5),
                    "&:hover": { bgcolor: alpha("#000000", 0.7) },
                    width: { xs: 36, sm: 44, md: 48 },
                    height: { xs: 36, sm: 44, md: 48 },
                    "& .MuiSvgIcon-root": {
                      fontSize: { xs: "20px", sm: "24px", md: "28px" },
                    },
                  }}
                >
                  <NavigateNext />
                </IconButton>
              </>
            )}

            {/* دکمه‌های ناوبری برای موبایل */}
            {filteredImages.length > 1 && isMobile && (
              <>
                <Box
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrev();
                  }}
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "25%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    pl: 1,
                  }}
                />
                <Box
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: "25%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    pr: 1,
                  }}
                />
              </>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
