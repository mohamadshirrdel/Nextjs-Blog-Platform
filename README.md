# Next.js Blog Platform

A full-featured blog management platform built with **Next.js 16**, **React 19**, **MongoDB**, and **NextAuth.js**.

This project provides a complete blogging experience with user authentication, content management, bookmarking, comment moderation, and an administrative dashboard.

## ✨ Features

### 🔐 Authentication & Authorization

- User registration and login with email and password.
- Google authentication.
- GitHub authentication.
- Role-based access control (Admin / User).
- Protected routes and administrative access.

### 📝 Blog Management

- Create, edit, and delete blog posts.
- Publish posts or save them as drafts.
- Organize posts using categories and subcategories.
- Dedicated pages for individual blog posts.
- Display published articles.

### 💬 Comment System

- Add comments to blog posts.
- Comment moderation system.
- Approve or reject comments.
- Delete comments through the admin dashboard.

### 👤 User Dashboard

- Personal user profile.
- Create and manage personal blog posts.
- View published posts and drafts.
- Bookmark favorite articles.

### 🛠️ Admin Dashboard

- Overview dashboard with statistics.
- Manage blog posts.
- Manage users and user roles.
- Create and manage categories.
- Review, approve, and reject comments.

## 🧰 Tech Stack

| Technology     | Purpose           |
| -------------- | ----------------- |
| Next.js 16     | React Framework   |
| React 19       | UI Library        |
| Tailwind CSS 4 | Styling           |
| MongoDB        | Database          |
| Mongoose       | ODM               |
| NextAuth.js v5 | Authentication    |
| Zustand        | State Management  |
| Zod            | Schema Validation |
| bcryptjs       | Password Hashing  |
| Lucide React   | Icons             |

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mohamadshirrdel/Nextjs-Blog-Platform.git
```

### 2. Navigate to the project

```bash
cd Nextjs-Blog-Platform
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/devlog

AUTH_SECRET=your_auth_secret

AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_client_secret

AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
```

Configure your Google and GitHub OAuth credentials to enable social authentication.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📸 Screenshots

Screenshots of the application will be added here.

## 🚀 Future Improvements

- Improve authentication and authorization architecture.
- Enhance application performance.
- Add advanced blog search and filtering.
- Improve SEO and metadata management.
- Add more content management features.

## 👨‍💻 Developer

**Mohammad Shirdel**

Frontend Developer

[GitHub Profile](https://github.com/mohamadshirrdel)

---

# نسخه فارسی 🇮🇷

# پلتفرم مدیریت وبلاگ با Next.js

یک پلتفرم مدیریت وبلاگ با امکانات کامل که با استفاده از **Next.js 16، React 19، MongoDB و NextAuth.js** توسعه داده شده است.

این پروژه امکاناتی مانند احراز هویت کاربران، مدیریت محتوا، ذخیره مقالات، مدیریت نظرات و پنل مدیریت را فراهم می‌کند.

## ✨ امکانات پروژه

### 🔐 احراز هویت و سطح دسترسی

- ثبت‌نام و ورود کاربران با ایمیل و رمز عبور.
- ورود با حساب Google.
- ورود با حساب GitHub.
- مدیریت سطح دسترسی کاربران (مدیر و کاربر).
- محافظت از مسیرها و صفحات اختصاصی.

### 📝 مدیریت وبلاگ

- ایجاد، ویرایش و حذف مقالات.
- انتشار مقالات یا ذخیره آن‌ها به‌صورت پیش‌نویس.
- سازمان‌دهی مقالات با استفاده از دسته‌بندی‌ها و زیردسته‌بندی‌ها.
- صفحه اختصاصی برای هر مقاله.
- نمایش مقالات منتشرشده.

### 💬 سیستم مدیریت نظرات

- ثبت نظر برای مقالات.
- سیستم مدیریت و بررسی نظرات.
- تأیید یا رد نظرات کاربران.
- حذف نظرات از طریق پنل مدیریت.

### 👤 پنل کاربری

- مشاهده پروفایل شخصی.
- ایجاد و مدیریت مقالات شخصی.
- مشاهده مقالات منتشرشده و پیش‌نویس‌ها.
- ذخیره مقالات موردعلاقه (Bookmark).

### 🛠️ پنل مدیریت

- نمایش آمار کلی وب‌سایت.
- مدیریت مقالات.
- مدیریت کاربران و سطح دسترسی آن‌ها.
- ایجاد و مدیریت دسته‌بندی‌ها.
- بررسی، تأیید و رد نظرات کاربران.

## 🧰 تکنولوژی‌های استفاده‌شده

| تکنولوژی       | کاربرد                   |
| -------------- | ------------------------ |
| Next.js 16     | فریم‌ورک اصلی پروژه      |
| React 19       | توسعه رابط کاربری        |
| Tailwind CSS 4 | طراحی و استایل‌دهی       |
| MongoDB        | پایگاه داده              |
| Mongoose       | مدیریت ارتباط با دیتابیس |
| NextAuth.js v5 | احراز هویت               |
| Zustand        | مدیریت وضعیت برنامه      |
| Zod            | اعتبارسنجی اطلاعات       |
| bcryptjs       | هش کردن رمز عبور         |
| Lucide React   | آیکون‌ها                 |

## ⚙️ راه‌اندازی پروژه

### ۱. دریافت پروژه از GitHub

```bash
git clone https://github.com/mohamadshirrdel/Nextjs-Blog-Platform.git
```

### ۲. ورود به پوشه پروژه

```bash
cd Nextjs-Blog-Platform
```

### ۳. نصب وابستگی‌ها

```bash
npm install
```

### ۴. تنظیم متغیرهای محیطی

یک فایل با نام `.env.local` در مسیر اصلی پروژه ایجاد کنید و اطلاعات اتصال به دیتابیس و سرویس‌های احراز هویت را در آن قرار دهید.

### ۵. اجرای پروژه

```bash
npm run dev
```

سپس آدرس زیر را در مرورگر باز کنید:

http://localhost:3000

## 📸 تصاویر پروژه

تصاویر بخش‌های مختلف پروژه در این قسمت قرار خواهند گرفت.

## 🚀 برنامه‌های توسعه آینده

- بهبود معماری احراز هویت و مدیریت سطح دسترسی.
- افزایش کارایی و بهینه‌سازی عملکرد برنامه.
- افزودن قابلیت جستجو و فیلتر پیشرفته مقالات.
- بهبود سئو و مدیریت متادیتا.
- توسعه امکانات بیشتر برای مدیریت محتوا.

## 👨‍💻 توسعه‌دهنده

**محمد شیردل**

توسعه‌دهنده فرانت‌اند

[پروفایل GitHub](https://github.com/mohamadshirrdel)

---

⭐ اگر این پروژه برای شما مفید بود، خوشحال می‌شوم با دادن Star از آن حمایت کنید.
