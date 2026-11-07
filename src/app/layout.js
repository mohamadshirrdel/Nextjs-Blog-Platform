import { localFont } from "next/font/local";

import "./globals.css";
import { BookmarkProvider } from "@/context/BookmarkContext";
import BookmarksIinitializer from "./components/blog/BookmarksIinitializer";

export const metadata = {
  title: "نکست‌بلاگ",
  description: "یک وبلاگ مدرن برای نوشتن و به اشتراک گذاشتن ایده‌ها",
};

const iranSans = localFont({
  src: "./../../public/fonts/IRANSans.ttf",
});

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <div
          className={`min-h-screen bg-[#0a0a0a] text-white ${iranSans.className}`}
        >
          <BookmarksIinitializer />

          <BookmarkProvider>
            <main>{children}</main>
          </BookmarkProvider>
        </div>
      </body>
    </html>
  );
}
