import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { NavigateBefore, NavigateNext, Pause, PlayArrow } from "@mui/icons-material";

export default function AboutSlider({
                                        images = [],
                                        interval = 5000,
                                        height = 400,
                                        showOverlay = true,
                                        showNavigation = true,
                                        autoPlay = true
                                    }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);

    useEffect(() => {
        if (!isAutoPlaying || images.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [currentIndex, isAutoPlaying, images.length, interval]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!images || images.length === 0) {
        return (
            <Box
                sx={{
                    width: "100%",
                    height: height,
                    backgroundColor: "grey.100",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 2,
                    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                }}
            >
                <Typography color="text.secondary" variant="h6">
                    در حال بارگذاری...
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: height,
                borderRadius: "inherit",
                overflow: "hidden",
                cursor: 'pointer',
            }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(autoPlay)}
        >
            {/* اسلایدر اصلی */}
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`slide-${currentIndex}`}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                    }}
                    onError={(e) => {
                        console.error('Error loading image:', images[currentIndex]);
                        e.target.style.display = 'none';
                    }}
                />
            </AnimatePresence>

            {/* Overlay اطلاعات */}
            {showOverlay && (
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                        color: "white",
                        p: 3,
                        pt: 6,
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        موسسه حسابرسی بهمند
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        ارائه خدمات تخصصی با {currentIndex + 1} دهه تجربه
                    </Typography>
                </Box>
            )}

            {/* دکمه‌های ناوبری */}
            {showNavigation && images.length > 1 && (
                <>
                    <IconButton
                        onClick={prevSlide}
                        sx={{
                            position: "absolute",
                            left: 16,
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "white",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                        }}
                    >
                        <NavigateBefore />
                    </IconButton>
                    <IconButton
                        onClick={nextSlide}
                        sx={{
                            position: "absolute",
                            right: 16,
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "white",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                        }}
                    >
                        <NavigateNext />
                    </IconButton>
                </>
            )}

            {/* کنترل پلی/پاز */}
            {images.length > 1 && (
                <IconButton
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    sx={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        color: "white",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                    }}
                >
                    {isAutoPlaying ? <Pause /> : <PlayArrow />}
                </IconButton>
            )}

            {/* نشانگر نقاط مدرن */}
            {images.length > 1 && (
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        position: "absolute",
                        bottom: 20,
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 2,
                    }}
                >
                    {images.map((_, index) => (
                        <Box
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                                goToSlide(index);
                            }}
                            sx={{
                                width: index === currentIndex ? 32 : 12,
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: index === currentIndex ? "primary.main" : "rgba(255,255,255,0.6)",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: index === currentIndex ? "primary.dark" : "rgba(255,255,255,0.8)",
                                    transform: 'scale(1.1)',
                                },
                            }}
                        />
                    ))}
                </Stack>
            )}

            {/* شماره اسلاید مدرن */}
            {images.length > 1 && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        backgroundColor: "rgba(56, 142, 60, 0.9)",
                        color: "white",
                        borderRadius: 20,
                        px: 2,
                        py: 1,
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        backdropFilter: "blur(10px)",
                        border: '1px solid rgba(255,255,255,0.2)',
                    }}
                >
                    {currentIndex + 1} / {images.length}
                </Box>
            )}

            {/* Progress Bar */}
            {images.length > 1 && isAutoPlaying && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        backgroundColor: "rgba(255,255,255,0.3)",
                    }}
                >
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: interval / 1000, ease: "linear" }}
                        style={{
                            height: "100%",
                            backgroundColor: "primary.main",
                        }}
                    />
                </Box>
            )}
        </Box>
    );
}