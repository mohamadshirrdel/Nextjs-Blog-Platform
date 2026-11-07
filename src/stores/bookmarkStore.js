import {
  addBookmark,
  getBookmarkIds,
  removeBookmark,
} from "@/app/actions/bookmark";
import { create } from "zustand";

export const useBookmarks = create((set, get) => ({
  bookmarkedPostIds: [],
  isLoading: true,
  isUpdating: false,

  loadBookmarks: async () => {
    try {
      const result = await getBookmarkIds();

      if (result.success) {
        set({
          bookmarkedPostIds: result.bookmarkIds,
        });
      }
    } catch (err) {
      console.log("Failed To Load Bookmarks ->", err);
    } finally {
      set({ isLoading: false });
    }
  },

  isBookmarked: (postId) => {
    return get().bookmarkedPostIds.includes(postId);
  },

  toggleBookmark: async (postId) => {
    if (get().isUpdating) {
      return { success: false };
    }

    const bookmarked = get().isBookmarked(postId);

    set({ isUpdating: true });

    try {
      const result = bookmarked
        ? await removeBookmark(postId)
        : await addBookmark(postId);

      if (!result.success) {
        return result;
      }

      set((state) => ({
        bookmarkedPostIds: bookmarked
          ? state.bookmarkedPostIds.filter((item) => item !== postId)
          : [...state.bookmarkedPostIds, postId],
      }));

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
      set({ isUpdating: false });
    }
  },
}));
