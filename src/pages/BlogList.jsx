import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function BlogList() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("");
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    const res = await fetch("http://localhost:5000/api/blogs");
    const data = await res.json();
    // اگر بک‌اند آرایه برگردونه
    let blogs = Array.isArray(data) ? data : [];
    // فیلتر ساده سمت کلاینت
    if (q)
      blogs = blogs.filter((b) => b.title.includes(q) || b.excerpt.includes(q));
    if (tag) blogs = blogs.filter((b) => (b.tags || []).includes(tag));
    setItems(blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, [q, tag]);

  return (
    <Container sx={{ py: 6, mt: 5 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        بلاگ
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="جستجو..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <TextField
          fullWidth
          placeholder="فیلتر بر اساس تگ"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <Button
          variant="outlined"
          onClick={() => {
            setQ("");
            setTag("");
            fetchBlogs();
          }}
        >
          پاکسازی
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {items.map((b) => (
          <Grid item xs={12} sm={6} md={4} key={b._id}>
            <Card
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/blog/${b.slug}`)}
            >
              {b.coverImage?.filePath && (
                <CardMedia
                  component="img"
                  height="180"
                  image={`http://localhost:5000/${b.coverImage.filePath}`}
                  alt={b.title}
                />
              )}
              <CardContent>
                <Typography variant="h6" fontWeight={700}>
                  {b.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(b.publishedAt).toLocaleDateString("fa-IR")}
                </Typography>
                <Typography sx={{ mt: 1 }} color="text.secondary">
                  {b.excerpt}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ mt: 1, flexWrap: "wrap" }}
                >
                  {(b.tags || []).map((t, i) => (
                    <Chip key={`${b._id}-${t}-${i}`} label={t} size="small" />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
