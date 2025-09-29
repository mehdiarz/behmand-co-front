import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Chip,
  Stack,
  Paper,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/slug/${slug}`);
        if (!res.ok) throw new Error("خطا در دریافت بلاگ");
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    })();
  }, [slug]);

  if (!blog) return null;

  return (
    <Container sx={{ py: 6, mt: 5 }}>
      {blog.coverImage?.filePath && (
        <Paper sx={{ overflow: "hidden", mb: 3 }}>
          <img
            src={`http://localhost:5000/${blog.coverImage.filePath}`}
            alt={blog.title}
            style={{ width: "100%", maxHeight: 420, objectFit: "cover" }}
          />
        </Paper>
      )}

      <Typography variant="h3" fontWeight={800}>
        {blog.title}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {new Date(blog.publishedAt).toLocaleDateString("fa-IR")}
        {blog.author ? ` • نویسنده: ${blog.author}` : ""}
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
        {(blog.tags || []).map((t, i) => (
          <Chip key={`${blog._id}-${t}-${i}`} label={t} size="small" />
        ))}
      </Stack>

      <Typography
        sx={{ mt: 3 }}
        component="div"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

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
                href={`http://localhost:5000/${f.filePath}`}
                target="_blank"
              >
                دانلود: {f.fileName}
              </Button>
            ))}
          </Stack>
        </>
      )}

      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button
          variant="contained"
          onClick={() =>
            navigator.share?.({ title: blog.title, url: window.location.href })
          }
        >
          اشتراک‌گذاری
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigator.clipboard.writeText(window.location.href)}
        >
          کپی لینک
        </Button>
      </Stack>
    </Container>
  );
}
