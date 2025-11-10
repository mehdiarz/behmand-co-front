// ResumeFormFinal.jsx
import React, { useRef, useState } from "react";
import { CacheProvider } from "@emotion/react";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Paper,
  Tabs,
  Tab,
  Box,
  Grid,
  TextField,
  Button,
  IconButton,
  Typography,
  CircularProgress,
  MenuItem,
  Snackbar,
  Alert,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { motion } from "framer-motion";
import theme, { cacheRtl } from "../mui/theme.js";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/fa";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
// import moment from "moment-jalaali";
import "moment/locale/fa";
// import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
// import { AdapterMomentJalaali } from "@mui/x-date-pickers-jalaali/AdapterMomentJalaali";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { format } from "date-fns-jalali";

// moment.loadPersian({ dialect: "persian-modern" });

// import dayjs from "dayjs";
// import jalaliday from "jalaliday";
// import "dayjs/locale/fa";
//
// dayjs.extend(jalaliday);
// dayjs.locale("fa");
// dayjs.calendar("jalali");
//
// dayjs.locale("fa");

const API_URL = import.meta.env.VITE_API_URL || "";

export default function ResumeFormFinal() {
  const formRef = useRef(null);

  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    type: "info",
    message: "",
  });

  const initialState = {
    // اطلاعات فردی
    name: "",
    family: "",
    birthDate: new Date(),
    birthPlace: "",
    residenceAddress: "",
    phoneHome: "",
    mobile: "",
    workAddressPhone: "",
    email: "",
    gender: "",
    maritalStatus: "",
    childrenCount: "",
    religion: "",
    militaryStatus: "",
    // تحصیلات
    educations: [
      {
        institute: "",
        startDate: new Date(),
        endDate: new Date(),
        major: "",
        degree: "",
      },
    ],
    // زبانها
    languages: [{ name: "", reading: "", writing: "" }],
    // مهارتها و شغل
    skills: "",
    jobRequested: "",
    jobExperienceDuration: "",
    willingToWorkIn: "",
    monthsPerYearInOtherCity: "",
    // سوابق کاری
    workHistories: [
      {
        period: "",
        company: "",
        activityType: "",
        employeesCount: "",
        manager: "",
        position: "",
        supervisedCount: "",
        salaryStart: "",
        salaryEnd: "",
        description: "",
        reasonForLeaving: "",
      },
    ],
    currentlyEmployed: "",
    reasonSearching: "",
    okToContactCurrentEmployer: "",
    // معرف ها
    referees: [{ name: "", workplace: "", position: "", phone: "" }],
    otherInfo: "",
    // فایل
    file: null,
  };

  const [formData, setFormData] = useState(initialState);

  // helpers for Menu RTL - keep consistent minWidth for better readability
  const selectMenuProps = {
    MenuProps: {
      PaperProps: {
        sx: { direction: "rtl", textAlign: "right", minWidth: 200 },
      },
    },
  };

  // responsive detection
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // generic change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((s) => ({ ...s, file: files[0] }));
    } else {
      setFormData((s) => ({ ...s, [name]: value }));
    }
  };

  // date change handler
  const handleDateChange = (name, value) => {
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const updateArrayDate = (arrayName, idx, fieldName, value) => {
    setFormData((s) => {
      const arr = [...s[arrayName]];
      arr[idx][fieldName] = value;
      return { ...s, [arrayName]: arr };
    });
  };

  // array helpers
  const updateArrayItem = (arrayName, idx, fieldName, value) =>
    setFormData((s) => {
      const arr = Array.isArray(s[arrayName]) ? [...s[arrayName]] : [];
      arr[idx] = { ...arr[idx], [fieldName]: value };
      return { ...s, [arrayName]: arr };
    });

  const addArrayItem = (arrayName, template) =>
    setFormData((s) => ({
      ...s,
      [arrayName]: [...(s[arrayName] || []), template],
    }));

  const removeArrayItem = (arrayName, idx) =>
    setFormData((s) => ({
      ...s,
      [arrayName]: s[arrayName].filter((_, i) => i !== idx),
    }));

  // validation: rely on native form validation (required attributes) + extra check for file
  const validateForm = () => {
    if (!formRef.current) return false;
    const ok = formRef.current.checkValidity();
    if (!ok) {
      setAlert({
        open: true,
        type: "warning",
        message: "لطفاً همه فیلدهای الزامی را تکمیل کنید.",
      });
      return false;
    }
    if (!formData.file) {
      setAlert({
        open: true,
        type: "warning",
        message: "لطفاً فایل رزومه را انتخاب کنید.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitted) return; // prevent double
    if (!validateForm()) return;

    setLoading(true);
    try {
      // prepare FormData
      const fd = new FormData();

      // append simple fields
      const simpleFields = [
        "name",
        "family",
        "birthPlace",
        "residenceAddress",
        "phoneHome",
        "mobile",
        "workAddressPhone",
        "email",
        "gender",
        "maritalStatus",
        "childrenCount",
        "religion",
        "militaryStatus",
        "skills",
        "jobRequested",
        "jobExperienceDuration",
        "willingToWorkIn",
        "monthsPerYearInOtherCity",
        "currentlyEmployed",
        "reasonSearching",
        "okToContactCurrentEmployer",
        "otherInfo",
      ];
      simpleFields.forEach((k) => fd.append(k, formData[k] ?? ""));

      fd.append(
        "birthDate",
        formData.birthDate ? format(formData.birthDate, "yyyy-MM-dd") : "",
      );

      // arrays as JSON strings (server side: if needs specific names, adjust)
      fd.append(
        "educations",
        JSON.stringify(
          formData.educations.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? format(edu.startDate, "yyyy-MM-dd") : "",
            endDate: edu.endDate ? format(edu.endDate, "yyyy-MM-dd") : "",
          })) || [],
        ),
      );
      fd.append("languages", JSON.stringify(formData.languages || []));
      fd.append("workHistories", JSON.stringify(formData.workHistories || []));
      fd.append("referees", JSON.stringify(formData.referees || []));

      // file
      fd.append("file", formData.file);

      // console.log for dev/test
      console.log(">>> formData (preview):", {
        ...formData,
        birthDate: formData.birthDate
          ? format(formData.birthDate, "yyyy-MM-dd")
          : null,
        educations: formData.educations.map((edu) => ({
          ...edu,
          startDate: edu.startDate ? format(edu.startDate, "yyyy-MM-dd") : null,
          endDate: edu.endDate ? format(edu.endDate, "yyyy-MM-dd") : null,
        })),
        file: formData.file
          ? { name: formData.file.name, size: formData.file.size }
          : null,
      });

      // send request
      const res = await fetch(`${API_URL}/api/resume`, {
        method: "POST",
        body: fd,
      });

      if (res.ok) {
        setAlert({
          open: true,
          type: "success",
          message:
            "رزومه با موفقیت ارسال شد. از اینکه با ما تماس گرفتید سپاسگزاریم.",
        });
        setSubmitted(true); // lock form
      } else {
        // try to get message
        let text = "خطا در ارسال. لطفاً دوباره تلاش کنید.";
        try {
          const json = await res.json();
          if (json?.message) text = json.message;
        } catch {}
        setAlert({ open: true, type: "error", message: text });
      }
    } catch (err) {
      console.error(err);
      setAlert({
        open: true,
        type: "error",
        message: "خطا در ارتباط با سرور. اتصال اینترنت / سرور را بررسی کنید.",
      });
    } finally {
      setLoading(false);
    }
  };

  // small reusable TextField props to enforce consistent look
  const tfBase = {
    fullWidth: true,
    size: "small",
    variant: "outlined",
    inputProps: { style: { textAlign: "right" } },
    InputLabelProps: { shrink: true },
    disabled: submitted,
    sx: { mb: 2 },
  };

  const tabs = [
    "اطلاعات فردی",
    "تحصیلات",
    "زبان‌ها و مهارت‌ها",
    "سوابق کاری",
    "معرف‌ها و توضیحات",
    "بارگذاری رزومه",
  ];

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
          <Container
            maxWidth="lg"
            sx={{
              mt: 22,
                mb:12,
              py: { xs: 3, md: 6 },
              minHeight: { xs: "auto", md: "100vh" },
              bgcolor: "#f7f9fb",
              borderRadius: 3,
            }}
            dir="rtl"
          >
            {/* BOX INFO - کاملاً حرفه‌ای و مدرن */}
            <Paper
              sx={{
                p: { xs: 2, md: 3 },
                mb: 4,
                borderRadius: 3,
                boxShadow: "0 8px 30px rgba(16,24,40,0.04)",
                backgroundColor: "primary.main",
                background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                color: "white",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "120px",
                  height: "120px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "50%",
                  transform: "translate(30%, -30%)",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "80px",
                  height: "80px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "50%",
                  transform: "translate(-30%, 30%)",
                },
              }}
              elevation={0}
            >
              <Box position="relative" zIndex={1}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    fontWeight: 800,
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  دعوت به همکاری مؤسسه حسابرسی بهمند
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.8,
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    opacity: 0.95,
                    fontWeight: 500,
                  }}
                >
                  مؤسسه حسابرسی بهمند جهت تکمیل کادر حرفه‌ای خود در تهران و دفتر
                  اصفهان از افراد واجد شرایط در رده‌های‌حسابرس، حسابرس ارشد و
                  سرپرست و سرپرست ارشد دارای مدرک کارشناسی یا کارشناسی ارشد
                  دارای امتیاز قبولی در آزمون تعیین رتبه مورد پذیرش جامعه
                  حسابداران رسمی ایران دعوت به همکاری می‌نماید. متقاضیان
                  می‌توانند جهت ارسال اطلاعات خود نسبت به تکمیل فرم استخدام
                  اقدام نمایند.
                </Typography>
              </Box>
            </Paper>
            <Paper
              sx={{
                p: { xs: 2, md: 4 },
                borderRadius: 3,
                boxShadow: "0 8px 30px rgba(16,24,40,0.04)",
                backgroundColor: "#ffffff",
              }}
              elevation={0}
            >
              <Typography
                variant="h5"
                align="center"
                sx={{ mb: 3, fontWeight: 800, color: "primary.main" }}
              >
                فرم جامع ارسال رزومه
              </Typography>

              {/* Tabs or Mobile Select */}
              <Box sx={{ mb: 3 }}>
                {isMobile ? (
                  <TextField
                    select
                    value={tab}
                    onChange={(e) => setTab(Number(e.target.value))}
                    fullWidth
                    size="small"
                    sx={{ mb: 1 }}
                  >
                    {tabs.map((t, i) => (
                      <MenuItem key={i} value={i}>
                        {t}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <Paper
                    elevation={1}
                    sx={{
                      mb: 2,
                      borderRadius: 3,
                      overflow: "hidden",
                    }}
                  >
                    <Tabs
                      value={tab}
                      onChange={(e, v) => setTab(v)}
                      variant={isMobile ? "scrollable" : "fullWidth"}
                      scrollButtons="auto"
                      sx={{
                        "& .MuiTab-root": {
                          fontWeight: 700,
                          textTransform: "none",
                        },
                        "& .MuiTabs-indicator": {
                          backgroundColor: "primary.main",
                          height: 3,
                          borderRadius: 2,
                        },
                      }}
                    >
                      {tabs.map((t, i) => (
                        <Tab key={i} label={t} />
                      ))}
                    </Tabs>
                  </Paper>
                )}
              </Box>

              <Box
                component="form"
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
              >
                <Box
                  component={motion.div}
                  key={tab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  sx={{
                    overflowY: "auto",
                    maxHeight: { xs: "auto", md: "70vh" },
                    pr: { md: 1 }, // ensure no content-hidden by scrollbar
                  }}
                >
                  {/* TAB 0: اطلاعات فردی */}
                  {tab === 0 && (
                    <Paper
                      variant="outlined"
                      sx={{
                        p: { xs: 1.5, md: 2 },
                        mb: isMobile ? 2 : 3,
                        borderRadius: 3,
                        borderColor: "divider",
                        backgroundColor: "rgba(250,250,250,0.6)",
                      }}
                      elevation={0}
                    >
                      <Grid container spacing={2} mt={3}>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            label="نام"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            {...tfBase}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            label="نام خانوادگی"
                            name="family"
                            required
                            value={formData.family}
                            onChange={handleChange}
                            {...tfBase}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                          <DatePicker
                            label="تاریخ تولد"
                            value={formData.birthDate}
                            onChange={(newValue) =>
                              handleDateChange("birthDate", newValue)
                            }
                            slotProps={{
                              textField: { ...tfBase, required: true },
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            label="محل تولد"
                            name="birthPlace"
                            required
                            value={formData.birthPlace}
                            onChange={handleChange}
                            {...tfBase}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            label="آدرس محل سکونت"
                            name="residenceAddress"
                            required
                            value={formData.residenceAddress}
                            onChange={handleChange}
                            {...tfBase}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            label="تلفن محل سکونت"
                            name="phoneHome"
                            required
                            value={formData.phoneHome}
                            onChange={handleChange}
                            {...tfBase}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            label="موبایل"
                            name="mobile"
                            required
                            value={formData.mobile}
                            onChange={handleChange}
                            {...tfBase}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            label="آدرس و تلفن محل کار"
                            name="workAddressPhone"
                            required
                            value={formData.workAddressPhone}
                            onChange={handleChange}
                            {...tfBase}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            label="آدرس ایمیل"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            {...tfBase}
                          />
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          sx={{ minWidth: "120px" }}
                        >
                          <TextField
                            fullWidth
                            select
                            label="جنسیت"
                            name="gender"
                            required
                            value={formData.gender}
                            onChange={handleChange}
                            SelectProps={selectMenuProps}
                            {...tfBase}
                          >
                            <MenuItem value="زن">زن</MenuItem>
                            <MenuItem value="مرد">مرد</MenuItem>
                          </TextField>
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          sx={{ minWidth: "130px" }}
                        >
                          <TextField
                            select
                            label="وضعیت تاهل"
                            name="maritalStatus"
                            required
                            value={formData.maritalStatus}
                            onChange={handleChange}
                            SelectProps={selectMenuProps}
                            {...tfBase}
                          >
                            <MenuItem value="مجرد">مجرد</MenuItem>
                            <MenuItem value="متأهل">متأهل</MenuItem>
                          </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            label="تعداد فرزندان"
                            name="childrenCount"
                            required
                            value={formData.childrenCount}
                            onChange={handleChange}
                            {...tfBase}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            label="مذهب"
                            name="religion"
                            required
                            value={formData.religion}
                            onChange={handleChange}
                            {...tfBase}
                          />
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          sx={{ minWidth: "120px" }}
                        >
                          <TextField
                            select
                            label="وضعیت سربازی"
                            name="militaryStatus"
                            required
                            value={formData.militaryStatus}
                            onChange={handleChange}
                            SelectProps={selectMenuProps}
                            {...tfBase}
                          >
                            <MenuItem value="معاف">معاف</MenuItem>
                            <MenuItem value="انجام شده">انجام شده</MenuItem>
                            <MenuItem value="غیر مشمول">غیر مشمول</MenuItem>
                          </TextField>
                        </Grid>
                      </Grid>
                    </Paper>
                  )}

                  {/* TAB 1: تحصیلات */}
                  {tab === 1 && (
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ mb: 2, fontWeight: 700, color: "primary.main" }}
                      >
                        سوابق تحصیلی
                      </Typography>
                      {formData.educations.map((edu, idx) => (
                        <Paper
                          key={idx}
                          variant="outlined"
                          sx={{
                            p: { xs: 1.5, md: 2 },
                            mb: isMobile ? 2 : 3,
                            borderRadius: 3,
                            borderColor: "divider",
                            backgroundColor: "rgba(250,250,250,0.6)",
                          }}
                          elevation={0}
                        >
                          <Grid
                            container
                            spacing={2}
                            alignItems="center"
                            mt={3}
                          >
                            <Grid item xs={12} sm={6} md={4}>
                              <TextField
                                label={`نام موسسه یا دانشگاه (${idx + 1})`}
                                required
                                value={edu.institute}
                                onChange={(e) =>
                                  updateArrayItem(
                                    "educations",
                                    idx,
                                    "institute",
                                    e.target.value,
                                  )
                                }
                                {...tfBase}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                              <DatePicker
                                label="تاریخ شروع"
                                value={edu.startDate}
                                onChange={(newValue) =>
                                  updateArrayDate(
                                    "educations",
                                    idx,
                                    "startDate",
                                    newValue,
                                  )
                                }
                                slotProps={{
                                  textField: { ...tfBase, required: true },
                                }}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                              <DatePicker
                                label="تاریخ پایان"
                                value={edu.endDate}
                                onChange={(newValue) =>
                                  updateArrayDate(
                                    "educations",
                                    idx,
                                    "endDate",
                                    newValue,
                                  )
                                }
                                slotProps={{
                                  textField: { ...tfBase, required: true },
                                }}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                              <TextField
                                label="رشته تحصیلی"
                                required
                                value={edu.major}
                                onChange={(e) =>
                                  updateArrayItem(
                                    "educations",
                                    idx,
                                    "major",
                                    e.target.value,
                                  )
                                }
                                {...tfBase}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                              <TextField
                                label="مدرک اخذ شده"
                                required
                                value={edu.degree}
                                onChange={(e) =>
                                  updateArrayItem(
                                    "educations",
                                    idx,
                                    "degree",
                                    e.target.value,
                                  )
                                }
                                {...tfBase}
                              />
                            </Grid>

                            <Grid item xs={12} sx={{ textAlign: "left" }}>
                              {!submitted && (
                                <>
                                  <Tooltip title="افزودن مورد جدید">
                                    <IconButton
                                      color="primary"
                                      onClick={() =>
                                        addArrayItem("educations", {
                                          institute: "",
                                          startDate: new Date(),
                                          endDate: new Date(),
                                          major: "",
                                          degree: "",
                                        })
                                      }
                                    >
                                      <AddCircleOutline />
                                    </IconButton>
                                  </Tooltip>

                                  {formData.educations.length > 1 && (
                                    <Tooltip title="حذف">
                                      <IconButton
                                        color="error"
                                        onClick={() =>
                                          removeArrayItem("educations", idx)
                                        }
                                      >
                                        <RemoveCircleOutline />
                                      </IconButton>
                                    </Tooltip>
                                  )}
                                </>
                              )}
                            </Grid>
                          </Grid>
                        </Paper>
                      ))}
                    </Box>
                  )}

                  {/* TAB 2: زبان‌ها و مهارت‌ها */}
                  {tab === 2 && (
                    <Box>
                      <Typography sx={{ mb: 2, fontWeight: 700 }}>
                        زبان‌ها
                      </Typography>
                      {formData.languages.map((lang, idx) => (
                        <Paper
                          key={idx}
                          variant="outlined"
                          sx={{
                            p: { xs: 1.5, md: 2 },
                            mb: isMobile ? 2 : 3,
                            borderRadius: 3,
                            borderColor: "divider",
                            backgroundColor: "rgba(250,250,250,0.6)",
                          }}
                          elevation={0}
                        >
                          <Grid
                            container
                            spacing={2}
                            key={idx}
                            alignItems="center"
                            mt={3}
                          >
                            <Grid item xs={12} sm={4}>
                              <TextField
                                label="نام زبان"
                                required
                                value={lang.name}
                                onChange={(e) =>
                                  updateArrayItem(
                                    "languages",
                                    idx,
                                    "name",
                                    e.target.value,
                                  )
                                }
                                {...tfBase}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={4}
                              sx={{ minWidth: "120px" }}
                            >
                              <TextField
                                select
                                label="خواندن"
                                required
                                value={lang.reading}
                                onChange={(e) =>
                                  updateArrayItem(
                                    "languages",
                                    idx,
                                    "reading",
                                    e.target.value,
                                  )
                                }
                                SelectProps={selectMenuProps}
                                {...tfBase}
                              >
                                <MenuItem value="عالی">عالی</MenuItem>
                                <MenuItem value="خوب">خوب</MenuItem>
                                <MenuItem value="متوسط">متوسط</MenuItem>
                              </TextField>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={4}
                              sx={{ minWidth: "120px" }}
                            >
                              <TextField
                                select
                                label="نوشتن"
                                required
                                value={lang.writing}
                                onChange={(e) =>
                                  updateArrayItem(
                                    "languages",
                                    idx,
                                    "writing",
                                    e.target.value,
                                  )
                                }
                                SelectProps={selectMenuProps}
                                {...tfBase}
                              >
                                <MenuItem value="عالی">عالی</MenuItem>
                                <MenuItem value="خوب">خوب</MenuItem>
                                <MenuItem value="متوسط">متوسط</MenuItem>
                              </TextField>
                            </Grid>

                            <Grid item xs={12} sx={{ textAlign: "left" }}>
                              {!submitted && (
                                <>
                                  <Tooltip title="افزودن زبان">
                                    <IconButton
                                      color="primary"
                                      onClick={() =>
                                        addArrayItem("languages", {
                                          name: "",
                                          reading: "",
                                          writing: "",
                                        })
                                      }
                                    >
                                      <AddCircleOutline />
                                    </IconButton>
                                  </Tooltip>

                                  {formData.languages.length > 1 && (
                                    <Tooltip title="حذف زبان">
                                      <IconButton
                                        color="error"
                                        onClick={() =>
                                          removeArrayItem("languages", idx)
                                        }
                                      >
                                        <RemoveCircleOutline />
                                      </IconButton>
                                    </Tooltip>
                                  )}
                                </>
                              )}
                            </Grid>
                          </Grid>
                        </Paper>
                      ))}
                      <Paper
                        variant="outlined"
                        sx={{
                          p: { xs: 1.5, md: 2 },
                          mb: isMobile ? 2 : 3,
                          borderRadius: 3,
                          borderColor: "divider",
                          backgroundColor: "rgba(250,250,250,0.6)",
                        }}
                        elevation={0}
                      >
                        <TextField
                          label="سایر اطلاعات (مهارت‌ها)"
                          name="skills"
                          fullWidth
                          required
                          multiline
                          rows={4}
                          value={formData.skills}
                          onChange={handleChange}
                          {...tfBase}
                          sx={{ mb: 3, mt: 3 }}
                        />

                        <Grid
                          container
                          spacing={2}
                          sx={{ mt: 1, minWidth: "200px" }}
                        >
                          <Grid item xs={12} sm={6} md={4}>
                            <TextField
                              label="شغل مورد درخواست"
                              name="jobRequested"
                              required
                              value={formData.jobRequested}
                              onChange={handleChange}
                              {...tfBase}
                            />
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            sx={{ minWidth: "200px" }}
                          >
                            <TextField
                              label="مدت تجربه در شغل مورد درخواست"
                              name="jobExperienceDuration"
                              required
                              value={formData.jobExperienceDuration}
                              onChange={handleChange}
                              {...tfBase}
                            />
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            sx={{ minWidth: "200px" }}
                          >
                            <TextField
                              select
                              label="برای انجام وظایف مایل به کار در"
                              name="willingToWorkIn"
                              required
                              value={formData.willingToWorkIn}
                              onChange={handleChange}
                              SelectProps={selectMenuProps}
                              {...tfBase}
                            >
                              <MenuItem value="تهران">تهران</MenuItem>
                              <MenuItem value="شهرستان">شهرستان</MenuItem>
                              <MenuItem value="تهران و شهرستان">
                                تهران و شهرستان
                              </MenuItem>
                            </TextField>
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            sx={{ minWidth: { xs: 290, md: 300 } }}
                          >
                            <TextField
                              label="مدتی که در طول یکسال می‌توانم در شهرستان کار کنم (ماه)"
                              name="monthsPerYearInOtherCity"
                              required
                              value={formData.monthsPerYearInOtherCity}
                              onChange={handleChange}
                              {...tfBase}
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    </Box>
                  )}

                  {/* TAB 3: سوابق کاری */}
                  {tab === 3 && (
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ mb: 2, fontWeight: 700, color: "primary.main" }}
                      >
                        سوابق کاری
                      </Typography>
                      {formData.workHistories.map((w, idx) => (
                        <Paper
                          key={idx}
                          variant="outlined"
                          sx={{
                            p: { xs: 1.5, md: 2 },
                            mb: isMobile ? 2 : 3,
                            borderRadius: 3,
                            borderColor: "divider",
                            backgroundColor: "rgba(250,250,250,0.6)",
                          }}
                          elevation={0}
                        >
                          <Grid container spacing={2} mt={3}>
                            <Grid item xs={12} sm={6} md={4}>
                              <TextField
                                label="مدت (ماه - سال)"
                                required
                                value={w.period}
                                onChange={(e) =>
                                  updateArrayItem(
                                    "workHistories",
                                    idx,
                                    "period",
                                    e.target.value,
                                  )
                                }
                                {...tfBase}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                              <TextField
                                label="نام شرکت یا موسسه"
                                required
                                value={w.company}
                                onChange={(e) =>
                                  updateArrayItem(
                                    "workHistories",
                                    idx,
                                    "company",
                                    e.target.value,
                                  )
                                }
                                {...tfBase}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                              <TextField
                                label="نوع فعالیت"
                                required
                                value={w.activityType}
                                onChange={(e) =>
                                  updateArrayItem(
                                    "workHistories",
                                    idx,
                                    "activityType",
                                    e.target.value,
                                  )
                                }
                                {...tfBase}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                              <TextField
                                label="تعداد کارکنان"
                                required
                                value={w.employeesCount}
                                onChange={(e) =>
                                  updateArrayItem(
                                    "workHistories",
                                    idx,
                                    "employeesCount",
                                    e.target.value,
                                  )
                                }
                                {...tfBase}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                              <TextField
                                label="سرپرست شما"
                                required
                                value={w.manager}
                                onChange={(e) =>
                                  updateArrayItem(
                                    "workHistories",
                                    idx,
                                    "manager",
                                    e.target.value,
                                  )
                                }
                                {...tfBase}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                              <TextField
                                label="شغل شما"
                                required
                                value={w.position}
                                onChange={(e) =>
                                  updateArrayItem(
                                    "workHistories",
                                    idx,
                                    "position",
                                    e.target.value,
                                  )
                                }
                                {...tfBase}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                              <TextField
                                label="افراد تحت سرپرستی"
                                required
                                value={w.supervisedCount}
                                onChange={(e) =>
                                  updateArrayItem(
                                    "workHistories",
                                    idx,
                                    "supervisedCount",
                                    e.target.value,
                                  )
                                }
                                {...tfBase}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                              <TextField
                                label="اصل حقوق ماهیانه (شروع)"
                                required
                                value={w.salaryStart}
                                onChange={(e) =>
                                  updateArrayItem(
                                    "workHistories",
                                    idx,
                                    "salaryStart",
                                    e.target.value,
                                  )
                                }
                                {...tfBase}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                              <TextField
                                label="اصل حقوق ماهیانه (پایان)"
                                required
                                value={w.salaryEnd}
                                onChange={(e) =>
                                  updateArrayItem(
                                    "workHistories",
                                    idx,
                                    "salaryEnd",
                                    e.target.value,
                                  )
                                }
                                {...tfBase}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <TextField
                                label="شرح وظائف و مسئولیت"
                                required
                                multiline
                                rows={3}
                                value={w.description}
                                onChange={(e) =>
                                  updateArrayItem(
                                    "workHistories",
                                    idx,
                                    "description",
                                    e.target.value,
                                  )
                                }
                                {...tfBase}
                                sx={{ mb: 2 }}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <TextField
                                label="علت ترک کار"
                                required
                                value={w.reasonForLeaving}
                                onChange={(e) =>
                                  updateArrayItem(
                                    "workHistories",
                                    idx,
                                    "reasonForLeaving",
                                    e.target.value,
                                  )
                                }
                                {...tfBase}
                              />
                            </Grid>

                            <Grid item xs={12} sx={{ textAlign: "left" }}>
                              {!submitted && (
                                <>
                                  <Tooltip title="افزودن مورد جدید">
                                    <IconButton
                                      color="primary"
                                      onClick={() =>
                                        addArrayItem("workHistories", {
                                          period: "",
                                          company: "",
                                          activityType: "",
                                          employeesCount: "",
                                          manager: "",
                                          position: "",
                                          supervisedCount: "",
                                          salaryStart: "",
                                          salaryEnd: "",
                                          description: "",
                                          reasonForLeaving: "",
                                        })
                                      }
                                    >
                                      <AddCircleOutline />
                                    </IconButton>
                                  </Tooltip>

                                  {formData.workHistories.length > 1 && (
                                    <Tooltip title="حذف">
                                      <IconButton
                                        color="error"
                                        onClick={() =>
                                          removeArrayItem("workHistories", idx)
                                        }
                                      >
                                        <RemoveCircleOutline />
                                      </IconButton>
                                    </Tooltip>
                                  )}
                                </>
                              )}
                            </Grid>
                          </Grid>
                        </Paper>
                      ))}
                    </Box>
                  )}

                  {/* TAB 4: معرف‌ها و توضیحات */}
                  {tab === 4 && (
                    <Box>
                      <Typography sx={{ mb: 2, fontWeight: 600 }}>
                        معرف‌ها
                      </Typography>
                      {formData.referees.map((r, idx) => (
                        <Paper
                          key={idx}
                          variant="outlined"
                          sx={{
                            p: { xs: 1.5, md: 2 },
                            mb: isMobile ? 2 : 3,
                            borderRadius: 3,
                            borderColor: "divider",
                            backgroundColor: "rgba(250,250,250,0.6)",
                          }}
                          elevation={0}
                        >
                          <Grid container spacing={2} key={idx} mt={3}>
                            <Grid item xs={12} sm={6} md={4}>
                              <TextField
                                label="نام و نام خانوادگی"
                                required
                                value={r.name}
                                onChange={(e) =>
                                  updateArrayItem(
                                    "referees",
                                    idx,
                                    "name",
                                    e.target.value,
                                  )
                                }
                                {...tfBase}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                              <TextField
                                label="محل کار"
                                required
                                value={r.workplace}
                                onChange={(e) =>
                                  updateArrayItem(
                                    "referees",
                                    idx,
                                    "workplace",
                                    e.target.value,
                                  )
                                }
                                {...tfBase}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                              <TextField
                                label="سمت"
                                required
                                value={r.position}
                                onChange={(e) =>
                                  updateArrayItem(
                                    "referees",
                                    idx,
                                    "position",
                                    e.target.value,
                                  )
                                }
                                {...tfBase}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                              <TextField
                                label="شماره تلفن"
                                required
                                value={r.phone}
                                onChange={(e) =>
                                  updateArrayItem(
                                    "referees",
                                    idx,
                                    "phone",
                                    e.target.value,
                                  )
                                }
                                {...tfBase}
                              />
                            </Grid>

                            <Grid item xs={12} sx={{ textAlign: "left" }}>
                              {!submitted && (
                                <>
                                  <Tooltip title="افزودن معرف">
                                    <IconButton
                                      color="primary"
                                      onClick={() =>
                                        addArrayItem("referees", {
                                          name: "",
                                          workplace: "",
                                          position: "",
                                          phone: "",
                                        })
                                      }
                                    >
                                      <AddCircleOutline />
                                    </IconButton>
                                  </Tooltip>

                                  {formData.referees.length > 1 && (
                                    <Tooltip title="حذف معرف">
                                      <IconButton
                                        color="error"
                                        onClick={() =>
                                          removeArrayItem("referees", idx)
                                        }
                                      >
                                        <RemoveCircleOutline />
                                      </IconButton>
                                    </Tooltip>
                                  )}
                                </>
                              )}
                            </Grid>
                          </Grid>
                        </Paper>
                      ))}

                      <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                          <TextField
                            label="سایر توضیحاتی که لازم می‌دانید"
                            name="otherInfo"
                            fullWidth
                            required
                            multiline
                            rows={3}
                            value={formData.otherInfo}
                            onChange={handleChange}
                            {...tfBase}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  )}

                  {/* TAB 5: بارگذاری رزومه */}
                  {tab === 5 && (
                    <Box>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: { xs: 1.5, md: 2 },
                          mb: isMobile ? 2 : 3,
                          borderRadius: 3,
                          borderColor: "divider",
                          backgroundColor: "rgba(250,250,250,0.6)",
                        }}
                        elevation={0}
                      >
                        <Grid container spacing={2} alignItems="center" mt={3}>
                          <Grid item xs={12}>
                            <Button
                              variant="outlined"
                              component="label"
                              fullWidth
                              disabled={submitted}
                              sx={{
                                justifyContent: "space-between",
                                textTransform: "none",
                                borderRadius: 2,
                                py: 1.5,
                              }}
                            >
                              <span style={{ textAlign: "right", flex: 1 }}>
                                {formData.file
                                  ? formData.file.name
                                  : "انتخاب فایل رزومه (PDF, DOC, DOCX)"}
                              </span>
                              <input
                                type="file"
                                hidden
                                name="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => handleChange(e)}
                                required
                              />
                            </Button>
                          </Grid>

                          <Grid item xs={12}>
                            <Button
                              type="submit"
                              variant="contained"
                              color={submitted ? "success" : "primary"}
                              fullWidth
                              disabled={loading || submitted}
                              sx={{
                                py: 1.5,
                                fontWeight: 800,
                                borderRadius: 2,
                                textTransform: "none",
                              }}
                            >
                              {loading ? (
                                <CircularProgress size={20} />
                              ) : submitted ? (
                                "ارسال انجام شده"
                              ) : (
                                "ارسال نهایی"
                              )}
                            </Button>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Box>
                  )}
                </Box>
              </Box>
            </Paper>

            {/* overlay when loading */}
            {loading && (
              <Box
                sx={{
                  position: "fixed",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0.18)",
                  zIndex: (t) => t.zIndex.modal + 200,
                }}
              >
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    borderRadius: 2,
                  }}
                  elevation={3}
                >
                  <CircularProgress />
                  <Typography sx={{ fontWeight: 700 }}>
                    در حال ارسال...
                  </Typography>
                </Paper>
              </Box>
            )}

            {/* Snackbar */}
            <Snackbar
              open={alert.open}
              autoHideDuration={4500}
              onClose={() => setAlert((s) => ({ ...s, open: false }))}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={() => setAlert((s) => ({ ...s, open: false }))}
                severity={alert.type}
                sx={{ width: "100%", direction: "rtl", textAlign: "right" }}
              >
                {alert.message}
              </Alert>
            </Snackbar>
          </Container>
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
