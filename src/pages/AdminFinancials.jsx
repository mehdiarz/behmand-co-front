// src/pages/AdminFinancials.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";

export default function AdminFinancials() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // گرفتن لیست فایل‌ها از API
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch("https://behmand-co-server.onrender.com/api/financials", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        setFiles(data);
      } catch (err) {
        console.error("Error fetching financials:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      await fetch("https://behmand-co-server.onrender.com/api/financials", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      });
      window.location.reload(); // ساده‌ترین راه برای رفرش لیست
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://behmand-co-server.onrender.com/api/financials/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setFiles(files.filter((f) => f._id !== id));
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 6, textAlign: "center" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>در حال بارگذاری صورت‌های مالی...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h5" fontWeight={600}>
          مدیریت صورت‌های مالی
        </Typography>
        <Button variant="contained" component="label">
          آپلود فایل جدید
          <input type="file" hidden onChange={handleUpload} />
        </Button>
      </Stack>

      {files.length === 0 ? (
        <Typography>هیچ صورت مالی ثبت نشده است.</Typography>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.100" }}>
                <TableCell>ردیف</TableCell>
                <TableCell>نام فایل</TableCell>
                <TableCell>تاریخ</TableCell>
                <TableCell align="center">عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files.map((f, idx) => (
                <TableRow key={f._id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{f.fileName}</TableCell>
                  <TableCell>
                    {new Date(f.createdAt).toLocaleDateString("fa-IR")}
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={2} justifyContent="center">
                      <Button
                        variant="outlined"
                        size="small"
                        href={`https://behmand-co-server.onrender.com/${f.filePath}`}
                        target="_blank"
                      >
                        دانلود
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(f._id)}
                      >
                        حذف
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
}
