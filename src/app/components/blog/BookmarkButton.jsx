"use client";

import { useBookmarks } from "@/stores/bookmarkStore";
import { Bookmark } from "lucide-react";
import React from "react";

const BookmarkButton = ({ postId, className, onToggle }) => {
  const isLoading = useBookmarks((state) => state.isLoading);
  const isUpdating = useBookmarks((state) => state.isUpdating);
  const toggleBookmark = useBookmarks((state) => state.toggleBookmark);

  const bookmarked = useBookmarks((state) =>
    state.bookmarkedPostIds.includes(postId),
  );

  const handleClick = async () => {
    const result = await toggleBookmark(postId);

    if (!result.success) {
      return alert(result.message || "آپدیت بوکمارک‌ها با خطا مواجه شد");
    }

    onToggle?.(postId);

    alert(
      result.bookmarked
        ? "مقاله به بوکمارک‌ها اضافه شد"
        : "مقاله از بوکمارک‌ها حذف شد",
    );
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading || isUpdating}
      type="button"
      className={`inline-flex items-center justify-center rounded-full p-2 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <Bookmark
        size={20}
        className="text-violet-400"
        fill={bookmarked ? "currentColor" : "none"}
      />
    </button>
  );
};

export default BookmarkButton;
