import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

export default function ResumeForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setFormData({ ...formData, file: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) return alert("لطفاً فایل رزومه را انتخاب کنید");
    setLoading(true);
    setSuccess(null);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));
      const res = await fetch("http://localhost:5000/api/resume", {
        method: "POST",
        body: data,
      });
      setSuccess(res.ok);
      if (res.ok) setFormData({ name: "", email: "", message: "", file: null });
    } catch {
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6, mt: 10 }}>
      <Typography variant="h5" align="center" gutterBottom>
        ارسال رزومه
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="نام و نام خانوادگی"
          name="name"
          margin="normal"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="ایمیل"
          name="email"
          type="email"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="توضیحات"
          name="message"
          margin="normal"
          multiline
          rows={4}
          value={formData.message}
          onChange={handleChange}
        />
        <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
          {formData.file ? formData.file.name : "انتخاب فایل رزومه"}
          <input
            type="file"
            hidden
            name="file"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
          />
        </Button>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={22} /> : "ارسال"}
        </Button>
        {success === true && (
          <Typography align="center" sx={{ mt: 2 }} color="success.main">
            رزومه با موفقیت ارسال شد ✅
          </Typography>
        )}
        {success === false && (
          <Typography align="center" sx={{ mt: 2 }} color="error.main">
            خطایی رخ داد ❌ دوباره تلاش کنید
          </Typography>
        )}
      </Box>
    </Container>
  );
}
