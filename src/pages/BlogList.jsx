import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Chip,
  Stack,
  Box,
  TextField,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://behmand-co-server.onrender.com/api/blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    })();
  }, []);

  // فیلتر بر اساس عنوان یا تگ
  const filteredBlogs = blogs.filter((blog) => {
    const titleMatch = blog.title.toLowerCase().includes(search.toLowerCase());
    const tagMatch = (blog.tags || []).some((tag) =>
      tag.toLowerCase().includes(search.toLowerCase()),
    );
    return titleMatch || tagMatch;
  });

  return (
    <Container sx={{ py: 6, mt: 5 }}>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        آخرین مقالات
      </Typography>

      {/* فیلد جستجو */}
      <TextField
        fullWidth
        placeholder="جستجو بر اساس عنوان یا تگ..."
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 4 }}
      />

      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
        <AnimatePresence>
          {filteredBlogs.map((blog, i) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Box
                component={Link}
                to={`/blog/${blog.slug}`}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  borderRadius: 2,
                  overflow: "hidden",
                  display: "block",
                  boxShadow: 2,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <img
                  src={`https://behmand-co-server.onrender.com/${blog.coverImage?.filePath}`}
                  alt={blog.title}
                  style={{
                    width: "100%",
                    display: "block",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {blog.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {blog.excerpt ||
                      blog.content.replace(/<[^>]+>/g, "").slice(0, 150) +
                        "..."}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ mt: 1, flexWrap: "wrap" }}
                  >
                    {(blog.tags || []).map((t, i) => (
                      <Chip key={i} label={t} size="small" />
                    ))}
                  </Stack>

                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ mt: 2, fontWeight: "bold" }}
                  >
                    ادامه مطلب →
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          ))}
        </AnimatePresence>
      </Masonry>
    </Container>
  );
}
