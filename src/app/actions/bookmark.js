"use server";

import { auth } from "@/auth";
import mongoose, { isValidObjectId } from "mongoose";
import { connectToDB } from "../libs/db";
import Post from "../libs/models/Post";
import User from "../libs/models/User";
import { revalidatePath } from "next/cache";

export const addBookmark = async (postId) => {
  try {
    if (!isValidObjectId(postId)) {
      return {
        success: false,
        message: "شناسه پست معتبر نیست",
      };
    }

    const session = await auth();

    if (!session) {
      return {
        success: false,
        message: "برای ذخیره پست ابتدا باید وارد شوید",
      };
    }

    await connectToDB();

    const post = await Post.findOne({ _id: postId, status: "published" })
      .select("_id")
      .lean();

    if (!post) {
      return {
        success: false,
        message: "پست یافت نشد یا منتشر نشده است",
      };
    }

    await User.updateOne(
      {
        _id: session.user.id,
      },
      {
        $addToSet: {
          bookmarks: post._id,
        },
      },
    );

    return {
      success: true,
      message: "پست به بوکمارک های شما اضافه شد",
    };
  } catch (err) {
    return {
      success: false,
      message: "ذخیره پست با خطا مواجه شد",
    };
  }
};

export const getBookmarks = async () => {
  try {
    const session = await auth();

    if (!session) {
      return {
        success: false,
        message: "برای دریافت بوکمارک‌ها ابتدا باید وارد شوید",
      };
    }

    await connectToDB();

    const userDoc = await User.findById(session.user.id)
      .select("bookmarks")
      .populate({
        path: "bookmarks",
        match: { status: "published" },
        select: "title content author category publishedAt",
      })
      .lean();

    if (!userDoc) {
      return {
        success: false,
        message: "دریافت لیست بوکمارک‌ها با خطا مواجه شد",
        bookmarks: [],
      };
    }

    const bookmarks = (userDoc?.bookmarks || []).map((post) => ({
      id: post._id.toString(),
      title: post.title,
      content: post.content,
      author: post.author?.toString() ?? null,
      category: post.category?.toString() ?? null,
      publishedAt: post.publishedAt?.toISOString() ?? null,
    }));

    return {
      success: true,
      bookmarks,
    };
  } catch (err) {
    console.log("getBookmarks error ->", err);

    return {
      success: false,
      message: "کاربر یافت شد",
      bookmarks: [],
    };
  }
};

export const getBookmarkIds = async () => {
  const session = await auth();

  if (!session) {
    return {
      success: false,
      bookmarks: [],
    };
  }

  await connectToDB();

  const userDoc = await User.findById(session.user.id)
    .select("bookmarks")
    .lean();

  return {
    success: true,
    bookmarkIds: (userDoc?.bookmarks || []).map((id) => id.toString()),
  };
};

export const removeBookmark = async (postId) => {
  try {
    if (!isValidObjectId(postId)) {
      return {
        success: false,
        message: "شناسه پست معتبر نیست",
      };
    }

    const session = await auth();

    if (!session) {
      return {
        success: false,
        message: "برای ذخیره پست ابتدا باید وارد شوید",
      };
    }

    await connectToDB();

    await User.updateOne(
      { _id: session.user.id },
      {
        $pull: {
          bookmarks: new mongoose.Types.ObjectId(postId),
        },
      },
    );

    return {
      success: true,
      message: "پست از بوکمارک‌ها حذف شد",
    };
  } catch (err) {
    return {
      success: false,
      message: "حذف پست با خطا مواجه شد",
    };
  }
};
