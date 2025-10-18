# راهنمای چندزبانه سازی وب‌سایت بهمند

## خلاصه تغییرات

این پروژه اکنون از پشتیبانی کامل دو زبانه (فارسی و انگلیسی) برخوردار است.

## فایل‌های اضافه شده

### 1. فایل‌های ترجمه
- `src/locales/fa.json` - ترجمه‌های فارسی
- `src/locales/en.json` - ترجمه‌های انگلیسی

### 2. پیکربندی i18next
- `src/i18n.js` - تنظیمات اصلی i18next

### 3. Context مدیریت زبان
- `src/contexts/LanguageContext.jsx` - Context برای مدیریت زبان در سراسر اپلیکیشن

### 4. کامپوننت تغییر زبان
- `src/components/LanguageSwitcher.jsx` - دکمه تغییر زبان

## کتابخانه‌های نصب شده

```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

## نحوه استفاده

### 1. استفاده از ترجمه در کامپوننت‌ها

```jsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('home.hero.title')}</h1>
      <p>{t('home.hero.description')}</p>
    </div>
  );
}
```

### 2. استفاده از Context زبان

```jsx
import { useLanguage } from '../contexts/LanguageContext';

function MyComponent() {
  const { currentLanguage, changeLanguage, isRTL } = useLanguage();
  
  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <button onClick={() => changeLanguage('en')}>
        English
      </button>
      <button onClick={() => changeLanguage('fa')}>
        فارسی
      </button>
    </div>
  );
}
```

## ساختار فایل‌های ترجمه

```json
{
  "header": {
    "home": "خانه",
    "about": "درباره ما",
    "services": "خدمات"
  },
  "home": {
    "hero": {
      "title": "موسسه حسابرسی بهمند",
      "subtitle": "مشاوره مالی و حسابرسی تخصصی"
    }
  }
}
```

## ویژگی‌های پیاده‌سازی شده

1. ✅ دکمه تغییر زبان در Header (دسکتاپ و موبایل)
2. ✅ ذخیره انتخاب زبان در localStorage
3. ✅ تشخیص خودکار زبان مرورگر
4. ✅ پشتیبانی از RTL برای فارسی
5. ✅ ترجمه منوهای ناوبری
6. ✅ ساختار قابل گسترش برای ترجمه‌های بیشتر

## نحوه اضافه کردن ترجمه جدید

1. کلید جدید را به فایل‌های `fa.json` و `en.json` اضافه کنید
2. در کامپوننت مورد نظر از `useTranslation` استفاده کنید
3. کلید ترجمه را با `t('key.path')` فراخوانی کنید

## نکات مهم

- زبان پیش‌فرض: فارسی
- زبان fallback: فارسی
- انتخاب زبان در localStorage ذخیره می‌شود
- دکمه تغییر زبان در گوشه راست Header قرار دارد
- در نسخه موبایل، دکمه تغییر زبان در منوی کشویی قرار دارد

## تست عملکرد

1. پروژه را اجرا کنید: `npm run dev`
2. دکمه تغییر زبان را در Header کلیک کنید
3. بین فارسی و انگلیسی جابجا شوید
4. صفحه را refresh کنید تا ببینید انتخاب زبان حفظ می‌شود
