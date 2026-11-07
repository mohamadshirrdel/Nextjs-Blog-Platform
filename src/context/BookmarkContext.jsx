"use client";

import {
  addBookmark,
  getBookmarkIds,
  removeBookmark,
} from "@/app/actions/bookmark";
import { createContext, useContext, useEffect, useState } from "react";

const BookmarkContext = createContext(null);

export function BookmarkProvider({ children }) {
  const [bookmarkedPostIds, setBookmarkedPostIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    async function loadBookmarks() {
      try {
        const result = await getBookmarkIds();

        if (result.success) {
          setBookmarkedPostIds(result.bookmarkIds);
        }
      } catch (err) {
        console.log("Failed To Load Bookmarks ->", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadBookmarks();
  }, []);

  function isBookmarked(postId) {
    return bookmarkedPostIds.includes(postId);
  }

  async function toggleBookmark(postId) {
    if (isUpdating) {
      return { success: false };
    }

    const bookmarked = isBookmarked(postId);

    setIsUpdating(true);

    try {
      const result = bookmarked
        ? await removeBookmark(postId)
        : await addBookmark(postId);

      if (!result.success) {
        return result;
      }

      setBookmarkedPostIds((prev) =>
        bookmarked ? prev.filter((item) => item !== postId) : [...prev, postId],
      );

      return {
        ...result,
        bookmarked: !bookmarked,
      };
    } catch (err) {
      console.log("Failed To Update Bookmark List ->", err);

      return {
        success: false,
        message: "بروزرسانی بوکمارک‌ها با خطا مواجه شد",
      };
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        isBookmarked,
        toggleBookmark,
        bookmarkedPostIds,
        isLoading,
        isUpdating,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);

  if (!context) {
    throw new Error("useBookmarks must be use in provider");
  }

  return context;
}
