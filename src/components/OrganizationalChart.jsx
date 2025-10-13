import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const OrganizationalChart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const personnelData = [
    {
      role: "شريك/Partner",
      count: 10,
      color: "#8884d8",
      education: "لیسانس، فوق لیسانس و دکتری",
    },
    {
      role: "مدير/Manager",
      count: 14,
      color: "#82ca9d",
      education: "لیسانس و فوق لیسانس",
    },
    {
      role: "سرپرست ارشد/Senior Supervisor",
      count: 7,
      color: "#ffc658",
      education: "لیسانس و فوق لیسانس",
    },
    {
      role: "سرپرست/Supervisor",
      count: 10,
      color: "#ff8042",
      education: "لیسانس و فوق لیسانس",
    },
    {
      role: "حسابرس ارشد/Senior Auditor",
      count: 16,
      color: "#0088fe",
      education: "لیسانس، فوق لیسانس و دکتری",
    },
    {
      role: "حسابرس/Auditor",
      count: 54,
      color: "#00c49f",
      education: "لیسانس و فوق لیسانس",
    },
    {
      role: "كمك حسابرس/Auditor Assistant",
      count: 10,
      color: "#ffbb28",
      education: "لیسانس و فوق لیسانس و دو نفر دانشجو",
    },
    {
      role: "همکاران اداری/Office",
      count: 9,
      color: "#a4de6c",
      education: "-",
    },
    {
      role: "کارشناس رایانه / Computer expert",
      count: 2,
      color: "#d0ed57",
      education: "-",
    },
  ];

  const total = personnelData.reduce((sum, item) => sum + item.count, 0);

  const chartData = personnelData.map((item) => ({
    ...item,
    percentage: ((item.count / total) * 100).toFixed(1),
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          elevation={3}
          sx={{
            p: 2,
            background: "rgba(255, 255, 255, 0.95)",
            border: "1px solid #ddd",
          }}
        >
          <Typography variant="body2" fontWeight="bold">
            {payload[0].payload.role.split("/")[0]}
          </Typography>
          <Typography variant="body2">تعداد: {payload[0].value}</Typography>
          <Typography variant="body2" color="primary">
            درصد: {payload[0].payload.percentage}%
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box sx={{ mt: 8, mb: 4, px: { xs: 2, sm: 3 } }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 800,
          mb: 4,
          background: "linear-gradient(45deg, #2e7d32, #81c784)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        ساختار سازمانی
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 4,
          alignItems: "flex-start",
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        {/* Chart Section */}
        <Box
          sx={{
            width: { xs: "100%", lg: "40%" },
            minHeight: 400,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600, mb: 2 }}
          >
            نمودار توزیع پرسنل
          </Typography>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ role, percentage }) =>
                  isMobile ? "" : `${percentage}%`
                }
                outerRadius={isSmallMobile ? 80 : isMobile ? 100 : 120}
                fill="#8884d8"
                dataKey="count"
                nameKey="role"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              {!isMobile && (
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{
                    paddingLeft: 20,
                    fontSize: "12px",
                  }}
                  formatter={(value, entry) => (
                    <span style={{ fontSize: "11px", color: "#333" }}>
                      {value.split("/")[0]}
                    </span>
                  )}
                />
              )}
            </PieChart>
          </ResponsiveContainer>

          {isMobile && (
            <Box
              sx={{
                mt: 2,
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 1,
                width: "100%",
                maxWidth: 400,
              }}
            >
              {chartData.slice(0, 6).map((item, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      backgroundColor: item.color,
                      borderRadius: "50%",
                    }}
                  />
                  <Typography variant="caption">
                    {item.role.split("/")[0]}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Table Section */}
        <Box
          sx={{
            width: { xs: "100%", lg: "60%" },
            overflow: "hidden",
          }}
        >
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600, mb: 2 }}
          >
            جدول آمار پرسنل
          </Typography>

          <TableContainer
            component={Paper}
            sx={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <Table sx={{ minWidth: isSmallMobile ? 300 : 400 }}>
              <TableHead>
                <TableRow
                  sx={{
                    background: "linear-gradient(45deg, #2e7d32, #4caf50)",
                    "& th": {
                      color: "white",
                      fontWeight: 700,
                      fontSize: isSmallMobile ? "0.8rem" : "0.9rem",
                      textAlign: "center",
                      py: 2,
                    },
                  }}
                >
                  <TableCell>ردیف</TableCell>
                  <TableCell>رده سازمانی</TableCell>
                  <TableCell>تعداد نفرات</TableCell>
                  <TableCell>درصد</TableCell>
                  <TableCell>سطح تحصیلات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {chartData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor: "rgba(0, 0, 0, 0.02)",
                      },
                      "&:hover": {
                        backgroundColor: "rgba(76, 175, 80, 0.08)",
                        transform: "scale(1.01)",
                        transition: "all 0.2s ease",
                      },
                      "& td": {
                        textAlign: "center",
                        py: 1.5,
                        fontSize: isSmallMobile ? "0.75rem" : "0.85rem",
                        borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
                      },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      {isSmallMobile ? row.role.split("/")[0] : row.role}
                    </TableCell>
                    <TableCell>{row.count}</TableCell>
                    <TableCell sx={{ color: "primary.main", fontWeight: 700 }}>
                      {row.percentage}%
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: isSmallMobile ? "0.65rem" : "0.75rem",
                        lineHeight: 1.4,
                        maxWidth: 150,
                      }}
                    >
                      {row.education}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow
                  sx={{
                    backgroundColor: "rgba(46, 125, 50, 0.1)",
                    "& td": {
                      fontWeight: 700,
                      textAlign: "center",
                      py: 2,
                      fontSize: isSmallMobile ? "0.75rem" : "0.85rem",
                    },
                  }}
                >
                  <TableCell colSpan={2}>جمع کل</TableCell>
                  <TableCell>{total}</TableCell>
                  <TableCell>100%</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default OrganizationalChart;
