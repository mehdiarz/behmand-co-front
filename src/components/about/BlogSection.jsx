import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;


export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blogs`);
        const data = await res.json();
        setBlogs(Array.isArray(data) ? data.slice(0, 3) : []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <Box
      component={motion.div}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={containerVariants}
      sx={{ py: { xs: 10, md: 14 }, bgcolor: "grey.50" }}
    >
      <Container>
        {/* هدر بخش */}
        <Box textAlign="center" sx={{ mb: 8 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            مقالات اخیر
          </Typography>
          <Box
            sx={{
              width: 60,
              height: 3,
              bgcolor: "primary.main",
              mx: "auto",
              borderRadius: 2,
            }}
          />
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ mt: 2, maxWidth: 600, mx: "auto" }}
          >
            جدیدترین تحلیل‌ها و مطالب تخصصی در حوزه حسابرسی و مالی
          </Typography>
        </Box>

        {/* کارت‌های بلاگ */}
        <Grid container spacing={4}>
          {blogs.map((b, i) => (
            <Grid key={b._id || i} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                component={motion.div}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                sx={{
                  cursor: "pointer",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: 2,
                  "&:hover": { boxShadow: 6 },
                }}
                onClick={() => navigate(`/blog/${b.slug}`)}
              >
                {b.coverImage?.filePath && (
                  <CardMedia
                    component="img"
                    image={`${API_URL}/${b.coverImage.filePath}`}
                    alt={b.title}
                    sx={{
                      height: 220,
                      objectFit: "cover",
                      transition: "0.4s",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  />
                )}
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {b.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {b.excerpt}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {(b.tags || []).map((t, j) => (
                      <Typography
                        key={`${b._id}-${t}-${j}`}
                        variant="caption"
                        sx={{
                          px: 1,
                          py: 0.3,
                          border: "1px solid",
                          borderColor: "grey.300",
                          borderRadius: 1,
                          color: "text.secondary",
                        }}
                      >
                        {t}
                      </Typography>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* CTA پایین */}
        <Box textAlign="center" sx={{ mt: 6 }}>
          <Button variant="outlined" color="primary" size="large" href="/blog">
            مشاهده همه مقالات
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
