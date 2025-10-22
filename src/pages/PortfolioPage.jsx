import React, { useState } from "react";
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
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTranslation } from "react-i18next";

// داده‌های کامل نمونه کارها
const portfolioData = {
    "صنایع پتروشیمی ، شیمیایی ، معدنی وفلزی": [
        "آریا شیمی شرق", "پترو فرهنگ", "پتروشیمی گناوه دشتستان", "ساپرا شیمی",
        "احداث کانسار راوه", "اسید سازان زنجان", "آلومتک", "آلومراد", "آلیاژ گستر قشم",
        "بازرگانی پتروشیمی", "بازرگانی توسعه صنعت روی", "پاتله", "پاکسان", "پترو کک آرین ویان غرب",
        "پونل برسام", "تقطیر خراسان", "توسعه پتروشیمی کنگان", "تولید روی بندر عباس",
        "تولیدی منیزیم گستر اریش", "شیشه قزوین", "صبا فولاد زاگرس", "صدر معادن ایرانیان",
        "صنایع پتروشیمی هگمتانه", "صنایع فولاد سازان امیرآباد", "صنایع فولاد سازان دماوند",
        "صنعتی و معدنی شمالشرق شاهرود", "فرآوری مواد معدنی ایران", "کیمیای پارس خاورمیانه",
        "مجتمع ذوب و احیای روی قشم", "مجتمع معادن مس تکنار", "ملی سرب و روی ایران",
        "مهندسی و توسعه صنایع فلات قاره پرشین", "فرآوری ماسه سیلیسی فیروزکوه",
        "صنعتی و شیمیایی رنگین", "لوله و تجهیزات سدید"
    ],

    "صنعت سیمان": [
        "سیمان الدوز خوی", "سیمان خاش", "سیمان دورود", "سیمان کارون", "سیمان لارستان",
        "سیمان مدلل", "سیمان اردستان", "صنایع سیمان کیاسر", "صنعت سیمان شاهین دژ",
        "کارخانه سیمان آذرآبادگان خوی", "سیمان سپاهان", "سیمان خاش", "سیمان درود"
    ],

    "سرمایه گذاری ها و نهادهای مالی": [
        "مدیریت صنعت شوینده توسعه صنایع بهشهر", "سرمایه گذاری اقتصاد شهر طوبی",
        "سرمایه گستر مهان بتیس", "ارزش آفرین برق و آب صبا", "اعتبار آفرین",
        "اعتبار الگوریتم آیا", "بازرگانی عصر بهمن", "تأمین سرمایه کاردان",
        "تامین سرمایه نوین", "توسعه سرمایه رادین", "توسعه سرمایه رسا",
        "توسعه سرمایه گذاری کشاورزی آرین توسکا", "توسعه صنعت کیمیا زر",
        "توسعه عمران انارک", "دادو ستد آریا", "راهکارهای خلاق کلک خیال",
        "زرین ساز انارک", "ساربان سرمایه ایرانیان", "سامان سهام سپاهان",
        "سرمایه گذاری آوین", "سرمایه گذاری ایران و فرانسه", "سرمایه گذاری بهمن",
        "سرمایه گذاری بوعلی", "سرمایه گذاری توسعه شهری توس گستر",
        "سرمایه گذاری توسعه صنعت و تجارت", "سرمایه گذاری ساختمانی نظام مهندسی ایران",
        "سرمایه گذاری صنایع برق و آب صبا", "سرمایه گذاری عمران و توسعه پایدار ایرانیان",
        "سرمایه گذاری فرهنگیان", "سرمایه گذاری گروه صنعتی رنا",
        "سرمایه گذاری گنجینه ایرانیان", "سرمایه‌گذاری دانشگاه تهران",
        "فرزان تجارت پارمیس", "گروه سرمایه گذاری و مدیریت مالی میلاد شهر",
        "گروه صنعتی ایرانیان", "گروه مادیران (صنایع مادیران)", "گروه مالی شهر",
        "گروه مدیریت سرمایه لیان", "مدیریت سرمایه گذاری ملی ایران",
        "سرمایه گذاری استان گیلان", "مدیریت عمران و توسعه شهر آتیه",
        "مروارید تک آمانج", "مهندسی بازرگانی ارزش آفرینان نوین آرا",
        "گروه صنعتی سدید", "گروه صنعتی قطعات اتومبیل ایران",
        "موسسه رفاه و تأمین آتیه کارکنان بانک سپه", "موسسه صندوق ذخیره فرهنگیان",
        "سرمایه گذاری جامی"
    ],

    "صنایع نفت و پالایشی": [
        "پالایش نفت اصفهان", "پالایش نفت بندر عباس", "گلوبال پتروتک کیش",
        "صنعتی دریایی ایران -صدرا", "نفت پارس", "تجهيزات توربو كمپرسور نفت",
        "توسعه خدمات بازرگانی و مالی صبا نفت", "مهندسی و خدمات نفت کاو ژرف",
        "توسعه صنایع نفت و انرژی قشم", "مهندسی بستا نفت", "خدمات مهندسی نفت کیش",
        "توربوکمپرسورنفت", "طراحی مهندسی توربوکمپرسور نفت آسیا",
        "مدیریت و هماهنگی ساخت تجهیزات اساسی نفت صبا"
    ],

    "بانکها و موسسات اعتباری": [
        "بانک شهر", "موسسه اعتباری ملل", "بانک گردشگری", "بانک اقتصاد نوین",
        "بانک دی", "بانک ایران زمین", "موسسه اعتباری نور", "بانک انصار",
        "شعبه بانک تعاون اسلامی برای سرمایه گذاری"
    ],

    "صندوق ها ،کارگزاری ها و سبدگردانها": [
        "سبد گردان دارایی نیکی", "سبدگردان آسمان", "سبدگردان سورین",
        "کارگزاری بانک اقتصاد نوین", "کارگزاری بانک آینده", "کارگزاری بانک ملت",
        "کارگزاری بورسیران", "کارگزاری سرمایه گذاری ملی ایران", "کارگزاری شهر",
        "کارگزاری کالای خاورمیانه", "صندوق اختصاصی بازارگردان صنعت مس",
        "صندوق اختصاصی بازارگردانی پست بانک ایران",
        "صندوق سرمایه گذاری اختصاصی بازارگردان گروه توسعه بهشهر",
        "صندوق سرمایه گذاری اختصاصی بازارگردانی تجارت ایرانیان اعتماد",
        "صندوق سرمایه گذاری اختصاصی بازارگردانی روماک",
        "صندوق سرمایه گذاری اختصاصی بازارگردانی سورین",
        "صندوق سرمایه گذاری اختصاصی بازارگردانی شهر",
        "صندوق سرمایه گذاری ارمغان ایرانیان", "صندوق سرمایه گذاری اکسیر دوم فارابی",
        "صندوق سرمایه گذاری با درآمد ثابت اعتماد ملل",
        "صندوق سرمایه گذاری با درآمد ثابت نگین سامان",
        "صندوق سرمایه گذاری بازارگردانی نوین پیشرو",
        "صندوق سرمایه گذاری بخشی فلزات کیمیا",
        "صندوق سرمایه گذاری جسورانه آشنا تک ایرانیان",
        "صندوق سرمایه گذاری جسورانه پیشرفت",
        "صندوق سرمایه گذاری در اوراق بهادار با درآمد ثابت کارآمد",
        "صندوق سرمایه گذاری در اوراق بهادار با درآمد ثابت کیمیا",
        "صندوق سرمایه گذاری زمین و ساختمان نسیم", "صندوق سرمایه گذاری سلام فارابی",
        "صندوق سرمایه گذاری سهام بزرگ کاردان", "صندوق سرمایه گذاری سهام نگر کیمیا",
        "صندوق سرمایه گذاری کیمیا زرین کاردان", "صندوق سرمایه گذاری لوتوس پارسیان",
        "صندوق سرمایه گذاری مشترک بورسیران", "صندوق سرمایه گذاری مشترک یکم سامان",
        "صندوق سرمایه گذاری نیکوکاری همیار آشنا ایرانیان",
        "صندوق سرمایه گذاریاختصاصی بازارگردانی الگوریتمی امید فارابی",
        "صندوق سرمایه‌گذاری اختصاصی بازارگردانی کارگزاری کارآفرین",
        "صندوق نیکوکاری جایزه علمی فناوری پیامبر اعظم", "کارگزاری بانک تجارت",
        "موسسه تامین آتیه کارکنان بانک شهر", "کارگزاری بورسیران", "کارگزاری آرمون بورس",
        "کارگزاری پارس نمودگر"
    ],

    "قندوشکر": [
        "شرکت شکر", "شرکت فراسازان سمنان", "شرکت قند لرستان", "شرکت قند نقش جهان",
        "شرکت قند مرودشت", "شرکت قند پارس", "شرکت قند نیشابور", "شرکت قند هکمتان",
        "شرکت کارخانجات قند قزوین"
    ],

    "دارویی و صنایع وابسته": [
        "توسعه طب آدریان سلامت", "پخش مکمل کارن", "دارو درمان سپهر", "دارو صنعت ویانا",
        "داروسازی و مکملهای غذایی حیاتی کارن", "رازان فارمد ایرانیان", "کارخانجات دارو پخش",
        "نو آوران دارویی کیمیا", "هیلیا فارمد", "ویتان فارمد", "دارو سازی جابرابن حیان",
        "پخش رازی"
    ],

    "راه و ساختمان و ابنیه": [
        "بهینه سازان بهمن", "توسعه ساختمانی بهمن", "ساختمان نصب تانسو",
        "ساختمان و عمران شهر پایدار", "ساختمانی آرادان", "ساختمانی ایمن ساخت برزین",
        "ساختمانی معلم", "سامان صانع اصفهان", "سامان گستر اصفهان",
        "سرمایه گذاری ساختمان گروه صنایع بهشهر تهران", "مسکن و ساختمان جهان",
        "مهرسا شایان آریا", "مهندسی و ساختمانی صبا نفت",
        "صندوق سرمایه گذاری زمین و ساختمان نارون",
        "سرمایه گذاری ساختمانی نظام مهندسی ایران"
    ],

    "روغن نباتی و غذایی": [
        "الین شیمی", "امید آوران سبز هکمتان", "توسعه کشت دانه های روغنی",
        "روغن نباتی شیراز", "سپهان", "روغن نباتی پارس", "صنعتی بهپاک",
        "صنعتی زرماکارون", "فراورده های گوشتی بیستون",
        "کارخانجات صنعتی روغن کشی کلهر کرمانشاه", "کشت و صنعت جوین",
        "کشت و صنعت رجال سبز زنده رود", "کشت و صنعت مدلل شمال", "نابدانه مدلل",
        "نارایران", "کشت و صنعت مدلل ماهیدشت",
        "مجتمع دامپروری و کشاورزی باوان کلهر مدلل", "نوین گستر مشکات"
    ],

    "شهرداری ها و سازمانهای وابسته": [
        "اوراق مشارکت قطار شهری قم", "اوراق مشارکت قطار شهری کرمانشاه",
        "سازمان فناوری اطلاعات و ارتباطات شهرداری تهران", "شرکت کنترل ترافیک تهران",
        "شرکت نوین عرف شهریار", "سازمان مهندسی شهر تهران",
        "سازمان میادین میوه و تره بار شهر تهران",
        "سازمان آتش نشانی و خدمات ایمنی تهران", "سازمان پسماند شهر تهران",
        "سازمان زیبا سازی شهرداری تهران", "شرکت واحد اتوبوس رانی تهران و حومه",
        "بهره برداری نمایشگاه های بین المللی شهر آفتاب تهران",
        "سازمان آتش نشانی و خدمات ایمنی شهرداری تهران",
        "سازمان مدیریت و نظارت بر تاکسیرانی شهرداری تهران", "سازمان نوسازي شهرتهران"
    ],

    "لیزینگ و صرافی": [
        "لیزینگ اقتصاد نوین", "لیزینگ خودرو غدیر", "لیزینگ شهر",
        "لیزینگ گسترش سرمایه گذاری ملی", "واسپاری تامین توسعه آرتین", "واسپاری ملت",
        "واسپاری توسعه اعتبار هوشمند", "واسپاری توسعه گستر برنا",
        "خدمات ارزی و صرافی اقتصاد نوین", "صرافی دی", "صرافی گردشگری", "صرافی شهر"
    ],

    "تولیدبرق و صنایع جانبی": [
        "آب و برق کیش", "توسعه مولد نیروگاهی جهرم", "توسعه و احداث نیروگاههای بادی توان باد",
        "توسعه و احداث نیروگاهی توان", "مدیریت تولید برق طوس", "مولد نیروگاهی تجارت فارس",
        "گروه مپنا", "فرآب", "نیرو آتیه صبا", "نیرو صنعت پارسین نور",
        "صنایع کاژه ویسمن", "مدیریت فرآیندهای نیروگاهی ایرانیان"
    ],

    "صنایع بسته بندی": [
        "صنایع بسته بندی شیراز", "صنایع چاپ و بسته بندی آسان قزوین",
        "صنایع چاپ و بسته بندی آیسان مهر البرز", "صنایع معدنی نوظهور شاهرود",
        "صنایع بسته بندی ایران", "صنایع چوب و کاغذ ایران (چوکا)", "کارتن ایران",
        "مهر پلاست مدلل", "مدیریت یاران توسعه بهشهر"
    ],

    "نساجی و پوشاک": [
        "پلی اکریل ایران", "تولیدی بافت آزادی", "واحد صنعتی پوشاک هاکوپیان",
        "فرش پارس", "نقره نخ", "ناز نخ", "پوشاک نوراشن", "الیاف ترمه اسپادانا",
        "پلی اکریل ایران"
    ],

    "حمل و نقل": [
        "حمل و نقل بین المللی نوین ترابر گلدیران", "حمل و نقل توسعه ترابر گلدیران",
        "حمل و نقل زر ترابر ایرانیان", "حمل و نقل صنایع روغن بارگلزا",
        "حمل و نقل کارکنان و کارخانجات سیمان و فارسیت دورود", "کشتیرانی آفتاب کیش",
        "کلهر بار مدلل", "لجستیک گلدیران نوین کیش", "حمل و نقل سیمان سازان اردستان",
        "حمل و نقل سنگین بار کلهر", "حمل و نقل زر ترابر ایرانیان"
    ],

    "خدمات بیمه": [
        "بیمه نوین", "بیمه ما", "خدمات بیمه ای اقتصاد نوین", "خدمات بیمه ای بهمن",
        "کارگزاری رسمی بیمه مستقیم بر خط گلدیران آسایش",
        "کارگزاری رسمی بیمه مستقیم برخط پایوران رستاک آریائی",
        "پوشش بیمه توسعه بهشهر"
    ],

    "تولید سیم و کابل وتجهیزات برق": [
        "پارس سویچ", "تولیدی قرقره شمال", "سیم لاکی فارس", "کابل البرز", "سیمکو",
        "سیمکو پلیمر", "صنایع برق زنگان پارس", "صنایع زنگان پارت قطعه", "گیل راد شمال"
    ],

    "خودرو و صنایع وابسته": [
        "آریا دیزل موتور", "ایران ورز", "تولیدی اریش خودرو", "تولیدی پلی اوره تان ایران",
        "تولیدی و صنعتی شیشه گیلان", "سیستمهای صندلی پارس", "شاسی ساز ایران",
        "گروه توسعه صنعتی خودرو سازی زر", "مشترک ایران خودرو اتومبیل پژو"
    ],

    "ماشین سازی": [
        "جام امید البرز", "ماشین سازی اراک", "ماشین سازی نیرو محرکه",
        "کارخا نجات صنعتی و تولیدی اتمسفر"
    ],

    "سایر شرکتها و موسسات": [
        "تامین ماسه ریخته گری", "افرا نت", "سرمايه‌گذاري و توسعه صنايع لاستيك",
        "گروه صنعتی بارز", "فرهنگی ورزشی پرسپولیس", "لامیران",
        "تولیدی و صنعتی درخشان تهران", "حریر خوزستان", "رایان هم افزا",
        "سرویس بیمه شهر", "کالسیمین", "افست"
    ]
};

const drawerWidth = 320;

export default function PortfolioPage() {
    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedIndustry, setSelectedIndustry] = useState("صنایع پتروشیمی ، شیمیایی ، معدنی وفلزی");
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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03
            }
        }
    };

    const itemVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.4
            }
        }
    };

    // منوی صنایع
    const drawer = (
        <Box sx={{ overflow: 'auto' }}>
            <Box sx={{
                p: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
                background: 'linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)',
                color: 'white'
            }}>
                <Typography variant="h6" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BusinessIcon />
                    {i18n.language === 'fa' ? 'صنایع' : 'Industries'}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                    {industries.length} {i18n.language === 'fa' ? 'دسته‌بندی' : 'Categories'}
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
                                mx: 1,
                                '&.Mui-selected': {
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                    }
                                },
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                }
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                                <WorkIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        {industry}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                        {portfolioData[industry].length} {i18n.language === 'fa' ? 'شرکت' : 'Companies'}
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
        <Box sx={{
            display: 'flex',
            minHeight: "100vh",
            background: "linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)",
            mt:10
        }}>
            {/* منوی کشویی برای موبایل */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        border: 'none'
                    },
                }}
            >
                {drawer}
            </Drawer>

            {/* منوی ثابت برای دسکتاپ */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        position: 'relative',
                        border: 'none',
                        boxShadow: '2px 0 8px rgba(0,0,0,0.1)'
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
                    minHeight: '100vh'
                }}
            >
                {/* هدر با دکمه منو در موبایل */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 4
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{
                                mr: 2,
                                display: { md: 'none' },
                                backgroundColor: 'primary.main',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'primary.dark',
                                }
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box>
                            <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: "text.primary" }}>
                                {i18n.language === 'fa' ? 'نمونه کارهای موسسه' : 'Our Portfolio'}
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ mt: 0.5 }}>
                                {i18n.language === 'fa'
                                    ? 'مشتریان و همکاران موسسه حسابرسی بهمند'
                                    : 'Clients and partners of Behmand Auditing Institute'}
                            </Typography>
                        </Box>
                    </Box>

                    <Chip
                        label={`${portfolioData[selectedIndustry].length} ${i18n.language === 'fa' ? 'شرکت' : 'Companies'}`}
                        color="primary"
                        sx={{ fontWeight: 700 }}
                    />
                </Box>

                {/* محتوای صنعت انتخاب شده */}
                <motion.div
                    key={selectedIndustry}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card sx={{ borderRadius: 4, boxShadow: '0 8px 32px rgba(0,0,0,0.08)', mb: 4 }}>
                        <CardContent sx={{ p: 0 }}>
                            {/* هدر صنعت */}
                            <Box sx={{
                                p: 3,
                                background: 'linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)',
                                color: 'white',
                                borderRadius: '16px 16px 0 0'
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <BusinessIcon sx={{ fontSize: 32 }} />
                                        <Box>
                                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
                                                {selectedIndustry}
                                            </Typography>
                                            <Typography variant="body1" sx={{ opacity: 0.9, mt: 0.5 }}>
                                                {i18n.language === 'fa'
                                                    ? 'شرکت‌های همکار در این صنعت'
                                                    : 'Partner companies in this industry'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                            {/* لیست شرکت‌ها */}
                            <Box sx={{ p: 2 }}>
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {portfolioData[selectedIndustry].map((company, index) => (
                                        <motion.div
                                            key={company}
                                            variants={itemVariants}
                                            layout
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    p: 2.5,
                                                    borderRadius: 3,
                                                    mb: 1,
                                                    transition: 'all 0.3s ease',
                                                    backgroundColor: 'background.paper',
                                                    border: '1px solid',
                                                    borderColor: 'divider',
                                                    '&:hover': {
                                                        backgroundColor: 'action.hover',
                                                        transform: 'translateX(8px)',
                                                        borderColor: 'primary.light',
                                                        boxShadow: '0 4px 12px rgba(56, 142, 60, 0.1)',
                                                    }
                                                }}
                                            >
                                                <CheckCircleIcon
                                                    sx={{
                                                        color: 'success.main',
                                                        fontSize: 28,
                                                        mr: 2
                                                    }}
                                                />
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: 600,
                                                            color: 'text.primary',
                                                            mb: 0.5
                                                        }}
                                                    >
                                                        {company}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: 'success.main',
                                                            fontWeight: 500
                                                        }}
                                                    >
                                                        {i18n.language === 'fa' ? 'همکاری موفق' : 'Successful Collaboration'}
                                                    </Typography>
                                                </Box>
                                                <Chip
                                                    label={i18n.language === 'fa' ? 'مشتری موسسه' : 'Our Client'}
                                                    color="primary"
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{ fontWeight: 600, ml: 1 }}
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
                    <Grid container spacing={3} sx={{ mb: 6 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ textAlign: 'center', p: 3, borderRadius: 4, boxShadow: 3 }}>
                                <Typography variant="h3" component="div" color="primary.main" sx={{ fontWeight: 800 }}>
                                    {Object.keys(portfolioData).length}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    {i18n.language === 'fa' ? 'صنعت مختلف' : 'Industries'}
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ textAlign: 'center', p: 3, borderRadius: 4, boxShadow: 3 }}>
                                <Typography variant="h3" component="div" color="primary.main" sx={{ fontWeight: 800 }}>
                                    {Object.values(portfolioData).flat().length}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    {i18n.language === 'fa' ? 'شرکت همکار' : 'Partner Companies'}
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ textAlign: 'center', p: 3, borderRadius: 4, boxShadow: 3 }}>
                                <Typography variant="h3" component="div" color="primary.main" sx={{ fontWeight: 800 }}>
                                    ۴۶+
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    {i18n.language === 'fa' ? 'سال تجربه' : 'Years Experience'}
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ textAlign: 'center', p: 3, borderRadius: 4, boxShadow: 3 }}>
                                <Typography variant="h3" component="div" color="primary.main" sx={{ fontWeight: 800 }}>
                                    ۱۰۰%
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    {i18n.language === 'fa' ? 'رضایت مشتری' : 'Client Satisfaction'}
                                </Typography>
                            </Card>
                        </Grid>
                    </Grid>
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
                            boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
                        }}
                    >
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                            {i18n.language === 'fa' ? 'می‌خواهید پروژه بعدی ما باشید؟' : 'Want to be our next project?'}
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                            {i18n.language === 'fa'
                                ? 'برای شروع همکاری با موسسه حسابرسی بهمند، با ما تماس بگیرید'
                                : 'Contact us to start collaborating with Behmand Auditing Institute'}
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            href="/contact"
                            sx={{
                                px: 6,
                                py: 1.5,
                                fontSize: "1.1rem",
                                fontWeight: 700,
                                borderRadius: 3,
                                boxShadow: "0 8px 24px rgba(255,255,255,0.3)",
                                "&:hover": {
                                    boxShadow: "0 12px 32px rgba(255,255,255,0.4)",
                                }
                            }}
                        >
                            {i18n.language === 'fa' ? 'تماس با ما' : 'Contact Us'}
                        </Button>
                    </Box>
                </motion.div>
            </Box>
        </Box>
    );
}

// کامپوننت Grid را import کنید
import Grid from '@mui/material/Grid';