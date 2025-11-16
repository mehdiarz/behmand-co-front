import React, {useEffect, useState} from "react";
import {
  Box,
  Container,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  IconButton,
  useTheme,
  useMediaQuery,
  Chip,
  Button,
  Card,
  CardContent,
  alpha,
  Grid,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import { useTranslation } from "react-i18next";

// داده‌های کامل نمونه کارها
const portfolioData = {
  "صنایع پتروشیمی ، شیمیایی وفلزی": [
    "آریا شیمی شرق",
    "پترو فرهنگ",
    "پتروشیمی گناوه دشتستان",
    "ساپرا شیمی",
    "اسید سازان زنجان",
    "آلومتک",
    "آلومراد",
    "بازرگانی پتروشیمی",
    "پاتله",
    "پاکسان",
    "پترو کک آرین ویان غرب",
    "پونل برسام",
    "تقطیر خراسان",
    "توسعه پتروشیمی کنگان",
    "تولیدی منیزیم گستر اریش",
    "شیشه قزوین",
    "صبا فولاد زاگرس",
    "صنایع پتروشیمی هگمتانه",
    "صنایع فولاد سازان امیرآباد",
    "صنایع فولاد سازان دماوند",
    "صنعتی و معدنی شمالشرق شاهرود",
    "کیمیای پارس خاورمیانه",
    "مهندسی و توسعه صنایع فلات قاره پرشین",
    "فرآوری ماسه سیلیسی فیروزکوه",
    "صنعتی و شیمیایی رنگین",
    "لوله و تجهیزات سدید",
  ],
  "صنایع معدنی": [
    "ملی سرب و روی ایران",
    "فرآوری مواد معدنی ایران",
    "مجتمع معادن مس تکنار",
    "تولید روی بندر عباس",
    "مجتمع ذوب و احیای روی قشم",
    "آلیاژ گستر قشم",
    "صدر معادن ایرانیان",
    "بازرگانی توسعه صنعت روی",
    "احداث کانسار راوه",
  ],
  "فناوری اطلاعات": [
    "افرانت",
    "رایان هم افزا",
    "کارت اعتباری ایران کیش",
    "آسان پرداخت پرشین",
    "پیشتازان ایده نوین اطلس",
    "نگین رایان ساتراپ",
    "گسترش و نوآوری الکترونیک رایا",
    "توسعه فناوری سفیر شاپراد",
    "دانا پردازش بنیان پی",
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
    "سیمان عمران انارک(دلیجان)",
    "سیمان ارض العماره",
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
    "داروسازی اسوه",
    "کیمیدارو",
    "داروسازی ابوریحان",
    "پخش اکسیر",
    "راموفارمین",
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
    "بسته بندی مشهد",
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
    "سایپا شیشه",
    "منیزیم گستر اریش",
    "پلی اورتان کاسپین",
  ],

  "ماشین سازی": [
    "جام امید البرز",
    "ماشین سازی اراک",
    "ماشین سازی نیرو محرکه",
    "کارخا نجات صنعتی و تولیدی اتمسفر",
  ],

  "سایر شرکتها و موسسات": [
    "تامین ماسه ریخته گری",
    "سرمايه‌گذاري و توسعه صنايع لاستيك",
    "گروه صنعتی بارز",
    "فرهنگی ورزشی پرسپولیس",
    "لامیران",
    "تولیدی و صنعتی درخشان تهران",
    "حریر خوزستان",
    "سرویس بیمه شهر",
    "کالسیمین",
    "افست",
  ],
};

const drawerWidth = 280;

export default function PortfolioPage() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedIndustry, setSelectedIndustry] = useState(
    "صنایع پتروشیمی ، شیمیایی وفلزی",
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const industries = Object.keys(portfolioData);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleIndustrySelect = (industry) => {
    setSelectedIndustry(industry);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [selectedIndustry]);

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
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const totalIndustries = Object.keys(portfolioData).length;
  const totalCompanies = Object.values(portfolioData).flat().length;

  // منوی صنایع
  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        height: "100%",
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
          background: "linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)",
          color: "white",
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
          <BusinessIcon />
          {i18n.language === "fa" ? "صنایع" : "Industries"}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
          {industries.length}{" "}
          {i18n.language === "fa" ? "دسته‌بندی" : "Categories"}
        </Typography>
      </Box>

      <List sx={{ p: 1 }}>
        {industries.map((industry) => (
          <ListItem key={industry} disablePadding>
            <ListItemButton
              selected={selectedIndustry === industry}
              onClick={() => handleIndustrySelect(industry)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                mx: 0.5,
                py: 1.5,
                "&.Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                },
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                <WorkIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, fontSize: "0.85rem" }}
                  >
                    {industry}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    {portfolioData[industry].length}{" "}
                    {i18n.language === "fa" ? "شرکت" : "Companies"}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)",
        mt: 10,
      }}
    >
      {/* منوی کشویی برای موبایل */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            border: "none",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* منوی ثابت برای دسکتاپ */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            position: "relative",
            border: "none",
            boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
          },
        }}
        open
      >
        {drawer}
      </Drawer>

      {/* محتوای اصلی */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* هدر با دکمه منو در موبایل */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 1,
                display: { md: "none" },
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 800,
                  color: "text.primary",
                  fontSize: { xs: "1.75rem", md: "2.125rem" },
                }}
              >
                {i18n.language === "fa"
                  ? "نمونه کارهای موسسه"
                  : "Our Portfolio"}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mt: 0.5, fontSize: { xs: "0.9rem", md: "1.25rem" } }}
              >
                {i18n.language === "fa"
                  ? "مشتریان در طول سنوات فعالیت موسسه حسابرسی بهمند"
                  : "Clients throughout the years of operation of Behmand Audit Firm"}
              </Typography>
            </Box>
          </Box>

          <Chip
            icon={<CorporateFareIcon />}
            label={`${portfolioData[selectedIndustry].length} ${i18n.language === "fa" ? "شرکت" : "Companies"}`}
            color="primary"
            sx={{ fontWeight: 700, display: { xs: "none", sm: "flex" } }}
          />
        </Box>

        {/* محتوای صنعت انتخاب شده */}
        <motion.div
          key={selectedIndustry}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              mb: 3,
              background: "white",
            }}
          >
            <CardContent sx={{ p: 0 }}>
              {/* هدر صنعت */}
              <Box
                sx={{
                  p: 2.5,
                  background:
                    "linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)",
                  color: "white",
                  borderRadius: "12px 12px 0 0",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <BusinessIcon sx={{ fontSize: 28 }} />
                  <Box>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ fontWeight: 700, fontSize: "1.4rem" }}
                    >
                      {selectedIndustry}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                      {i18n.language === "fa"
                        ? "شرکت‌های همکار در این صنعت"
                        : "Partner companies in this industry"}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* گرید شرکت‌ها */}
              <Box sx={{ p: 2 }}>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Grid container spacing={1.5}>
                    {portfolioData[selectedIndustry].map((company, index) => (
                      <Grid
                        item
                        xs={6}
                        sm={4}
                        md={3}
                        key={company}
                        sx={{ width: { xs: "100%", sm: "47%", lg: "22%" } }}
                      >
                        <motion.div
                          variants={itemVariants}
                          layout
                          sx={{ width: { xs: "100%", sm: "47%", lg: "22%" } }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              width: "100%",
                              p: 1.5,
                              borderRadius: 2,
                              transition: "all 0.2s ease",
                              backgroundColor: alpha("#388e3c", 0.03),
                              border: "1px solid",
                              borderColor: alpha("#388e3c", 0.1),
                              height: "fit-content",
                              minHeight: 60,
                              "&:hover": {
                                backgroundColor: alpha("#388e3c", 0.08),
                                borderColor: "primary.light",
                                boxShadow: "0 2px 8px rgba(56, 142, 60, 0.15)",
                                transform: "translateY(-2px)",
                              },
                            }}
                          >
                            <CheckCircleIcon
                              sx={{
                                color: "success.main",
                                fontSize: 20,
                                mr: 1.5,
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 600,
                                color: "text.primary",
                                fontSize: "0.8rem",
                                lineHeight: 1.3,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              {company}
                            </Typography>
                          </Box>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </motion.div>
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        <Box sx={{ flexGrow: 1 }} />
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
                sm: "1fr 1fr 1fr",
                md: "1fr 1fr 1fr",
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
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
