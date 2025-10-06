// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Stack,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";
import MessageIcon from "@mui/icons-material/Message";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ArticleIcon from "@mui/icons-material/Article";
import { useNavigate } from "react-router-dom";


const API_URL = import.meta.env.VITE_API_URL;

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [customersRes, resumesRes, messagesRes, blogsRes] =
          await Promise.all([
            fetch(`${API_URL}/api/customers`),
            fetch(`${API_URL}/api/resumes`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }),
            fetch(`${API_URL}/api/messages`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }),
            fetch(`${API_URL}/api/blogs`),
          ]);

        const customers = await customersRes.json();
        const resumes = await resumesRes.json();
        const messages = await messagesRes.json();
        const blogs = await blogsRes.json();

        setStats({
          customers: customers.length,
          resumes: resumes.length,
          messages: messages.length,
          blogs: blogs.length,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>در حال بارگذاری داشبورد...</Typography>
      </Box>
    );
  }

  const cards = [
    {
      title: "مشتریان",
      value: stats.customers,
      icon: <PeopleIcon sx={{ fontSize: 50 }} />,
      color: "#1976d2",
      path: "/admin/panel/customers",
    },
    {
      title: "رزومه‌ها",
      value: stats.resumes,
      icon: <DescriptionIcon sx={{ fontSize: 50 }} />,
      color: "#2e7d32",
      path: "/admin/panel/resumes",
    },
    {
      title: "پیام‌ها",
      value: stats.messages,
      icon: <MessageIcon sx={{ fontSize: 50 }} />,
      color: "#ed6c02",
      path: "/admin/panel/messages",
    },
    {
      title: "مدیریت بلاگ‌ها",
      value: stats.blogs,
      icon: <ArticleIcon sx={{ fontSize: 50 }} />,
      color: "#0288d1",
      path: "/admin/panel/blogs",
    },
    {
      title: "صورت‌های مالی",
      value: 0, // بعداً می‌تونی از API بیاری
      icon: <AssessmentIcon sx={{ fontSize: 50 }} />,
      color: "#6d1b7b",
      path: "/admin/panel/financials",
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((c) => (
        <Grid key={c.title} size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper
            elevation={4}
            onClick={() => navigate(c.path)}
            sx={{
              p: 3,
              borderRadius: 3,
              textAlign: "center",
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": {
                boxShadow: 8,
                transform: "translateY(-6px)",
                bgcolor: "#f9f9f9",
              },
            }}
          >
            <Stack
              direction="column"
              alignItems="center"
              spacing={1}
              sx={{ color: c.color }}
            >
              {c.icon}
              <Typography variant="h6">{c.title}</Typography>
              <Typography variant="h4" fontWeight={700}>
                {c.value}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
