// src/pages/CustomersAdmin.jsx
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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function CustomersAdmin() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);
  const [name, setName] = useState("");

  // گرفتن لیست مشتری‌ها
  const fetchCustomers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/customers", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setCustomers(data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // افزودن یا ویرایش مشتری
  const handleSave = async () => {
    try {
      if (editCustomer) {
        // ویرایش
        await fetch(`http://localhost:5000/api/customers/${editCustomer._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ name }),
        });
      } else {
        // افزودن
        await fetch("http://localhost:5000/api/customers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ name }),
        });
      }
      setOpenDialog(false);
      setName("");
      setEditCustomer(null);
      fetchCustomers();
    } catch (err) {
      console.error("Error saving customer:", err);
    }
  };

  // حذف مشتری
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/customers/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCustomers(customers.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting customer:", err);
    }
  };

  return (
    <Container sx={{ py: 6 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h5" fontWeight={600}>
          مدیریت مشتریان
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setEditCustomer(null);
            setName("");
            setOpenDialog(true);
          }}
        >
          افزودن مشتری جدید
        </Button>
      </Stack>

      {loading ? (
        <Typography>در حال بارگذاری...</Typography>
      ) : customers.length === 0 ? (
        <Typography>هیچ مشتری ثبت نشده است.</Typography>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.100" }}>
                <TableCell>ردیف</TableCell>
                <TableCell>نام مشتری</TableCell>
                <TableCell align="center">عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((c, idx) => (
                <TableRow key={c._id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{c.name}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={2} justifyContent="center">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          setEditCustomer(c);
                          setName(c.name);
                          setOpenDialog(true);
                        }}
                      >
                        ویرایش
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(c._id)}
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

      {/* دیالوگ افزودن/ویرایش */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {editCustomer ? "ویرایش مشتری" : "افزودن مشتری جدید"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="نام مشتری"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>انصراف</Button>
          <Button variant="contained" onClick={handleSave}>
            ذخیره
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
