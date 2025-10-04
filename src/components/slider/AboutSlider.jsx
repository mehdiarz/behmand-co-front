import React, { useEffect, useRef, useState } from "react";
import { Box, Stack } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";

export default function AboutSlider({ images = [], interval = 4000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (paused || images.length <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [paused, images.length, interval]);

  const handlers = useSwipeable({
    onSwipedLeft: () => setIndex((i) => (i + 1) % images.length),
    onSwipedRight: () =>
      setIndex((i) => (i - 1 + images.length) % images.length),
    trackMouse: true,
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box
        {...handlers}
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 240, sm: 320, md: 400 }, // 👈 ریسپانسیو
          overflow: "hidden",
          borderRadius: 3,
          boxShadow: 4,
          backgroundColor: "#000", // 👈 پس‌زمینه برای فضای خالی
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* تصاویر */}
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            alt={`slide-${index}`}
            initial={{ opacity: 0, x: 80, scale: 1.05 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -80, scale: 0.98 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill", // 👈 تصویر کامل بدون کراپ
              display: "block",
              borderRadius: "inherit",

            }}
          />
        </AnimatePresence>

        {/* دات‌های مدرن */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "absolute",
            bottom: 16,
            left: 0,
            right: 0,
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          {images.map((_, i) => (
            <motion.div
              key={i}
              onClick={() => setIndex(i)}
              style={{
                width: 28,
                height: 6,
                borderRadius: 3,
                backgroundColor: "rgba(255,255,255,0.4)",
                cursor: "pointer",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {i === index && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: interval / 1000, ease: "linear" }}
                  style={{
                    height: "100%",
                    backgroundColor: "#1976d2",
                    borderRadius: 3,
                  }}
                />
              )}
            </motion.div>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
