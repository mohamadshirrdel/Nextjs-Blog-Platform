import { getBookmarks } from "@/app/actions/bookmark";
import BookmarkList from "@/app/components/blog/BookmarkList";
import { Link } from "lucide-react";
import React from "react";

const pages = async () => {
  const result = await getBookmarks();

  if (!result.success) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-lg rounded-2xl border border-white/10 bg-white/3 p-8 text-center">
          <h1 className="text-2xl font-black text-white">بوکمارک‌های من</h1>

          <p className="mt-4 text-sm leading-7 text-zinc-400">
            برای مشاهده مقاله‌های ذخیره‌شده وارد حساب کاربری شو
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-500"
          >
            ورود به حساب کاربری
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12">
        <p className="text-sm font-medium text-violet-400">کتابخانه شخصی</p>

        <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
          بوکمارک‌های من
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-500">
          مقاله‌هایی که ذخیره کرده‌ای تا هر وقت خواستی دوباره به آن‌ها سر بزنی.
        </p>
      </div>

      <BookmarkList initialBookmarks={result.bookmarks} />
    </main>
  );
};

export default pages;
