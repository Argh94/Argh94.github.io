# Argh94.github.io

<p align="center">
  <img src="https://img.shields.io/badge/Argh94-Terminal_Portfolio-00ff00?style=for-the-badge&logo=terminal&logoColor=white" alt="Terminal Portfolio">
  <img src="https://img.shields.io/badge/HTML5-Interactive_Terminal-ff6600?style=flat&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/JavaScript-Powered_ES6-yellow?style=flat&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/PWA-Installable-00d4aa?style=flat&logo=pwa&logoColor=white" alt="PWA">
  <img src="https://img.shields.io/badge/Responsive-Mobile_First-4a90e2?style=flat&logo=responsive-design&logoColor=white" alt="Responsive">
</p>


> **یک پرتفولیوی تعاملی تمام‌عیار با شبیه‌سازی ترمینال، تم‌های هکری، انیمیشن‌های ماتریکس، PWA، آنالیتیکس و SSH شبیه‌سازی شده!**  
> طراحی شده توسط **Argh94** — توسعه‌دهنده Full-Stack و علاقه‌مند به هوش مصنوعی.

---

## پیش‌نمایش زنده  
[https://argh94](https://argh94.github.io/) *(یا روی هر دامنه دلخواه میزبانی کنید)*

---

## ویژگی‌های کلیدی

| ویژگی | توضیح |
|-------|-------|
| **ترمینال تعاملی** | تایپ کنید، دستور اجرا کنید، خروجی ببینید — مثل یک شل واقعی! |
| **شبیه‌سازی SSH** | با دستور `ssh argh94.dev` یک اتصال امن شبیه‌سازی شده را تجربه کنید |
| **تم‌های هکری** | 5 تم حرفه‌ای: `Matrix`, `Hacker Blue`, `Cyber Blue`, `Matrix Blue`, `Auto` |
| **انیمیشن‌های پس‌زمینه** | ذرات شناور + بارش ماتریکس (قابل خاموش/روشن) |
| **PWA (اپلیکیشن وب پیش‌رونده)** | نصب روی دسکتاپ و موبایل — کار آفلاین محدود |
| **آنالیتیکس داخلی** | آمار دستورات، آخرین دستور، زمان جلسه |
| **سیستم جستجو** | با `find <کلمه>` محتوای فایل‌ها را جستجو کنید |
| **دستورات هوشمند** | `neofetch`, `sudo rm -rf /`, `clear`, `theme`, `sound` و... |
| **صدای تایپ** | صدای واقعی تایپ (قابل خاموش/روشن) |
| **اسکرول هوشمند** | اسکرول خودکار، دکمه بازگشت به بالا، نشانگر اسکرول |
| **پشتیبانی کامل از موبایل** | کاملاً ریسپانسیو + بهینه‌سازی لمسی |
| **Easter Egg ها** | چند دستور مخفی و بامزه! |

---



## دستورات قابل استفاده

```bash
help         → نمایش راهنمای کامل
about        → درباره من
skills       → مهارت‌های فنی
projects     → پروژه‌های برجسته
contact      → اطلاعات تماس
portfolio    → نمایه ترمینال
ssh argh94.dev → شبیه‌سازی اتصال SSH
neofetch     → اطلاعات سیستم (سبک!)
clear        → پاک کردن ترمینال
theme blue   → تغییر تم
sound        → فعال/غیرفعال کردن صدای تایپ
animation    → روشن/خاموش کردن انیمیشن‌ها
sudo rm -rf / → Easter Egg!
```
.

نصب و راه‌اندازی (PWA)مرورگر را باز کنید و به آدرس پروژه بروید.

روی آیکون نصب (در نوار آدرس یا منو) کلیک کنید.

یا از منوی مرورگر: Add to Home Screen



پس از نصب، مثل یک اپلیکیشن واقعی اجرا می‌شود — حتی آفلاین!

میزبانی محلی (Local Development)
# 1. فایل را دانلود کنید
git clone https://github.com/Argh94/terminal-portfolio.git
cd terminal-portfolio

# 2. فقط یک فایل HTML است! مرورگر را باز کنید:
open index.html

هیچ سرور یا وابستگی خارجی لازم نیست — 100% خودکفا.
ساختار فایل‌ها

terminal-portfolio/
│
├── index.html          ← تمام کد در یک فایل (HTML + CSS + JS)
├── README.md           ← این فایل
└── (اختیاری) .github/ ← برای دمو در GitHub Pages

تم‌های موجود

تم‌های موجودنام تم
کد
پیش‌نمایش
Auto (System)
auto
بر اساس تنظیمات سیستم
Classic Matrix
green
سبز کلاسیک ماتریکس
Hacker Blue
blue
آبی تیره هکری
Cyber Blue
cyber-blue
آبی نئونی سایبرپانک
Matrix Blue
matrix-blue
آبی ماتریکس با افکت بارش

تغییر تم با دستور theme blue یا از منوی بالا.


شخصی‌سازی (Customization)تغییر اطلاعات شخصیفایل‌های مجازی در بخش filesystem در اسکریپت قرار دارند:js

'about.txt': `درباره من...`,
'skills.txt': `مهارت‌ها...`,
'projects.txt': `پروژه‌ها...`,

کافیست متن‌ها را ویرایش کنید — بدون نیاز به کامپایل!
بهینه‌سازی‌ها


بهینه‌سازی‌هاPerformance: انیمیشن‌ها فقط در صورت نیاز اجرا می‌شوند
Accessibility: پشتیبانی از prefers-reduced-motion
RTL/LTR: پشتیبانی کامل از متن‌های فارسی و انگلیسی
Mobile-First: طراحی شده برای موبایل، بهینه برای دسکتاپ
No Dependencies: بدون فریم‌ورک یا لایبرری خارجی

به‌روزرسانی‌ها (Changelog)نسخه
تغییرات
v5.0
اضافه شدن PWA، آنالیتیکس، اسکرول هوشمند
v4.0
تم‌های جدید + انیمیشن ماتریکس
v3.0
شبیه‌سازی SSH + صدای تایپ
v2.0
ریسپانسیو کامل + منوی ناوبری
v1.0
ترمینال اولیه

مشارکت (Contribute)


مشارکت (Contribute)پروژه را فورک کنید  
شاخه جدید بسازید: git checkout -b feature/awesome  
تغییرات را کامیت کنید: git commit -m "Add awesome feature"  
پوش کنید: git push origin feature/awesome  
Pull Request بزنید

ایده‌های جدید؟ تم جدید؟ دستور جدید؟ خوشحال می‌شیم ببینیم!
لایسنس![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)آزاد برای استفاده، تغییر و توزیع — فقط نام من را نگه دارید


تماس با منپلتفرم
لینک
ایمیل
argh7394@gmail.com (mailto:argh7394@gmail.com)
گیت‌هاب
github.com/Argh94
تلگرام
@Argh94



ستاره بده!اگر این پروژه رو دوست داشتی، یه ستاره بزن

GitHub Repository"Code is poetry, architecture is art." — Argh94



