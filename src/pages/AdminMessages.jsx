// src/pages/AdminMessages.jsx
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
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
const API_URL = import.meta.env.VITE_API_URL;

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const token = localStorage.getItem("token");

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_URL}/api/messages`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleOpenMessage = async (msg) => {
    setSelectedMessage(msg);
    setOpen(true);

    if (!msg.read) {
      try {
        await fetch(`${API_URL}/api/messages/${msg._id}/read`, {
          method: "PATCH",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        // Optimistic update: تغییر وضعیت همان پیام در state بدون درخواست مجدد
        setMessages((prev) =>
          prev.map((m) => (m._id === msg._id ? { ...m, read: true } : m)),
        );
        setSelectedMessage((prev) => (prev ? { ...prev, read: true } : prev));
      } catch (err) {
        console.error("Error marking as read:", err);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMessage(null);
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("حذف این پیام قطعی است. مطمئن هستید؟");
    if (!ok) return;

    try {
      await fetch(`${API_URL}/api/messages/${id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setMessages((prev) => prev.filter((m) => m._id !== id));
      // اگر از داخل پاپ‌آپ حذف شد، ببند
      if (selectedMessage && selectedMessage._id === id) {
        handleClose();
      }
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 6, textAlign: "center" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>در حال بارگذاری پیام‌ها...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h5" gutterBottom>
        پیام‌های تماس با ما
      </Typography>

      {messages.length === 0 ? (
        <Typography>هیچ پیامی ثبت نشده است.</Typography>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.100" }}>
                <TableCell>نام</TableCell>
                <TableCell>شماره تماس</TableCell>
                <TableCell>وضعیت</TableCell>
                <TableCell align="center">عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.map((m) => (
                <TableRow
                  key={m._id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleOpenMessage(m)}
                >
                  <TableCell>
                    {m.firstName} {m.lastName}
                  </TableCell>
                  <TableCell>{m.phone}</TableCell>
                  <TableCell>
                    {m.read ? (
                      <Chip label="خوانده‌شده" color="success" />
                    ) : (
                      <Chip label="خوانده‌نشده" color="warning" />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={2} justifyContent="center">
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation(); // جلوگیری از باز شدن پاپ‌آپ
                          handleDelete(m._id);
                        }}
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

      {/* پاپ‌آپ نمایش پیام + حذف */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>متن پیام</DialogTitle>
        <DialogContent dividers>
          {selectedMessage && (
            <>
              <Typography variant="subtitle1" fontWeight={600}>
                {selectedMessage.firstName} {selectedMessage.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedMessage.phone}
              </Typography>
              <Typography sx={{ mt: 2, whiteSpace: "pre-wrap" }}>
                {selectedMessage.message}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                {selectedMessage.read ? (
                  <Chip label="خوانده‌شده" color="success" size="small" />
                ) : (
                  <Chip label="خوانده‌نشده" color="warning" size="small" />
                )}
              </Stack>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {selectedMessage && (
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(selectedMessage._id)}
            >
              حذف پیام
            </Button>
          )}
          <Button onClick={handleClose}>بستن</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
