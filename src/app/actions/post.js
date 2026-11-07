"use server";

import { auth } from "@/auth";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectToDB } from "../libs/db";
import Category from "../libs/models/Category";
import Post from "../libs/models/Post";
import User from "../libs/models/User";
import { requireAdmin } from "../libs/utils/auth";

export const createPost = async ({ title, content, status, category }) => {
  try {
    const session = await auth();

    if (!session) {
      return {
        success: false,
        message: "برای ایجاد پست ابتدا باید لاگین کنید",
      };
    }

    if (!title.trim() || !content.trim()) {
      return {
        success: false,
        message: "عنوان و محتوای پست الزامی می‌باشد",
      };
    }

    if (!["draft", "published"].includes(status)) {
      return {
        success: false,
        message: "وضعیت پست نامعتبر می‌باشد",
      };
    }

    if (!category) {
      return {
        success: false,
        message: "انتخاب دسته‌بندی الزامی می‌باشد",
      };
    }

    await connectToDB();

    const selectedCategory = await Category.findById(category);

    if (!selectedCategory) {
      return {
        success: false,
        message: "دسته‌بندی انتخاب‌شده معتبر نمی‌باشد",
      };
    }

    const post = await Post.create({
      title: title.trim(),
      content: content.trim(),
      author: session.user.id,
      category: selectedCategory._id,
      status,
      publishedAt: status === "published" ? new Date() : null,
    });

    return {
      success: true,
      message: "پست با موفقیت ایجاد شد",
    };
  } catch (err) {
    console.log(err);

    return {
      success: false,
      message: "مشکلی در ایجاد پست رخ داد",
    };
  }
};

export const deletePost = async (state, formData) => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const postId = formData.get("postId");

  if (!postId) {
    return {
      success: false,
      message: "شناسه پست الزامی می‌باشد",
    };
  }

  const isAdmin = session.user.role === "admin";

  try {
    await connectToDB();

    const post = await Post.findOne({
      _id: postId,
      ...(isAdmin ? {} : { author: session.user.id }),
    });

    if (!post) {
      return {
        success: false,
        message: "پست یافت نشد",
      };
    }

    await post.deleteOne();

    revalidatePath("/profile/posts");
    revalidatePath("/admin/posts");

    return {
      success: true,
      message: "پست با موفقیت حذف شد",
    };
  } catch (err) {
    return {
      success: true,
      message: "خطایی رخ داد",
    };
  }
};

export const updatePost = async (state, formData) => {
  await requireAdmin();

  const postId = formData.get("postId")?.toString();
  const title = formData.get("title")?.toString().trim();
  const author = formData.get("author")?.toString();
  const status = formData.get("status")?.toString();

  if (!postId || !mongoose.isValidObjectId(postId)) {
    return {
      success: false,
      message: "شناسه پست نامعتبر می‌باشد",
    };
  }

  if (!title || title.length < 8) {
    return {
      success: false,
      message: "عنوان باید حداقل ۸ کاراکتر باشد",
    };
  }

  if (!author || !mongoose.isValidObjectId(author)) {
    return {
      success: false,
      message: "نویسنده نامعتبر می‌باشد",
    };
  }

  if (!["draft", "published"].includes(status)) {
    return {
      success: false,
      message: "وضعیت پست نامعتبر می‌باشد",
    };
  }

  try {
    await connectToDB();

    const post = await Post.findById(postId);

    if (!post) {
      return {
        success: false,
        message: "پست یافت نشد",
      };
    }

    const newAuthor = await User.findById(author).select("_id isDeleted");

    // نویسنده فعلی حتی اگر حذف شده باشد می‌تواند بماند، ولی کاربر حذف‌شده‌ی دیگر قابل انتخاب نیست
    const isSameAuthor = newAuthor?._id.toString() === post.author.toString();

    if (!newAuthor || (newAuthor.isDeleted && !isSameAuthor)) {
      return {
        success: false,
        message: "نویسنده انتخاب‌شده معتبر نمی‌باشد",
      };
    }

    post.title = title;
    post.author = newAuthor._id;
    post.status = status;

    // اگر برای اولین بار منتشر می‌شود تاریخ انتشار ثبت شود
    if (status === "published" && !post.publishedAt) {
      post.publishedAt = new Date();
    }

    await post.save();

    revalidatePath("/admin/posts");
    revalidatePath("/profile/posts");
    revalidatePath("/blog");
    revalidatePath(`/blog/${postId}`);
    revalidatePath("/");

    return {
      success: true,
      message: "پست با موفقیت ویرایش شد",
    };
  } catch (err) {
    console.log(err);

    return {
      success: false,
      message: "مشکلی در ویرایش پست رخ داد",
    };
  }
};
