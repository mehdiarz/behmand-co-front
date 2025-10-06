import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminLogin() {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.error || "خطای ناشناخته");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);

      // 👇 بعد از لاگین موفق برو به صفحه‌ی رزومه‌ها
      navigate("/admin/panel");
    } catch (err) {
      console.error("Login error:", err);
      setError("خطا در اتصال به سرور");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 15, mb: 10 }}>
      <Typography variant="h5" align="center" gutterBottom>
        ورود مدیر
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="نام کاربری"
          margin="normal"
          value={username}
          onChange={(e) => setUser(e.target.value)}
        />
        <TextField
          fullWidth
          label="رمز عبور"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPass(e.target.value)}
        />
        {error && (
          <Typography color="error" align="center" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          ورود
        </Button>
      </Box>
    </Container>
  );
}
