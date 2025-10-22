import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";

// داده‌های کامل نمونه کارها
const portfolioData = {
  "صنایع پتروشیمی ، شیمیایی ، معدنی وفلزی": [
    "آریا شیمی شرق",
    "پترو فرهنگ",
    "پتروشیمی گناوه دشتستان",
    "ساپرا شیمی",
    "احداث کانسار راوه",
    "اسید سازان زنجان",
    "آلومتک",
    "آلومراد",
    "آلیاژ گستر قشم",
    "بازرگانی پتروشیمی",
    "بازرگانی توسعه صنعت روی",
    "پاتله",
    "پاکسان",
    "پترو کک آرین ویان غرب",
    "پونل برسام",
    "تقطیر خراسان",
    "توسعه پتروشیمی کنگان",
    "تولید روی بندر عباس",
    "تولیدی منیزیم گستر اریش",
    "شیشه قزوین",
    "صبا فولاد زاگرس",
    "صدر معادن ایرانیان",
    "صنایع پتروشیمی هگمتانه",
    "صنایع فولاد سازان امیرآباد",
    "صنایع فولاد سازان دماوند",
    "صنعتی و معدنی شمالشرق شاهرود",
    "فرآوری مواد معدنی ایران",
    "کیمیای پارس خاورمیانه",
    "مجتمع ذوب و احیای روی قشم",
    "مجتمع معادن مس تکنار",
    "ملی سرب و روی ایران",
    "مهندسی و توسعه صنایع فلات قاره پرشین",
    "فرآوری ماسه سیلیسی فیروزکوه",
    "صنعتی و شیمیایی رنگین",
    "لوله و تجهیزات سدید",
  ],

  "صنعت سیمان": [
    "سیمان الدوز خوی",
    "سیمان خاش",
    "سیمان دورود",
    "سیمان کارون",
    "سیمان لارستان",
    "سیمان مدلل",
    "سیمان اردستان",
    "صنایع سیمان کیاسر",
    "صنعت سیمان شاهین دژ",
    "کارخانه سیمان آذرآبادگان خوی",
    "سیمان سپاهان",
    "سیمان خاش",
    "سیمان درود",
  ],

  "سرمایه گذاری ها و نهادهای مالی": [
    "مدیریت صنعت شوینده توسعه صنایع بهشهر",
    "سرمایه گذاری اقتصاد شهر طوبی",
    "سرمایه گستر مهان بتیس",
    "ارزش آفرین برق و آب صبا",
    "اعتبار آفرین",
    "اعتبار الگوریتم آیا",
    "بازرگانی عصر بهمن",
    "تأمین سرمایه کاردان",
    "تامین سرمایه نوین",
    "توسعه سرمایه رادین",
    "توسعه سرمایه رسا",
    "توسعه سرمایه گذاری کشاورزی آرین توسکا",
    "توسعه صنعت کیمیا زر",
    "توسعه عمران انارک",
    "دادو ستد آریا",
    "راهکارهای خلاق کلک خیال",
    "زرین ساز انارک",
    "ساربان سرمایه ایرانیان",
    "سامان سهام سپاهان",
    "سرمایه گذاری آوین",
    "سرمایه گذاری ایران و فرانسه",
    "سرمایه گذاری بهمن",
    "سرمایه گذاری بوعلی",
    "سرمایه گذاری توسعه شهری توس گستر",
    "سرمایه گذاری توسعه صنعت و تجارت",
    "سرمایه گذاری ساختمانی نظام مهندسی ایران",
    "سرمایه گذاری صنایع برق و آب صبا",
    "سرمایه گذاری عمران و توسعه پایدار ایرانیان",
    "سرمایه گذاری فرهنگیان",
    "سرمایه گذاری گروه صنعتی رنا",
    "سرمایه گذاری گنجینه ایرانیان",
    "سرمایه‌گذاری دانشگاه تهران",
    "فرزان تجارت پارمیس",
    "گروه سرمایه گذاری و مدیریت مالی میلاد شهر",
    "گروه صنعتی ایرانیان",
    "گروه مادیران (صنایع مادیران)",
    "گروه مالی شهر",
    "گروه مدیریت سرمایه لیان",
    "مدیریت سرمایه گذاری ملی ایران",
    "سرمایه گذاری استان گیلان",
    "مدیریت عمران و توسعه شهر آتیه",
    "مروارید تک آمانج",
    "مهندسی بازرگانی ارزش آفرینان نوین آرا",
    "گروه صنعتی سدید",
    "گروه صنعتی قطعات اتومبیل ایران",
    "موسسه رفاه و تأمین آتیه کارکنان بانک سپه",
    "موسسه صندوق ذخیره فرهنگیان",
    "سرمایه گذاری جامی",
  ],

  "صنایع نفت و پالایشی": [
    "پالایش نفت اصفهان",
    "پالایش نفت بندر عباس",
    "گلوبال پتروتک کیش",
    "صنعتی دریایی ایران -صدرا",
    "نفت پارس",
    "تجهيزات توربو كمپرسور نفت",
    "توسعه خدمات بازرگانی و مالی صبا نفت",
    "مهندسی و خدمات نفت کاو ژرف",
    "توسعه صنایع نفت و انرژی قشم",
    "مهندسی بستا نفت",
    "خدمات مهندسی نفت کیش",
    "توربوکمپرسورنفت",
    "طراحی مهندسی توربوکمپرسور نفت آسیا",
    "مدیریت و هماهنگی ساخت تجهیزات اساسی نفت صبا",
  ],

  "بانکها و موسسات اعتباری": [
    "بانک شهر",
    "موسسه اعتباری ملل",
    "بانک گردشگری",
    "بانک اقتصاد نوین",
    "بانک دی",
    "بانک ایران زمین",
    "موسسه اعتباری نور",
    "بانک انصار",
    "شعبه بانک تعاون اسلامی برای سرمایه گذاری",
  ],

  "صندوق ها ،کارگزاری ها و سبدگردانها": [
    "سبد گردان دارایی نیکی",
    "سبدگردان آسمان",
    "سبدگردان سورین",
    "کارگزاری بانک اقتصاد نوین",
    "کارگزاری بانک آینده",
    "کارگزاری بانک ملت",
    "کارگزاری بورسیران",
    "کارگزاری سرمایه گذاری ملی ایران",
    "کارگزاری شهر",
    "کارگزاری کالای خاورمیانه",
    "صندوق اختصاصی بازارگردان صنعت مس",
    "صندوق اختصاصی بازارگردانی پست بانک ایران",
    "صندوق سرمایه گذاری اختصاصی بازارگردان گروه توسعه بهشهر",
    "صندوق سرمایه گذاری اختصاصی بازارگردانی تجارت ایرانیان اعتماد",
    "صندوق سرمایه گذاری اختصاصی بازارگردانی روماک",
    "صندوق سرمایه گذاری اختصاصی بازارگردانی سورین",
    "صندوق سرمایه گذاری اختصاصی بازارگردانی شهر",
    "صندوق سرمایه گذاری ارمغان ایرانیان",
    "صندوق سرمایه گذاری اکسیر دوم فارابی",
    "صندوق سرمایه گذاری با درآمد ثابت اعتماد ملل",
    "صندوق سرمایه گذاری با درآمد ثابت نگین سامان",
    "صندوق سرمایه گذاری بازارگردانی نوین پیشرو",
    "صندوق سرمایه گذاری بخشی فلزات کیمیا",
    "صندوق سرمایه گذاری جسورانه آشنا تک ایرانیان",
    "صندوق سرمایه گذاری جسورانه پیشرفت",
    "صندوق سرمایه گذاری در اوراق بهادار با درآمد ثابت کارآمد",
    "صندوق سرمایه گذاری در اوراق بهادار با درآمد ثابت کیمیا",
    "صندوق سرمایه گذاری زمین و ساختمان نسیم",
    "صندوق سرمایه گذاری سلام فارابی",
    "صندوق سرمایه گذاری سهام بزرگ کاردان",
    "صندوق سرمایه گذاری سهام نگر کیمیا",
    "صندوق سرمایه گذاری کیمیا زرین کاردان",
    "صندوق سرمایه گذاری لوتوس پارسیان",
    "صندوق سرمایه گذاری مشترک بورسیران",
    "صندوق سرمایه گذاری مشترک یکم سامان",
    "صندوق سرمایه گذاری نیکوکاری همیار آشنا ایرانیان",
    "صندوق سرمایه گذاریاختصاصی بازارگردانی الگوریتمی امید فارابی",
    "صندوق سرمایه‌گذاری اختصاصی بازارگردانی کارگزاری کارآفرین",
    "صندوق نیکوکاری جایزه علمی فناوری پیامبر اعظم",
    "کارگزاری بانک تجارت",
    "موسسه تامین آتیه کارکنان بانک شهر",
    "کارگزاری بورسیران",
    "کارگزاری آرمون بورس",
    "کارگزاری پارس نمودگر",
  ],

  قندوشکر: [
    "شرکت شکر",
    "شرکت فراسازان سمنان",
    "شرکت قند لرستان",
    "شرکت قند نقش جهان",
    "شرکت قند مرودشت",
    "شرکت قند پارس",
    "شرکت قند نیشابور",
    "شرکت قند هکمتان",
    "شرکت کارخانجات قند قزوین",
  ],

  "دارویی و صنایع وابسته": [
    "توسعه طب آدریان سلامت",
    "پخش مکمل کارن",
    "دارو درمان سپهر",
    "دارو صنعت ویانا",
    "داروسازی و مکملهای غذایی حیاتی کارن",
    "رازان فارمد ایرانیان",
    "کارخانجات دارو پخش",
    "نو آوران دارویی کیمیا",
    "هیلیا فارمد",
    "ویتان فارمد",
    "دارو سازی جابرابن حیان",
    "پخش رازی",
  ],

  "راه و ساختمان و ابنیه": [
    "بهینه سازان بهمن",
    "توسعه ساختمانی بهمن",
    "ساختمان نصب تانسو",
    "ساختمان و عمران شهر پایدار",
    "ساختمانی آرادان",
    "ساختمانی ایمن ساخت برزین",
    "ساختمانی معلم",
    "سامان صانع اصفهان",
    "سامان گستر اصفهان",
    "سرمایه گذاری ساختمان گروه صنایع بهشهر تهران",
    "مسکن و ساختمان جهان",
    "مهرسا شایان آریا",
    "مهندسی و ساختمانی صبا نفت",
    "صندوق سرمایه گذاری زمین و ساختمان نارون",
    "سرمایه گذاری ساختمانی نظام مهندسی ایران",
  ],

  "روغن نباتی و غذایی": [
    "الین شیمی",
    "امید آوران سبز هکمتان",
    "توسعه کشت دانه های روغنی",
    "روغن نباتی شیراز",
    "سپهان",
    "روغن نباتی پارس",
    "صنعتی بهپاک",
    "صنعتی زرماکارون",
    "فراورده های گوشتی بیستون",
    "کارخانجات صنعتی روغن کشی کلهر کرمانشاه",
    "کشت و صنعت جوین",
    "کشت و صنعت رجال سبز زنده رود",
    "کشت و صنعت مدلل شمال",
    "نابدانه مدلل",
    "نارایران",
    "کشت و صنعت مدلل ماهیدشت",
    "مجتمع دامپروری و کشاورزی باوان کلهر مدلل",
    "نوین گستر مشکات",
  ],

  "شهرداری ها و سازمانهای وابسته": [
    "اوراق مشارکت قطار شهری قم",
    "اوراق مشارکت قطار شهری کرمانشاه",
    "سازمان فناوری اطلاعات و ارتباطات شهرداری تهران",
    "شرکت کنترل ترافیک تهران",
    "شرکت نوین عرف شهریار",
    "سازمان مهندسی شهر تهران",
    "سازمان میادین میوه و تره بار شهر تهران",
    "سازمان آتش نشانی و خدمات ایمنی تهران",
    "سازمان پسماند شهر تهران",
    "سازمان زیبا سازی شهرداری تهران",
    "شرکت واحد اتوبوس رانی تهران و حومه",
    "بهره برداری نمایشگاه های بین المللی شهر آفتاب تهران",
    "سازمان آتش نشانی و خدمات ایمنی شهرداری تهران",
    "سازمان مدیریت و نظارت بر تاکسیرانی شهرداری تهران",
    "سازمان نوسازي شهرتهران",
  ],

  "لیزینگ و صرافی": [
    "لیزینگ اقتصاد نوین",
    "لیزینگ خودرو غدیر",
    "لیزینگ شهر",
    "لیزینگ گسترش سرمایه گذاری ملی",
    "واسپاری تامین توسعه آرتین",
    "واسپاری ملت",
    "واسپاری توسعه اعتبار هوشمند",
    "واسپاری توسعه گستر برنا",
    "خدمات ارزی و صرافی اقتصاد نوین",
    "صرافی دی",
    "صرافی گردشگری",
    "صرافی شهر",
  ],

  "تولیدبرق و صنایع جانبی": [
    "آب و برق کیش",
    "توسعه مولد نیروگاهی جهرم",
    "توسعه و احداث نیروگاههای بادی توان باد",
    "توسعه و احداث نیروگاهی توان",
    "مدیریت تولید برق طوس",
    "مولد نیروگاهی تجارت فارس",
    "گروه مپنا",
    "فرآب",
    "نیرو آتیه صبا",
    "نیرو صنعت پارسین نور",
    "صنایع کاژه ویسمن",
    "مدیریت فرآیندهای نیروگاهی ایرانیان",
  ],

  "صنایع بسته بندی": [
    "صنایع بسته بندی شیراز",
    "صنایع چاپ و بسته بندی آسان قزوین",
    "صنایع چاپ و بسته بندی آیسان مهر البرز",
    "صنایع معدنی نوظهور شاهرود",
    "صنایع بسته بندی ایران",
    "صنایع چوب و کاغذ ایران (چوکا)",
    "کارتن ایران",
    "مهر پلاست مدلل",
    "مدیریت یاران توسعه بهشهر",
  ],

  "نساجی و پوشاک": [
    "پلی اکریل ایران",
    "تولیدی بافت آزادی",
    "واحد صنعتی پوشاک هاکوپیان",
    "فرش پارس",
    "نقره نخ",
    "ناز نخ",
    "پوشاک نوراشن",
    "الیاف ترمه اسپادانا",
    "پلی اکریل ایران",
  ],

  "حمل و نقل": [
    "حمل و نقل بین المللی نوین ترابر گلدیران",
    "حمل و نقل توسعه ترابر گلدیران",
    "حمل و نقل زر ترابر ایرانیان",
    "حمل و نقل صنایع روغن بارگلزا",
    "حمل و نقل کارکنان و کارخانجات سیمان و فارسیت دورود",
    "کشتیرانی آفتاب کیش",
    "کلهر بار مدلل",
    "لجستیک گلدیران نوین کیش",
    "حمل و نقل سیمان سازان اردستان",
    "حمل و نقل سنگین بار کلهر",
    "حمل و نقل زر ترابر ایرانیان",
  ],

  "خدمات بیمه": [
    "بیمه نوین",
    "بیمه ما",
    "خدمات بیمه ای اقتصاد نوین",
    "خدمات بیمه ای بهمن",
    "کارگزاری رسمی بیمه مستقیم بر خط گلدیران آسایش",
    "کارگزاری رسمی بیمه مستقیم برخط پایوران رستاک آریائی",
    "پوشش بیمه توسعه بهشهر",
  ],

  "تولید سیم و کابل وتجهیزات برق": [
    "پارس سویچ",
    "تولیدی قرقره شمال",
    "سیم لاکی فارس",
    "کابل البرز",
    "سیمکو",
    "سیمکو پلیمر",
    "صنایع برق زنگان پارس",
    "صنایع زنگان پارت قطعه",
    "گیل راد شمال",
  ],

  "خودرو و صنایع وابسته": [
    "آریا دیزل موتور",
    "ایران ورز",
    "تولیدی اریش خودرو",
    "تولیدی پلی اوره تان ایران",
    "تولیدی و صنعتی شیشه گیلان",
    "سیستمهای صندلی پارس",
    "شاسی ساز ایران",
    "گروه توسعه صنعتی خودرو سازی زر",
    "مشترک ایران خودرو اتومبیل پژو",
  ],

  "ماشین سازی": [
    "جام امید البرز",
    "ماشین سازی اراک",
    "ماشین سازی نیرو محرکه",
    "کارخا نجات صنعتی و تولیدی اتمسفر",
  ],

  "سایر شرکتها و موسسات": [
    "تامین ماسه ریخته گری",
    "افرا نت",
    "سرمايه‌گذاري و توسعه صنايع لاستيك",
    "گروه صنعتی بارز",
    "فرهنگی ورزشی پرسپولیس",
    "لامیران",
    "تولیدی و صنعتی درخشان تهران",
    "حریر خوزستان",
    "رایان هم افزا",
    "سرویس بیمه شهر",
    "کالسیمین",
    "افست",
  ],
};

const industries = Object.keys(portfolioData);

export default function PortfolioPage() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedIndustry, setSelectedIndustry] = useState(
    "صنایع پتروشیمی ، شیمیایی ، معدنی وفلزی",
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleIndustrySelect = (industry) => {
    setSelectedIndustry(industry);
    setIsMenuOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 8, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  // محاسبه آمار کلی
  const totalIndustries = Object.keys(portfolioData).length;
  const totalCompanies = Object.values(portfolioData).flat().length;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)",
        pt: 2,
        pb: 8,
          mt:10
      }}
    >
      <Container maxWidth="xl">
        {/* هدر صفحه */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: "center", mb: 6, mt: 4 }}>
            <BusinessIcon
              sx={{
                fontSize: 60,

                mb: 2,
                background: "linear-gradient(45deg, #2e7d32 30%, #388e3c 90%)",
                borderRadius: "50%",
                p: 1,
                color: "white",
              }}
            />
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 800,
                color: "text.primary",
                mb: 2,
              }}
            >
              {i18n.language === "fa" ? "نمونه کارهای موسسه" : "Our Portfolio"}
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: "auto", mb: 4 }}
            >
              {i18n.language === "fa"
                ? "افتخار همکاری با برترین شرکت‌ها و سازمان‌های کشور"
                : "Proud to collaborate with top companies and organizations"}
            </Typography>
          </Box>
        </motion.div>

        {/* منوی کشویی صنایع */}
        <Box
          sx={{
            position: "relative",
            mb: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => setIsMenuOpen(false)}
            sx={{
              position: "relative",
              display: "inline-block",
            }}
          >
            {/* دکمه انتخاب صنعت */}
            <Button
              variant="contained"
              endIcon={<ExpandMoreIcon />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 700,
                borderRadius: 3,
                background: "linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)",
                boxShadow: "0 8px 24px rgba(56, 142, 60, 0.3)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
                  boxShadow: "0 12px 32px rgba(56, 142, 60, 0.4)",
                },
              }}
            >
              <BusinessIcon sx={{ mr: 1 }} />
              {i18n.language === "fa" ? "انتخاب صنعت" : "Select Industry"}
            </Button>

            {/* منوی کشویی */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  variants={menuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    marginTop: 8,
                  }}
                >
                  <Paper
                    sx={{
                      width: 350,
                      maxHeight: 400,
                      overflow: "hidden",
                      borderRadius: 3,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                      border: "1px solid",
                      borderColor: "divider",
                      background: "white",
                    }}
                    onMouseEnter={() => setIsMenuOpen(true)}
                    onMouseLeave={() => setIsMenuOpen(false)}
                  >
                    <Box
                      sx={{
                        p: 2,
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        background:
                          "linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)",
                        color: "white",
                        borderRadius: "12px 12px 0 0",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <WorkIcon />
                        {i18n.language === "fa" ? "صنایع" : "Industries"}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ opacity: 0.9, mt: 0.5 }}
                      >
                        {industries.length}{" "}
                        {i18n.language === "fa" ? "دسته‌بندی" : "Categories"}
                      </Typography>
                    </Box>

                    <List sx={{ p: 1, maxHeight: 320, overflow: "auto" }}>
                      {industries.map((industry) => (
                        <ListItem
                          key={industry}
                          disablePadding
                          onClick={() => handleIndustrySelect(industry)}
                          sx={{
                            borderRadius: 2,
                            mb: 0.5,
                            transition: "all 0.2s ease",
                            "&:hover": {
                              backgroundColor: "primary.main",
                              color: "white",
                              transform: "translateX(4px)",
                            },
                          }}
                        >
                          <ListItemText
                            primary={
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  p: 1.5,
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{ fontWeight: 600, fontSize: "0.9rem" }}
                                >
                                  {industry}
                                </Typography>
                                <Chip
                                  label={portfolioData[industry].length}
                                  size="small"
                                  sx={{
                                    fontWeight: 700,
                                    fontSize: "0.75rem",
                                    backgroundColor: "rgba(255,255,255,0.2)",
                                    color: "inherit",
                                  }}
                                />
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Box>

        {/* صنعت انتخاب شده */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            mt: 3,
            mb: 4,
            flexWrap: "wrap",
          }}
        >
          <Chip
            icon={<BusinessIcon />}
            label={selectedIndustry}
            color="primary"
            sx={{
              fontWeight: 700,
              fontSize: "1.1rem",
              py: 2.5,
              px: 2,
            }}
          />
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <CheckCircleIcon color="success" />
            {portfolioData[selectedIndustry].length}
            {i18n.language === "fa" ? " شرکت همکار" : " Partner Companies"}
          </Typography>
        </Box>

        {/* محتوای صنعت انتخاب شده */}
        <motion.div
          key={selectedIndustry}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              mb: 4,
              background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
            }}
          >
            <CardContent sx={{ p: 0 }}>
              {/* هدر صنعت */}
              <Box
                sx={{
                  p: 3,
                  background:
                    "linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)",
                  color: "white",
                  borderRadius: "16px 16px 0 0",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{ fontWeight: 800, mb: 1 }}
                >
                  {selectedIndustry}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  {i18n.language === "fa"
                    ? `شرکت‌های همکار موسسه در صنعت ${selectedIndustry}`
                    : `Partner companies in ${selectedIndustry} industry`}
                </Typography>
              </Box>

              {/* لیست شرکت‌ها */}
              <Box sx={{ p: 3 }}>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {portfolioData[selectedIndustry].map((company, index) => (
                    <motion.div key={company} variants={itemVariants} layout>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 3,
                          borderRadius: 3,
                          mb: 2,
                          transition: "all 0.3s ease",
                          backgroundColor: "background.paper",
                          border: "2px solid",
                          borderColor: "divider",
                          "&:hover": {
                            backgroundColor: alpha("#388e3c", 0.05),
                            transform: "translateX(8px)",
                            borderColor: "primary.light",
                            boxShadow: "0 6px 20px rgba(56, 142, 60, 0.15)",
                          },
                        }}
                      >
                        <CheckCircleIcon
                          sx={{
                            color: "success.main",
                            fontSize: 32,
                            mr: 3,
                          }}
                        />
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: "text.primary",
                              mb: 1,
                              fontSize: "1.1rem",
                            }}
                          >
                            {company}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "success.main",
                              fontWeight: 600,
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <WorkIcon fontSize="small" />
                            {i18n.language === "fa"
                              ? "همکاری موفق و مستمر"
                              : "Successful Continuous Collaboration"}
                          </Typography>
                        </Box>
                        <Chip
                          icon={<BusinessIcon />}
                          label={
                            i18n.language === "fa"
                              ? "مشتری موسسه"
                              : "Our Client"
                          }
                          color="primary"
                          variant="filled"
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.9rem",
                            py: 1,
                          }}
                        />
                      </Box>
                    </motion.div>
                  ))}
                </motion.div>
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        {/* آمار کلی */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr 1fr",
              },
              gap: 3,
              mb: 8,
            }}
          >
            <Card
              sx={{
                textAlign: "center",
                p: 4,
                borderRadius: 4,
                boxShadow: 3,
                background: "linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)",
                color: "white",
              }}
            >
              <Typography
                variant="h2"
                component="div"
                sx={{ fontWeight: 800, mb: 1 }}
              >
                {totalIndustries}
              </Typography>
              <Typography variant="h5" sx={{ opacity: 0.9 }}>
                {i18n.language === "fa" ? "صنعت مختلف" : "Industries"}
              </Typography>
            </Card>

            <Card
              sx={{
                textAlign: "center",
                p: 4,
                borderRadius: 4,
                boxShadow: 3,
                background: "linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)",
                color: "white",
              }}
            >
              <Typography
                variant="h2"
                component="div"
                sx={{ fontWeight: 800, mb: 1 }}
              >
                {totalCompanies}
              </Typography>
              <Typography variant="h5" sx={{ opacity: 0.9 }}>
                {i18n.language === "fa" ? "شرکت همکار" : "Partner Companies"}
              </Typography>
            </Card>

            <Card
              sx={{
                textAlign: "center",
                p: 4,
                borderRadius: 4,
                boxShadow: 3,
                background: "linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)",
                color: "white",
              }}
            >
              <Typography
                variant="h2"
                component="div"
                sx={{ fontWeight: 800, mb: 1 }}
              >
                ۴۶+
              </Typography>
              <Typography variant="h5" sx={{ opacity: 0.9 }}>
                {i18n.language === "fa" ? "سال تجربه" : "Years Experience"}
              </Typography>
            </Card>

            <Card
              sx={{
                textAlign: "center",
                p: 4,
                borderRadius: 4,
                boxShadow: 3,
                background: "linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)",
                color: "white",
              }}
            >
              <Typography
                variant="h2"
                component="div"
                sx={{ fontWeight: 800, mb: 1 }}
              >
                ۱۰۰%
              </Typography>
              <Typography variant="h5" sx={{ opacity: 0.9 }}>
                {i18n.language === "fa" ? "رضایت مشتری" : "Client Satisfaction"}
              </Typography>
            </Card>
          </Box>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Box
            sx={{
              textAlign: "center",
              p: 6,
              background: "linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)",
              borderRadius: 4,
              color: "white",
              boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
            }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{ fontWeight: 800, mb: 3 }}
            >
              {i18n.language === "fa"
                ? "می‌خواهید پروژه بعدی ما باشید؟"
                : "Want to be our next project?"}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                opacity: 0.9,
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              {i18n.language === "fa"
                ? "برای شروع همکاری با موسسه حسابرسی بهمند و بهره‌مندی از خدمات تخصصی ما، با ما تماس بگیرید"
                : "Contact us to start collaborating with Behmand Auditing Institute and benefit from our specialized services"}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              href="/contact"
              sx={{
                px: 8,
                py: 2,
                fontSize: "1.2rem",
                fontWeight: 700,
                borderRadius: 3,
                boxShadow: "0 8px 24px rgba(255,255,255,0.3)",
                "&:hover": {
                  boxShadow: "0 12px 32px rgba(255,255,255,0.4)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              {i18n.language === "fa" ? "شروع همکاری" : "Start Cooperation"}
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
