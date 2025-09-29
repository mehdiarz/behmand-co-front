"use client";
import { useMemo, useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomersPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // گرفتن دیتا از API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/customers");
        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        console.error("❌ Error fetching customers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  // فیلتر
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter((c) => c.name.toLowerCase().includes(q));
  }, [query, customers]);

  // صفحه‌بندی
  const paginated = useMemo(() => {
    const start = page * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>در حال بارگذاری...</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, mt: 5 }}>
      <Container>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          فهرست مشتریان
        </Typography>

        <TextField
          fullWidth
          placeholder="جستجوی نام مشتری..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(0);
          }}
          sx={{ mb: 3 }}
        />

        <Paper
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "grey.100" }}>
                  <TableCell sx={{ fontWeight: 600 }}>ردیف</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>نام مشتری</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <AnimatePresence>
                  {paginated.length > 0 ? (
                    paginated.map((row, idx) => (
                      <motion.tr
                        key={row._id || row.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <TableCell>{page * rowsPerPage + idx + 1}</TableCell>
                        <TableCell>{row.name}</TableCell>
                      </motion.tr>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} align="center" sx={{ py: 4 }}>
                        هیچ نتیجه‌ای یافت نشد
                      </TableCell>
                    </TableRow>
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={filtered.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            labelRowsPerPage="تعداد در هر صفحه"
          />
        </Paper>
      </Container>
    </Box>
  );
}
