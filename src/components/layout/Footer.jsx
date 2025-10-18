import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Container, Typography, Grid, Stack, Link, IconButton, Divider } from "@mui/material";
import {
    Phone,
    Email,
    LocationOn,
    Fax,
    MarkunreadMailbox,
    LocalPostOffice,
    Facebook,
    LinkedIn,
    Twitter,
    Instagram,
    Copyright,
} from "@mui/icons-material";

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function Footer() {
    const { t } = useTranslation();
    return (
        <Box
            sx={{
                background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)",
                color: "white",
                py: { xs: 6, md: 8 },
                mt: "auto",
                borderTop: '1px solid rgba(255,255,255,0.1)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background Pattern */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `
                        radial-gradient(circle at 20% 80%, rgba(56, 142, 60, 0.05) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(56, 142, 60, 0.03) 0%, transparent 50%)
                    `,
                    pointerEvents: 'none',
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={4} justifyContent="space-between">
                    {/* About Company */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 900,
                                    mb: 2,
                                    background: 'linear-gradient(135deg, #66bb6a, #388e3c)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                بهمند
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
                                {t('footer.aboutCompany')}
                            </Typography>
                        </Box>
                        <Typography variant="body1" sx={{
                            color: 'rgba(255,255,255,0.8)',
                            lineHeight: 1.8,
                            mb: 3,
                            fontSize: '0.95rem'
                        }}>
                            ارائه‌دهنده خدمات حسابرسی مستقل، مشاوره مالی و مالیاتی برای شرکت‌های بزرگ و کوچک با تمرکز بر نوآوری و اعتماد.
                        </Typography>

                        {/* Social Media */}
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'white', fontSize: '1rem' }}>
                                {t('footer.followUs')}
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                {[
                                    { icon: <Facebook />, color: "#1877F2", href: "#" },
                                    { icon: <LinkedIn />, color: "#0A66C2", href: "#" },
                                    { icon: <Twitter />, color: "#1DA1F2", href: "#" },
                                    { icon: <Instagram />, color: "#E4405F", href: "#" },
                                ].map((social, index) => (
                                    <IconButton
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        sx={{
                                            backgroundColor: 'rgba(255,255,255,0.1)',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: social.color,
                                                transform: 'translateY(-2px)',
                                                boxShadow: `0 4px 12px ${social.color}40`,
                                            },
                                            transition: 'all 0.3s ease',
                                            width: 44,
                                            height: 44,
                                        }}
                                    >
                                        {social.icon}
                                    </IconButton>
                                ))}
                            </Stack>
                        </Box>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={12} sm={6} md={2}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: 'white', mb: 3 }}>
                            {t('footer.quickLinks')}
                        </Typography>
                        <Stack spacing={2}>
                            {[
                                { text: t('nav.home'), url: "/" },
                                { text: t('nav.about'), url: "/about" },
                                { text: t('nav.services'), url: "/services" },
                                { text: t('nav.blog'), url: "/blog" },
                                { text: t('nav.contact'), url: "/contact" },
                                { text: t('nav.careers'), url: "/careers" },
                            ].map((item, i) => (
                                <Link
                                    key={i}
                                    href={item.url}
                                    sx={{
                                        color: "rgba(255,255,255,0.8)",
                                        textDecoration: "none",
                                        display: 'block',
                                        transition: 'all 0.3s ease',
                                        fontWeight: 500,
                                        fontSize: '0.9rem',
                                        '&:hover': {
                                            color: '#66bb6a',
                                            transform: 'translateX(8px)',
                                        },
                                    }}
                                >
                                    {item.text}
                                </Link>
                            ))}
                        </Stack>
                    </Grid>

                    {/* External Links */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: 'white', mb: 3 }}>
                            {t('footer.usefulLinks')}
                        </Typography>
                        <Stack spacing={2}>
                            {[
                                { text: "جامعه حسابداران رسمی ایران", url: "https://iacpa.ir/" },
                                { text: "سازمان بورس و اوراق بهادار", url: "https://www.seo.ir/" },
                                { text: "سازمان حسابرسی", url: "https://audit.org.ir/" },
                                { text: "IFRS استانداردهای بین‌المللی", url: "https://www.ifrs.org/" },
                                { text: "بانک مرکزی جمهوری اسلامی", url: "https://www.cbi.ir/" },
                            ].map((item, i) => (
                                <Link
                                    key={i}
                                    href={item.url}
                                    target="_blank"
                                    sx={{
                                        color: "rgba(255,255,255,0.8)",
                                        textDecoration: "none",
                                        display: 'block',
                                        transition: 'all 0.3s ease',
                                        fontWeight: 500,
                                        fontSize: '0.9rem',
                                        '&:hover': {
                                            color: '#66bb6a',
                                            transform: 'translateX(8px)',
                                        },
                                    }}
                                >
                                    {item.text}
                                </Link>
                            ))}
                        </Stack>
                    </Grid>

                    {/* Contact Info */}
                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: 'white', mb: 3 }}>
                            {t('footer.contactUs')}
                        </Typography>
                        <Stack spacing={2.5}>
                            {/* Address */}
                            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                                <LocationOn sx={{
                                    mr: 2,
                                    mt: 0.5,
                                    color: '#66bb6a',
                                    fontSize: 20
                                }} />
                                <Typography variant="body2" sx={{
                                    color: 'rgba(255,255,255,0.8)',
                                    lineHeight: 1.6,
                                    fontSize: '0.85rem'
                                }}>
                                    خیابان قائم مقام فراهانی – شماره ۱۱۴ – طبقه ۴ – واحد ۱۸
                                </Typography>
                            </Box>

                            {/* Phone Numbers */}
                            <Box>
                                {[
                                    "02188305391",
                                    "02188843708",
                                    "02188320129",
                                ].map((num, i) => (
                                    <Link
                                        key={i}
                                        href={`tel:${num}`}
                                        sx={{
                                            color: "rgba(255,255,255,0.8)",
                                            textDecoration: "none",
                                            display: "flex",
                                            alignItems: "center",
                                            mb: 1.5,
                                            transition: 'all 0.3s ease',
                                            fontSize: '0.85rem',
                                            '&:hover': {
                                                color: '#66bb6a',
                                            },
                                        }}
                                    >
                                        <Phone sx={{ mr: 1.5, fontSize: 18, color: '#66bb6a' }} />
                                        {num}
                                    </Link>
                                ))}
                            </Box>

                            {/* Fax and Postal */}
                            <Box sx={{ display: "flex", alignItems: "center", color: 'rgba(255,255,255,0.7)' }}>
                                <Fax sx={{ mr: 1.5, fontSize: 18, color: '#66bb6a' }} />
                                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                                    02188844685
                                </Typography>
                            </Box>

                            {/* Email */}
                            <Link
                                href="mailto:info@behmand.com"
                                sx={{
                                    color: "rgba(255,255,255,0.8)",
                                    textDecoration: "none",
                                    display: "flex",
                                    alignItems: "center",
                                    transition: 'all 0.3s ease',
                                    fontSize: '0.85rem',
                                    '&:hover': {
                                        color: '#66bb6a',
                                    },
                                }}
                            >
                                <Email sx={{ mr: 1.5, fontSize: 18, color: '#66bb6a' }} />
                                info@behmand.com
                            </Link>

                            {/* Postal Info */}
                            <Box sx={{ display: "flex", alignItems: "center", color: 'rgba(255,255,255,0.7)' }}>
                                <LocalPostOffice sx={{ mr: 1.5, fontSize: 18, color: '#66bb6a' }} />
                                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                                    {t('footer.postalCode')}: ۱۵۸۶۹۳۶۱۴۵
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>

                {/* Divider */}
                <Divider sx={{ my: 4, backgroundColor: 'rgba(255,255,255,0.1)' }} />

                {/* Copyright */}
                <Box sx={{
                    textAlign: "center",
                    pt: 2,
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                        <Copyright sx={{ fontSize: 16, mr: 1, color: '#66bb6a' }} />
                        <Typography variant="body2" sx={{
                            color: 'rgba(255,255,255,0.7)',
                            fontWeight: 500,
                        }}>
                            {new Date().getFullYear()} {t('footer.aboutCompany')}. {t('footer.rights')}
                        </Typography>
                    </Box>
                    <Typography
                        variant="caption"
                        sx={{ color: 'rgba(255,255,255,0.65)', display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
                    >
                        طراحی و توسعه با ❤️
                        <Link
                            href="https://t.me/m_ehdii"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                ml: 0.5,
                                color: 'rgba(255,255,255,0.9)',
                                textDecoration: "none",
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 0.5,
                                transition: 'all 0.3s ease',
                                fontWeight: 500,
                                fontSize: '0.9rem',
                                '&:hover': {
                                    color: '#66bb6a',
                                    transform: 'translateX(8px)',
                                },
                            }}
                            aria-label="ارسال پیام مستقیم در تلگرام به m_ehdii"
                            title="برای پیام مستقیم کلیک کنید"
                        >
                            <ChatBubbleOutlineIcon sx={{ fontSize: 14, opacity: 0.85 }} />
                            m_ehdi
                        </Link>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}