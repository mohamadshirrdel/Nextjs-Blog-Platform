"use client";

import { Bookmark } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import BookmarkButton from "./BookmarkButton";

const BookmarkList = ({ initialBookmarks }) => {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);

  const handleToggle = (postId) => {
    setBookmarks((prev) => prev.filter((post) => post.id !== postId));
  };

  if (bookmarks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-white/2 px-6 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">
          <Bookmark size={28} className="text-violet-400" />
        </div>

        <h2 className="mt-6 text-lg font-bold text-white">
          هنوز مقاله‌ای ذخیره نکرده‌ای
        </h2>

        <p className="mt-2 text-sm leading-7 text-zinc-500">
          از بین نوشته‌های وبلاگ، مقاله‌های موردعلاقه‌ات رو ذخیره کن.
        </p>

        <Link
          href="/blog"
          className="mt-6 inline-flex rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-500"
        >
          مشاهده وبلاگ
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {bookmarks.map((post) => (
        <article
          key={post.id}
          className="group flex flex-col rounded-2xl border border-white/10 bg-white/3 p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:bg-white/5"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs text-zinc-500">
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("fa-IR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </p>

            <BookmarkButton
              postId={post.id}
              onToggle={handleToggle}
              className=""
            />
          </div>

          <h2 className="mt-4 text-xl font-bold leading-8 text-white transition group-hover:text-violet-400">
            {post.title}
          </h2>

          <p className="mt-3 line-clamp-3 text-sm leading-7 text-zinc-500">
            {post.content}
          </p>

          <div className="mt-auto flex justify-end border-t border-white/10 pt-5">
            <Link
              href={`/blog/${post.id}`}
              className="text-sm font-semibold text-violet-400 transition hover:text-violet-300"
            >
              مطالعه مطلب
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

export default BookmarkList;
