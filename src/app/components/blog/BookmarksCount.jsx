"use client";

import { useBookmarks } from "@/stores/bookmarkStore";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import React from "react";

const BookmarksCount = () => {
  const isLoading = useBookmarks((state) => state.isLoading);

  const bookmarksCount = useBookmarks(
    (state) => state.bookmarkedPostIds.length,
  );

  return (
    <Link
      href="/bookmarks"
      title="بوکمارک‌های من"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-white/5 hover:text-white"
    >
      <Bookmark size={20} />

      {!isLoading && bookmarksCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-600 px-1 text-[10px] font-bold text-white">
          {bookmarksCount > 99 ? "99+" : bookmarksCount}
        </span>
      )}
    </Link>
  );
};

export default BookmarksCount;
