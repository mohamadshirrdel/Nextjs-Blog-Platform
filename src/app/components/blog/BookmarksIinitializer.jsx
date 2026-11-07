"use client";

import { useBookmarks } from "@/stores/bookmarkStore";
import React, { useEffect } from "react";

const BookmarksIinitializer = () => {
  const { loadBookmarks } = useBookmarks();

  useEffect(() => {
    loadBookmarks();
  }, [loadBookmarks]);

  return null;
};

export default BookmarksIinitializer;
