import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Button,
  Chip,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import app from "../App.jsx";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminResumes() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/admin/login");
  }, [token, navigate]);

  const fetchResumes = async () => {
    try {
      const res = await fetch(`${API_URL}/api/resumes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        localStorage.removeItem("token");
        navigate("/admin/login");
        return;
      }
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Error fetching resumes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchResumes();
  }, [token]);

  const download = async (id, fileName) => {
    try {
      const res = await fetch(`${API_URL}/api/resumes/${id}/file`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        localStorage.removeItem("token");
        navigate("/admin/login");
        return;
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName || "resume";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading file:", err);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await fetch(`${API_URL}/api/resumes/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      fetchResumes();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography align="center">در حال بارگذاری...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 8, mt: 10 }}>
      <Typography variant="h4" gutterBottom fontWeight={700} align="center">
        رزومه‌های دریافتی
      </Typography>

      {items.length === 0 ? (
        <Typography align="center" sx={{ mt: 4 }}>
          هیچ رزومه‌ای ثبت نشده است.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {items.map((r) => (
            <Grid item xs={12} sm={6} md={4} key={r._id}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: 2,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6, transform: "translateY(-4px)" },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {r.name}
                  </Typography>
                  <Typography color="text.secondary">{r.email}</Typography>
                  <Typography sx={{ mt: 1 }} color="text.secondary">
                    {r.message}
                  </Typography>

                  {/* وضعیت رزومه */}
                  <Box sx={{ mt: 2 }}>
                    <Chip
                      label={
                        r.status === "new"
                          ? "جدید"
                          : r.status === "reviewed"
                            ? "بررسی‌شده"
                            : "بایگانی"
                      }
                      color={
                        r.status === "new"
                          ? "warning"
                          : r.status === "reviewed"
                            ? "success"
                            : "default"
                      }
                      variant="outlined"
                    />
                  </Box>

                  {/* دکمه‌ها */}
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ mt: 3, flexWrap: "wrap" }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => download(r._id, r.fileName)}
                    >
                      دانلود رزومه
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() =>
                        changeStatus(
                          r._id,
                          r.status === "new"
                            ? "reviewed"
                            : r.status === "reviewed"
                              ? "archived"
                              : "new",
                        )
                      }
                    >
                      تغییر وضعیت
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
