import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Chip,
  Stack,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  WhatsApp,
  Telegram,
  Twitter,
  LinkedIn,
  Share,
  ContentCopy,
} from "@mui/icons-material";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`https://behmand-co-server.onrender.com/api/blogs/slug/${slug}`);
        if (!res.ok) throw new Error("خطا در دریافت بلاگ");
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    })();
  }, [slug]);

  if (!blog) return null;

  const currentUrl = window.location.href;

  return (
    <Container sx={{ py: 6, mt: 5 }}>
      {/* تصویر کاور */}
      {blog.coverImage?.filePath && (
        <Paper
          sx={{
            overflow: "hidden",
            mb: 3,
            width: { xs: "100%", md: "60%" },
            mx: "auto",
          }}
        >
          <img
            src={`https://behmand-co-server.onrender.com:5000/${blog.coverImage.filePath}`}
            alt={blog.title}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </Paper>
      )}

      {/* عنوان و متا */}
      <Typography variant="h3" fontWeight={800}>
        {blog.title}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {new Date(blog.publishedAt).toLocaleDateString("fa-IR")}
        {blog.author ? ` • نویسنده: ${blog.author}` : ""}
      </Typography>

      {/* تگ‌ها */}
      <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
        {(blog.tags || []).map((t, i) => (
          <Chip key={`${blog._id}-${t}-${i}`} label={t} size="small" />
        ))}
      </Stack>

      {/* محتوای بلاگ */}
      <Typography
        sx={{ mt: 3 }}
        component="div"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* فایل‌های پیوست */}
      {blog.attachments && blog.attachments.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 4 }}>
            فایل‌های پیوست
          </Typography>
          <Stack spacing={1} sx={{ mt: 1 }}>
            {blog.attachments.map((f, i) => (
              <Button
                key={i}
                variant="outlined"
                href={`https://behmand-co-server.onrender.com:5000/${f.filePath}`}
                target="_blank"
              >
                دانلود: {f.fileName}
              </Button>
            ))}
          </Stack>
        </>
      )}

      {/* اشتراک‌گذاری */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 4, flexWrap: "wrap", alignItems: "center" }}
      >
        {/* Web Share API */}
        <Button
          variant="contained"
          startIcon={<Share />}
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: blog.title,
                text: "این مقاله رو ببین 👇",
                url: currentUrl,
              });
            } else {
              alert("مرورگر شما از اشتراک‌گذاری مستقیم پشتیبانی نمی‌کند.");
            }
          }}
        >
          اشتراک‌گذاری
        </Button>

        {/* کپی لینک */}
        <Button
          variant="outlined"
          startIcon={<ContentCopy />}
          onClick={() => navigator.clipboard.writeText(currentUrl)}
        >
          کپی لینک
        </Button>

        {/* واتساپ */}
        <IconButton
          color="success"
          href={`https://wa.me/?text=${encodeURIComponent(
            blog.title + " " + currentUrl,
          )}`}
          target="_blank"
        >
          <WhatsApp />
        </IconButton>

        {/* تلگرام */}
        <IconButton
          color="info"
          href={`https://t.me/share/url?url=${encodeURIComponent(
            currentUrl,
          )}&text=${encodeURIComponent(blog.title)}`}
          target="_blank"
        >
          <Telegram />
        </IconButton>

        {/* توییتر */}
        <IconButton
          sx={{ color: "#1DA1F2" }}
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            currentUrl,
          )}&text=${encodeURIComponent(blog.title)}`}
          target="_blank"
        >
          <Twitter />
        </IconButton>

        {/* لینکدین */}
        <IconButton
          sx={{ color: "#0A66C2" }}
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            currentUrl,
          )}`}
          target="_blank"
        >
          <LinkedIn />
        </IconButton>
      </Stack>
    </Container>
  );
}
