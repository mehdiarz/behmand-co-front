import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminBlogForm() {
  const { id } = useParams(); // اگر id وجود داشته باشه یعنی ویرایش
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    tags: "",
    author: "",
  });
  const [coverImage, setCoverImage] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await fetch(`https://behmand-co-server.onrender.com/api/blogs/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const data = await res.json();
          if (data.error) {
            setStatus({ type: "error", text: data.error });
          } else {
            setForm({
              title: data.title,
              slug: data.slug,
              excerpt: data.excerpt,
              content: data.content,
              tags: (data.tags || []).join(","),
              author: data.author,
            });
          }
        } catch (err) {
          console.error("Error fetching blog:", err);
          setStatus({ type: "error", text: "خطا در دریافت اطلاعات بلاگ" });
        }
      })();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();

    // همه فیلدها به جز tags
    Object.entries(form).forEach(([k, v]) => {
      if (k !== "tags") fd.append(k, v);
    });

    // tags به صورت JSON
    fd.append(
      "tags",
      JSON.stringify(
        form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      ),
    );

    if (coverImage) fd.append("coverImage", coverImage);
    attachments.forEach((f) => fd.append("attachments", f));

    const url = id
      ? `https://behmand-co-server.onrender.com/api/blogs/${id}`
      : "https://behmand-co-server.onrender.com/api/blogs";
    const method = id ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: fd,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const data = await res.json();
      if (data.success || data._id) {
        setStatus({ type: "success", text: "بلاگ با موفقیت ذخیره شد ✅" });
        setTimeout(() => navigate("/admin/panel/blogs"), 1500);
      } else {
        setStatus({ type: "error", text: data.error || "خطا در ذخیره بلاگ" });
      }
    } catch (err) {
      console.error("Error saving blog:", err);
      setStatus({ type: "error", text: "❌ خطای سرور" });
    }
  };

  return (
    <Container sx={{ py: 6 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {id ? "ویرایش بلاگ" : "ایجاد بلاگ جدید"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="عنوان"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <TextField
              label="اسلاگ"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
            />
            <TextField
              label="خلاصه"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            />
            <TextField
              label="برچسب‌ها (با کاما جدا کنید)"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
            <TextField
              label="نویسنده"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />
            <TextField
              label="متن کامل"
              multiline
              minRows={6}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
            <Button variant="outlined" component="label">
              تصویر شاخص
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => setCoverImage(e.target.files[0])}
              />
            </Button>
            <Button variant="outlined" component="label">
              فایل‌های پیوست
              <input
                hidden
                multiple
                type="file"
                onChange={(e) => setAttachments(Array.from(e.target.files))}
              />
            </Button>
            <Button type="submit" variant="contained">
              ذخیره
            </Button>
            {status && (
              <Alert severity={status.type} sx={{ mt: 2 }}>
                {status.text}
              </Alert>
            )}
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
